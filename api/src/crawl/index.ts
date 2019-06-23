import * as puppeteer from 'puppeteer';
import { cut } from 'nodejieba';
import aboutBook from './aboutBook';
import downloadBook from './downloadBook';
import config from './config';
let page = puppeteer
  .launch({
    headless: process.env.NODE_ENV !== 'development',
    // args: ["--no-sandbox", "--disable-setuid-sandbox"]
  })
  .then(browser => browser.newPage());
export const autoLogin = async () => {
  page = await page;
  await page.goto(config.GITBOOK_ORIGIN);
  await page.click(config.GITBOOK_REDIRECT_TO_LOGIN);
  await page.waitForSelector(config.GITBOOK_USERNAME_INPUT, { timeout: 3000 });
  await page.type(config.GITBOOK_USERNAME_INPUT, config.GITBOOK_USERNAME);
  await page.type(config.GITBOOK_PASSWORD_INPUT, config.GITBOOK_PASSWORD);
  await page.click(config.GITBOOK_LOGIN_BUTTON);
  await page.waitForNavigation();
  if (page.url() !== 'https://legacy.gitbook.com/@canfeit/dashboard') {
    throw new Error('auto login gitbook error:' + page.url());
  }
  console.log('auto login gitbook ok');
};
export const crawl = async author => {
  await page.goto(`${config.GITBOOK_ORIGIN}@${author}`);
  const books = await page.evaluate(GITBOOK_AUTHOR_BOOKS_DIV => {
    const books = document.querySelector(GITBOOK_AUTHOR_BOOKS_DIV);
    const getBooks = () =>
      Array.prototype.map.call(books.querySelectorAll('.book-infos'), book => {
        const { href, textContent: title } = book.querySelector('.title > a');
        const { textContent: description = '' } =
          book.querySelector('.description') || {};
        return {
          href,
          title,
          description,
        };
      });
    let bookDatas = getBooks();
    for (let pageNum of books.querySelectorAll(
      'div.pagination > ul.pagination-pages > li:not(.active) > a',
    )) {
      pageNum.click();
      bookDatas = [...bookDatas, ...getBooks()];
    }
    return bookDatas;
  }, config.GITBOOK_AUTHOR_BOOKS_DIV);
  for (const book of books) {
    book.author = author;
    book.title = cut(book.title, true);
    book.description = cut(book.description, true);
    await Promise.all([aboutBook(book, page), downloadBook(book)]);
  }
  return books;
};
