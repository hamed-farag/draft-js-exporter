import DraftExporter from './main';

const rawData = {
  "entityMap": {},
  "blocks": [{
    "key": "a30dm",
    "text": "This is a test string.",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [{
      "offset": 0,
      "length": 4,
      "style": "BOLD"
    }, {
      "offset": 5,
      "length": 2,
      "style": "ITALIC"
    },{
      "offset": 10,
      "length": 4,
      "style": "BOLD"
    }],
    "entityRanges": []
  }]
};
let converter = new DraftExporter(rawData);
console.log(converter.export());