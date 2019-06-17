module.exports = {
  GITBOOK_REDIRECT_TO_LOGIN:
    '#Homepage > div > div.gb-page-header > div > div > a.btn.btn-link.btn-md.pull-right.hidden-xs.btn-login',
  GITBOOK_USERNAME_INPUT:
    '#application > div > div.gb-page-wrapper > div.gb-page-body > div > div.modal-body > form > div:nth-child(4) > input',
  GITBOOK_PASSWORD_INPUT:
    '#application > div > div.gb-page-wrapper > div.gb-page-body > div > div.modal-body > form > div:nth-child(5) > input',
  GITBOOK_LOGIN_BUTTON:
    '#application > div > div.gb-page-wrapper > div.gb-page-body > div > div.modal-body > form > button',
  GITBOOK_AUTHOR_BOOKS_DIV:
    '#AuthorProfile > div.gb-page-inner > div > div > div > div.col-md-9 > div',
  GITBOOK_BOOK_ABOUT_DIV:
    '#BookHome > div.gb-page-inner > div > div > div > div.panel-body > div',
  GITBOOK_USERNAME: process.env.GITBOOK_USERNAME,
  GITBOOK_PASSWORD: process.env.GITBOOK_PASSWORD,
  GITBOOK_ORIGIN: 'https://legacy.gitbook.com/',
  GITBOOK_STATIC_PATH:
    process.env.GITBOOKS_PATH || require('path').join(__dirname, 'static'),
  NODE_ENV: process.env.NODE_ENV,
};
console.log(module.exports);
if (!module.exports.GITBOOK_USERNAME || !module.exports.GITBOOK_PASSWORD) {
  throw new Error('未指定 GITBOOK_USERNAME 和 GITBOOK_PASSWORD 环境变量');
}
