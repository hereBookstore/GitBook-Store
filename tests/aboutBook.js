const aboutBook = require("../aboutBook");
const { cut } = require("nodejieba");
(async () => {
  const browser = await require("puppeteer").launch({
    headless: false
    // args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const aboutPage = await browser.newPage();
  for (const book of require("./booksData")) {
    await aboutBook(book, aboutPage);
    console.log(
      cut(book.about, true),
      cut(book.href, true),
      cut(book.title, true),
      cut(book.description, true)
    );
  }
  aboutPage.close();
})();
