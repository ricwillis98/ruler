import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker
} from '@jupyterlab/notebook';

/**
 * Initialization data for the ruler extension.
 */

function setRuler(notebooks: INotebookTracker){
  let col = 40;
  let activeCell = notebooks.activeCell;
  if (activeCell == null){
    console.log("activeCell was null, returning");
    return;
  }
  let editor = activeCell.editor;
  let rulers = editor.getOption("rulers");
  console.log(editor);
  if (!rulers.includes(col)){
    console.log("Adding col");
    rulers.push(col);
    editor.setOption("rulers", rulers);
  } else {
    console.log("col was already there");
  }
}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'ruler',
  autoStart: true,
  requires: [INotebookTracker,],
  activate: (app: JupyterFrontEnd, notebooks: INotebookTracker) => {
    console.log('My JupyterLab extension ruler is activated!');
    console.log(notebooks);
    setRuler(notebooks);
    notebooks.activeCellChanged.connect(setRuler);



  }
};

export default extension;
