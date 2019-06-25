import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

export const CrawlSchema = new mongoose.Schema({
  author: String,
  crawl: Boolean,
});
export const GitbookSchema = new mongoose.Schema({
  href: String,
  title: [String],
  description: [String],
  about: [String],
  author: String,
});
GitbookSchema.index(
  {
    title: 'text',
    description: 'text',
    about: 'text',
    author: 'text',
  },
  {
    name: 'GitBook index',
    weights: { title: 10, description: 4, about: 2, author: 1 },
  },
);
