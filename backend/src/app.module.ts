import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UrlListController } from './controllers/url-list.controller';
import { UrlController } from './controllers/url.controller';
import { UrlListRepository } from './repositories/url-list.repository';
import { UrlRepository } from './repositories/url.repository';
import { CreateUrlListUseCase } from './use-cases/create-url-list.use-case';
import { GetAllUrlListsUseCase } from './use-cases/get-all-url-lists.use-case';
import { GetUrlListByIdUseCase } from './use-cases/get-url-list-by-id.use-case';
import { GetUrlListBySlugUseCase } from './use-cases/get-url-list-by-slug.use-case';
import { UpdateUrlListUseCase } from './use-cases/update-url-list.use-case';
import { DeleteUrlListUseCase } from './use-cases/delete-url-list.use-case';
import { CreateUrlUseCase } from './use-cases/create-url.use-case';
import { UpdateUrlUseCase } from './use-cases/update-url.use-case';
import { DeleteUrlUseCase } from './use-cases/delete-url.use-case';
import { GetUrlsByListIdUseCase } from './use-cases/get-urls-by-list-id.use-case';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
  ],
  controllers: [AppController, UrlListController, UrlController],
  providers: [
    AppService,
    // Repositories
    UrlListRepository,
    UrlRepository,
    // URL List use cases
    CreateUrlListUseCase,
    GetAllUrlListsUseCase,
    GetUrlListByIdUseCase,
    GetUrlListBySlugUseCase,
    UpdateUrlListUseCase,
    DeleteUrlListUseCase,
    // URL use cases
    CreateUrlUseCase,
    UpdateUrlUseCase,
    DeleteUrlUseCase,
    GetUrlsByListIdUseCase,
  ],
})
export class AppModule {}
