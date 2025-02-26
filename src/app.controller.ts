import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWomenDto } from './dto/create-women.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Post()
  create(@Body() createDto: CreateWomenDto) {
    return this.appService.create(createDto);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.appService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.appService.update(id, updatePostDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.appService.softDelete(id);
  }


}
