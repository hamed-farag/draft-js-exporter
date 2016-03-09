import * as FORMATS from './formats';

class DraftExporter {

  constructor(rawData){
    this.rawData = rawData;
    this.offsets = [];
    this.formatter = FORMATS.HTML_FORMAT;
  }

  defineOffsets(inlineStyles){
    inlineStyles.map((metadata) => {
      let offset = {};
      offset.start = metadata.offset;
      offset.end = metadata.offset + metadata.length;
      offset.style = metadata.style;
      this.offsets.push(offset);
    });
  }

  checkStylesBefore(index){
    let text = "";
    this.offsets.map((offset) => {
      if(index == offset.start) text += this.formatter[offset.style].open;
    });
    return text;
  }

  checkStylesAfter(index){
    let text = "";
    this.offsets.map((offset) => {
      if(index == offset.end) text += this.formatter[offset.style].close;
    });
    return text;
  }

  export(){
    let blocks = this.rawData.blocks;
    let exportText = "";
    blocks.map((block) => {
      this.defineOffsets(block.inlineStyleRanges);
      exportText += this.formatter[block.type].open;
      for(let i = 0; i < block.text.length; i++){
        exportText += this.checkStylesBefore(i);
        exportText += block.text.charAt(i);
        exportText += this.checkStylesAfter(i + 1);
      }
      exportText += this.formatter[block.type].close;
    });
    return exportText;
  }

}

module.exports = DraftExporter;