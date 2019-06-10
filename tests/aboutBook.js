const aboutBook = require("../aboutBook");
(async () => {
  const browser = await require("puppeteer").launch({
    headless: false
    // args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const aboutPage = await browser.newPage();
  for (const book of require("./booksData")) {
    await aboutBook(book, aboutPage);
    console.log(book.about);
  }
  aboutPage.close();
})();
