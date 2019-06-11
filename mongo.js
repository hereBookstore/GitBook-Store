const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/kedo", { useNewUrlParser: true });
const db = mongoose.connection;

module.exports = new Promise((resolve, reject) => {
  db.once("error", reject);
  db.once("open", () => {
    const gitbookSchema = new mongoose.Schema({
      href: String,
      title: String,
      description: String,
      about: String,
      author: String
    });
    gitbookSchema.index(
      {
        title: "text",
        description: "text",
        about: "text",
        author: "text"
      },
      {
        name: "GitBook index",
        weights: { title: 10, description: 4, about: 2, author: 1 }
      }
    );
    gitbookSchema.methods.info = function() {
      console.log(
        "info",
        this,
        this.description ? this.description : this.about
      );
    };
    resolve(mongoose.model("GitBook", gitbookSchema));
  });
});
