const { createWriteStream } = require('fs');
const { mkdir } = require('fs').promises;
const { join } = require('path');
const request = require('request');
const config = require('./config');
module.exports = book => {
  const bookPath = join(config.GITBOOK_STATIC_PATH, book.author);
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
