import "cwl-svg/src/assets/styles/themes/rabix-dark/theme";

import {WorkflowFactory} from "cwlts/models";
import {Workflow, SVGArrangePlugin, ZoomPlugin, SVGNodeMovePlugin} from "cwl-svg";
import sample from "cwl-svg/cwl-samples/bcbio";

import ExpansionPlugin from 'expand';

const wf = WorkflowFactory.from(sample);
const svgRoot = document.getElementById("svg");
const workflow = new Workflow({
    model: wf,
    svgRoot: svgRoot,
    plugins: [
        new ExpansionPlugin(sample),
        new SVGArrangePlugin(),
        new SVGNodeMovePlugin({
            movementSpeed: 10
        }),
    ]
});
