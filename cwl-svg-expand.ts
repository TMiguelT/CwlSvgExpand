import {PluginBase, Workflow, SVGArrangePlugin} from "cwl-svg";
import {WorkflowModel} from "cwlts/models";
import * as objectPath from 'object-path';
import * as autoBind from 'auto-bind';

export default class WorkflowExpansionPlugin extends PluginBase {
    rootWorkflow: WorkflowModel;
    undoStack: string[] = [];
    currentLoc: string = null;

    constructor(){
        super();
        autoBind(this);
    }

    /**
     * Collapses the current subworkflow and goes up a level in the workflow tree
     */
    collapse() {
        if (this.undoStack.length > 0) {
            this.currentLoc = this.undoStack.pop();
        }
        else {
            this.currentLoc = null
        }
        this.draw();

    }

    /**
     * Expands the subworkflow located at the given path within the main workflow
     * @param {string} loc
     */
    expand(loc: string) {
        if (this.currentLoc)
            this.undoStack.push(this.currentLoc);
        this.currentLoc = loc;
        this.draw();
    }

    /**
     * Displays a workflow at the current path in the workflow tree
     */
    draw() {
        this.workflow.destroy();
        if (this.currentLoc == null)
            this.workflow.draw(this.rootWorkflow);
        else
            this.workflow.draw(objectPath.withInheritedProps.get(this.rootWorkflow, this.currentLoc));

        //Force rearrange if we have the SVGArrangePlugin
        const arranger = this.workflow.getPlugin(SVGArrangePlugin);
        if (arranger)
            arranger.arrange();
    }

    afterModelChange() {
        if (this.rootWorkflow == null)
            this.rootWorkflow = this.workflow.model;
    }

    expandEvent(event){
        const element = this.workflow.findParent(event.target as SVGElement, "node");

        if (element) {
            const id = element.getAttribute("data-connection-id");
            const model = this.workflow.model.findById(id).run;

            if ('class' in model && model.class == 'Workflow') {
                // Work out the path to the
                const loc = model.loc.replace(/^document\./, '').replace(/\[(\d+)]/, ".$1");
                this.expand(loc);
            }
        }
    }

    collapseEvent(event){
        if (event.key == "Backspace")
            this.collapse();
    }

    afterRender() {
        window.addEventListener("dblclick", this.expandEvent);
        window.addEventListener("keydown", this.collapseEvent);
    }

    destroy(){
        window.removeEventListener("dblclick", this.expandEvent);
        window.removeEventListener("keydown", this.collapseEvent);
    }
}
