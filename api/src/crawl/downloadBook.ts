import { createWriteStream } from 'fs';
import { join } from 'path';
import * as request from 'request';
import config from './config';
const { mkdir } = require('fs').promises;
export default book => {
  const bookPath = join(config.GITBOOKS_PATH, book.author);
  return mkdir(bookPath, { recursive: true }).then(() => {
    const { origin, pathname } = new URL(book.href);
    const bookName = book.title.join('');
    return Promise.all([
      new Promise((resolve, reject) => {
        request(`${origin}/download/mobi${pathname}`, { timeout: 180000 })
          .on('error', reject)
          .pipe(createWriteStream(`${bookPath}/${bookName}.mobi`))
          .on('finish', resolve);
      }),
      new Promise((resolve, reject) => {
        request(`${origin}/download/epub${pathname}`, { timeout: 180000 })
          .on('error', reject)
          .pipe(createWriteStream(`${bookPath}/${bookName}.epub`))
          .on('finish', resolve);
      }),
      new Promise((resolve, reject) => {
        request(`${origin}/download/pdf${pathname}`, { timeout: 180000 })
          .on('error', reject)
          .pipe(createWriteStream(`${bookPath}/${bookName}.pdf`))
          .on('finish', resolve);
      }),
    ]);
  });
};
