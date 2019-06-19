var nodejieba = require("nodejieba");

var sentence =
  "hadoop spark java我是巅峰拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，巅峰当上CEO巅峰，走上巅峰人生巅峰巅峰。大数据专业storm方向小程序开发rust语言node.js编程TiDB数据库";
var topN = 50;
console.log(nodejieba.cut(undefined, true));

console.log(nodejieba.cut(sentence, true));

console.log(nodejieba.tag(sentence));

console.log(nodejieba.extract(sentence, topN));

console.log(nodejieba.cut("男默女泪"));
nodejieba.insertWord("男默女泪");
console.log(nodejieba.cut("男默女泪"));
