import { cut } from 'nodejieba';
import config from './config';
export default async (book, page) => {
  await page.goto(book.href);
  book.about = cut(
    await page.evaluate(
      GITBOOK_BOOK_ABOUT_DIV =>
        document.querySelector(GITBOOK_BOOK_ABOUT_DIV).textContent,
      config.GITBOOK_BOOK_ABOUT_DIV,
    ),
    true,
  );
};
