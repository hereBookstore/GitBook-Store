import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitbookSchema, CrawlSchema } from './app.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/kedo', {
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([
      { name: 'Gitbook', schema: GitbookSchema },
      { name: 'Crawl', schema: CrawlSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
