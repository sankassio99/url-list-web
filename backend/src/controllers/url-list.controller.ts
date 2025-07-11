import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUrlListDto } from '../dtos/create-url-list.dto';
import { UpdateUrlListDto } from '../dtos/update-url-list.dto';
import { CreateUrlListUseCase } from '../use-cases/create-url-list.use-case';
import { DeleteUrlListUseCase } from '../use-cases/delete-url-list.use-case';
import { GetAllUrlListsUseCase } from '../use-cases/get-all-url-lists.use-case';
import { GetUrlListByIdUseCase } from '../use-cases/get-url-list-by-id.use-case';
import { GetUrlListBySlugUseCase } from '../use-cases/get-url-list-by-slug.use-case';
import { UpdateUrlListUseCase } from '../use-cases/update-url-list.use-case';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { UrlListDto } from 'src/dtos/url-list.dto';
import { UrlDto } from 'src/dtos/url.dto';

@ApiExtraModels(UrlListDto, UrlDto)
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
  @ApiResponse({ status: 200, description: 'Successful operation.', type: UrlListDto })
  create(@Body() createUrlListDto: CreateUrlListDto) {
    const created = this.createUrlListUseCase.execute(createUrlListDto);
    return created;
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Successful operation.', type: [UrlListDto] })
  findAll() {
    return this.getAllUrlListsUseCase.execute();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Successful operation.', type: UrlListDto  })
  findOne(@Param('id') id: string) {
    return this.getUrlListByIdUseCase.execute(id);
  }

  @Get('slug/:slug')
  @ApiResponse({ status: 200, description: 'Successful operation.', type: UrlListDto })
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
