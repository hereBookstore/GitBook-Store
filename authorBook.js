const puppeteer = require("puppeteer");
const { cut } = require("nodejieba");
const aboutBook = require("./aboutBook");
const downloadBook = require("./downloadBook");
const config = require("./config");
async function run(author) {
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV !== "development"
    // args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(config.GITBOOK_ORIGIN);
  await page.click(config.GITBOOK_REDIRECT_TO_LOGIN);
  await page.waitForSelector(config.GITBOOK_USERNAME_INPUT);
  await page.type(config.GITBOOK_USERNAME_INPUT, config.GITBOOK_USERNAME);
  await page.type(config.GITBOOK_PASSWORD_INPUT, config.GITBOOK_PASSWORD);
  await page.click(config.GITBOOK_LOGIN_BUTTON);
  await page.goto(`${config.GITBOOK_ORIGIN}@${author}`);
  const books = await page.evaluate(GITBOOK_AUTHOR_BOOKS_DIV => {
    const books = document.querySelector(GITBOOK_AUTHOR_BOOKS_DIV);
    const getBooks = () =>
      Array.prototype.map.call(books.querySelectorAll(".book-infos"), book => {
        const { href, textContent: title } = book.querySelector(".title > a");
        const { textContent: description } =
          book.querySelector(".description") || {};
        return {
          href,
          title: cut(title, true),
          description: cut(description, true)
        };
      });
    let bookDatas = getBooks();
    for (let pageNum of books.querySelectorAll(
      "div.pagination > ul.pagination-pages > li:not(.active) > a"
    )) {
      pageNum.click();
      bookDatas = [...bookDatas, ...getBooks()];
    }
    return bookDatas;
  }, config.GITBOOK_AUTHOR_BOOKS_DIV);
  for (const book of books) {
    book.author = author;
    await Promise.all([aboutBook(book, page), downloadBook(book)]);
  }
  page.close();
  // browser.close();
  return books;
}
// test
// yeasy or leohxj ...
run("leohxj").then(books => console.log(books, books.length));
