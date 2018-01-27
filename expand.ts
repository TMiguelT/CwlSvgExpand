import {PluginBase, SelectionPlugin} from "cwl-svg";
import {StepModel, WorkflowInputParameterModel, WorkflowOutputParameterModel} from "cwlts/models";

export default class WorkflowExpansionPlugin extends PluginBase {
    afterRender() {
        window.addEventListener("dblclick", event => {
            const element = this.workflow.findParent(event.target as SVGElement, "node");

            if (element){
                const id = element.getAttribute("data-connection-id");
                const model = this.workflow.model.findById(id);
                console.log(JSON.stringify(model));
            }
        }, true);
    }
}
