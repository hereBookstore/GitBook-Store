const { cut } = require("nodejieba");
const config = require("./config");
module.exports = async (book, page) => {
  await page.goto(book.href);
  book.about = cut(
    await page.evaluate(
      GITBOOK_BOOK_ABOUT_DIV =>
        document.querySelector(GITBOOK_BOOK_ABOUT_DIV).textContent,
      config.GITBOOK_BOOK_ABOUT_DIV
    ),
    true
  );
};
