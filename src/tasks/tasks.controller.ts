import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    public get(): Task[] {
        return this.tasksService.get();
    }

    @Post()
    public store(@Body() request): Task {
        return this.tasksService.store(request.title, request.description);
    }
}
