const { createWriteStream } = require("fs");
const { mkdir } = require("fs").promises;
const { join } = require("path");
const request = require("request");
const config = require("./config");
module.exports = book => {
  const bookPath = join(config.GITBOOK_STATIC_PATH, book.author);
  return mkdir(bookPath, { recursive: true }).then(() => {
    const { origin, pathname } = new URL(book.href);
    return Promise.all([
      new Promise(resolve => {
        request(`${origin}/download/mobi${pathname}`)
          .pipe(createWriteStream(`${bookPath}/${book.title}.mobi`))
          .on("finish", resolve);
      }),
      new Promise(resolve => {
        request(`${origin}/download/epub${pathname}`)
          .pipe(createWriteStream(`${bookPath}/${book.title}.epub`))
          .on("finish", resolve);
      }),
      new Promise(resolve => {
        request(`${origin}/download/pdf${pathname}`)
          .pipe(createWriteStream(`${bookPath}/${book.title}.pdf`))
          .on("finish", resolve);
      })
    ]);
  });
};
