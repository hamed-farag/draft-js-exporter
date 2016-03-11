import {stateToHTML} from 'draft-js-export-html';

class DraftExporter {

  constructor(contentState){
    this.contentState = contentState;
  }

  export(){
    return stateToHTML(this.contentState);
  }

}

module.exports = DraftExporter;