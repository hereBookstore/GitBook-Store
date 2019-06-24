import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitbookSchema, CrawlSchema } from './app.schema';
import config from './config';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${
        config.MONGO_USER && config.MONGO_PWD
          ? config.MONGO_USER + ':' + config.MONGO_PWD + '@'
          : ''
      }${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB}`,
      {
        useNewUrlParser: true,
      },
    ),
    MongooseModule.forFeature([
      { name: 'Gitbook', schema: GitbookSchema },
      { name: 'Crawl', schema: CrawlSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
