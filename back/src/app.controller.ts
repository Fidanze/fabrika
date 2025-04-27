import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-user.dto'

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.appService.create(createTaskDto)
  }

  @Get()
  async findAll() {
    return { tasks: await this.appService.findAll() }
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.appService.update(id, updateTaskDto)
  }


  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.remove(id);
  }
}
