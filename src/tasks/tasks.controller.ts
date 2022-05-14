import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    public get(): Task[] {
        return this.tasksService.get();
    }

    @Post()
    public store(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.store(createTaskDto);
    }

    @Get(':id')
    public show(@Param() params): Task {
        return this.tasksService.show(params.id);
    }
}
