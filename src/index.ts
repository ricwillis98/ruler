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
  let col = 80;
  let activeCell = notebooks.activeCell;
  if (activeCell == null){
    return;
  }
  let editor = activeCell.editor;
  let rulers = editor.getOption("rulers");
  console.log(editor);
  if (!rulers.includes(col)){
    rulers.push(col);
    editor.setOption("rulers", rulers);
  }
}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'ruler',
  autoStart: true,
  requires: [INotebookTracker,],
  activate: (app: JupyterFrontEnd, notebooks: INotebookTracker) => {
    setRuler(notebooks);
    notebooks.activeCellChanged.connect(setRuler);
  }
};

export default extension;
