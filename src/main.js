const FORMATS = require('./formats.json');

class DraftExporter {

  constructor(rawData){
    this.rawData = rawData;
    this.offsets = [];
    this.formatter = FORMATS.HTML;
    console.log(this.formatter);
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
    let formatter = this.formatter['INLINE'];
    let text = "";
    this.offsets.map((offset) => {
      if(index == offset.start && formatter[offset.style] != null) text += formatter[offset.style].open;
    });
    return text;
  }

  checkStylesAfter(index){
    let formatter = this.formatter['INLINE'];
    let text = "";
    this.offsets.map((offset) => {
      if(index == offset.end && formatter[offset.style] != null) text += formatter[offset.style].close;
    });
    return text;
  }

  export(){
    let blocks = this.rawData.blocks;
    let exportText = "";
    blocks.map((block) => {
      this.defineOffsets(block.inlineStyleRanges);
      exportText += this.formatter['BLOCK'][block.type].open;
      for(let i = 0; i < block.text.length; i++){
        exportText += this.checkStylesBefore(i);
        exportText += block.text.charAt(i);
        exportText += this.checkStylesAfter(i + 1);
      }
      exportText += this.formatter['BLOCK'][block.type].close;
    });
    return exportText;
  }

}

module.exports = DraftExporter;