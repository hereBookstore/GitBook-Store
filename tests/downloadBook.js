const downloadBook = require("../downloadBook");
(async () => {
  for (const book of require("./booksData")) {
    await downloadBook(book);
    console.log(book.title, "下载成功");
  }
})();
