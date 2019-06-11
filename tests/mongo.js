const nodejieba = require("nodejieba");
require("../mongo").then(GitBook => {
  new GitBook({
    title: nodejieba.cut("你好哇李银河").join(" "),
    description: nodejieba.cut("你好哇李银河").join(" "),
    about: nodejieba.cut("你好哇李银河").join(" ")
  }).save(function(err, gitbook) {
    if (err) return console.error(err);
    gitbook.info();
    GitBook.find(
      { $text: { $search: nodejieba.cut("你好").join(" ") } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .exec(function(err, results) {
        console.log("result", err, results);
      });
  });
});
