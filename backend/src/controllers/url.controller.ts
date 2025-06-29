import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUrlDto } from '../dtos/create-url.dto';
import { UpdateUrlDto } from '../dtos/update-url.dto';
import { CreateUrlUseCase } from '../use-cases/create-url.use-case';
import { DeleteUrlUseCase } from '../use-cases/delete-url.use-case';
import { GetUrlsByListIdUseCase } from '../use-cases/get-urls-by-list-id.use-case';
import { UpdateUrlUseCase } from '../use-cases/update-url.use-case';

@Controller('urls')
export class UrlController {
  constructor(
    private readonly createUrlUseCase: CreateUrlUseCase,
    private readonly updateUrlUseCase: UpdateUrlUseCase,
    private readonly deleteUrlUseCase: DeleteUrlUseCase,
    private readonly getUrlsByListIdUseCase: GetUrlsByListIdUseCase,
  ) {}

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.createUrlUseCase.execute(createUrlDto);
  }

  @Get('list/:listId')
  findByListId(@Param('listId') listId: string) {
    return this.getUrlsByListIdUseCase.execute(listId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.updateUrlUseCase.execute(id, updateUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUrlUseCase.execute(id);
  }
}
