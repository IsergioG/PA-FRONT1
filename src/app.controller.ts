import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWomenDto } from './dto/create-women.dto';
import { UpdateWomenDto } from './dto/update-women.dto';

@Controller('app')
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
  findOneById(@Param('id') id: number) {
    return this.appService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWomenDto: UpdateWomenDto) {
    return this.appService.update(id, updateWomenDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.appService.delete(id);
  }


}
