import "./assets/styles/themes/rabix-dark/theme";
import "./plugins/port-drag/theme.dark.scss";
import "./plugins/selection/theme.dark.scss";

import {WorkflowFactory} from "cwlts/models";
import {Workflow} from "cwl-svg";
const sample = "cwl-svg/cwl-samples/rna-seq-alignment.json";

import ExpansionPlugin from 'expand';

const wf = WorkflowFactory.from(sample);
const svgRoot = document.getElementById("svg") as any;
const workflow = new Workflow({
    model: wf,
    svgRoot: svgRoot,
    plugins: [new ExpansionPlugin()]
});
