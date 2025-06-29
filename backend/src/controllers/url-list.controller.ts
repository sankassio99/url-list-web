import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUrlListDto } from '../dtos/create-url-list.dto';
import { UpdateUrlListDto } from '../dtos/update-url-list.dto';
import { CreateUrlListUseCase } from '../use-cases/create-url-list.use-case';
import { DeleteUrlListUseCase } from '../use-cases/delete-url-list.use-case';
import { GetAllUrlListsUseCase } from '../use-cases/get-all-url-lists.use-case';
import { GetUrlListByIdUseCase } from '../use-cases/get-url-list-by-id.use-case';
import { GetUrlListBySlugUseCase } from '../use-cases/get-url-list-by-slug.use-case';
import { UpdateUrlListUseCase } from '../use-cases/update-url-list.use-case';

@Controller('url-lists')
export class UrlListController {
  constructor(
    private readonly createUrlListUseCase: CreateUrlListUseCase,
    private readonly getAllUrlListsUseCase: GetAllUrlListsUseCase,
    private readonly getUrlListByIdUseCase: GetUrlListByIdUseCase,
    private readonly getUrlListBySlugUseCase: GetUrlListBySlugUseCase,
    private readonly updateUrlListUseCase: UpdateUrlListUseCase,
    private readonly deleteUrlListUseCase: DeleteUrlListUseCase,
  ) {}

  @Post()
  create(@Body() createUrlListDto: CreateUrlListDto) {
    return this.createUrlListUseCase.execute(createUrlListDto);
  }

  @Get()
  findAll() {
    return this.getAllUrlListsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUrlListByIdUseCase.execute(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.getUrlListBySlugUseCase.execute(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlListDto: UpdateUrlListDto) {
    return this.updateUrlListUseCase.execute(id, updateUrlListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUrlListUseCase.execute(id);
  }
}
