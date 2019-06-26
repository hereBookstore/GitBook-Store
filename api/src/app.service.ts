import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { cut } from 'nodejieba';
import { crawl, autoLogin } from './crawl';
import config from './crawl/config';
const head = require('util').promisify(require('request').head);
const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
let authors;
@Injectable()
export class AppService {
  constructor(
    @InjectModel('Gitbook') private readonly gitbookModel,
    @InjectModel('Crawl') private readonly crawlModel,
  ) {
    autoLogin().then(() => {
      this.crawlModel.find({ crawl: false }, 'author').then(docs => {
        if (docs.length) {
          authors = docs.map(item => item.author);
          this.startLoop();
        } else {
          authors = [];
          console.log('no crawl job');
        }
      });
    });
  }
  private async startLoop() {
    console.log('Running a crawl job...', authors);
    const author = authors[0];
    try {
      const books = await crawl(author);
      books &&
        books.length &&
        (await this.gitbookModel.collection.insert(books));
      await this.crawlModel.update({ author }, { author, crawl: true });
      console.log('Crawled books:', books && books.length);
    } catch (e) {
      console.error('crawl loop', e);
    }
    const ms = random(1000, 3000);
    console.log('Sleeping...', ms);
    await sleep(ms);
    authors.shift();
    authors.length && this.startLoop();
  }
  async crawlBook(author) {
    if (
      authors.indexOf(author) === -1 &&
      (await head(`${config.GITBOOK_ORIGIN}@${author}`)).statusCode == 200
    ) {
      authors.push(author);
      await this.crawlModel.update(
        { author },
        { author, crawl: false },
        { upsert: true },
      );
      console.log('A new crawl job is coming!', authors);
      authors.length === 1 && this.startLoop();
    }
  }
  async searchBook(word) {
    console.log('mongo search:', cut(word, true));
    return this.gitbookModel
      .find(
        { $text: { $search: cut(word, true).join(' ') } },
        { score: { $meta: 'textScore' } },
      )
      .limit(100)
      .sort({ score: { $meta: 'textScore' } })
      .exec();
  }
  async bookList({ tag, sort }) {
    console.log('mongo book list', { find: { tag }, sort: { [sort]: -1 } });
    return this.gitbookModel
      .find({ tag })
      .limit(100)
      .sort({ [sort]: -1 })
      .exec();
  }
}
