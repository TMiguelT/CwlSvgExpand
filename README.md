# CWL SVG Expand
## Introduction
CWL SVG Expand is a plugin for the typescript library [CWL SVG](https://github.com/rabix/cwl-svg), for rendering
CWL workflows on web pages. This plugin adds functionality to these visualisations, allowing the user to zoom into
and out of sub-workflows.

## Installation
To use this plugin with CWL SVG, first install it:
```bash
npm install cwl-svg-expand --save-dev
```

## Setup
To add this plugin to your CWL Workflow, simply create a new instance of the plugin and pass it into the CWL SVG
constructor:
```javascript
import {Workflow} from "cwl-svg";
import ExpansionPlugin from 'cwl-svg-expand';
const workflow = new Workflow({
    ...,
    plugins: [
        new ExpansionPlugin(),
    ]
});
```

For a more detailed usage example, refer to the [demo source code](demo/index.js).

## Usage
Now everything is setup, simply double click a sub-workflow node in your CWL visualization to expand it, and press
`backspace` to return to the parent workflow.

## Future Improvements
* Allow customizable shortcuts for expanding/collapsing
* Interactive demo