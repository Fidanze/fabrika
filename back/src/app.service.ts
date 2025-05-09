import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UpdateTaskDto } from './dto/update-user.dto'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto
    });
  }

  findAll() {
    return this.prisma.task.findMany()
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id }, data: updateTaskDto })
  }

  remove(id: number){
    return this.prisma.task.delete({ where: { id } })
  }
}
