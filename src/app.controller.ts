import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('gitbook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('crawl/:author')
  async crawlBook(@Param('author') author) {
    return author && this.appService.crawlBook(author);
  }

  @Get('search')
  async searchBook(@Query('q') q) {
    return q && this.appService.searchBook(q);
  }
  @Get('list')
  async bookList(@Query() query) {
    return this.appService.bookList(query);
  }
}
