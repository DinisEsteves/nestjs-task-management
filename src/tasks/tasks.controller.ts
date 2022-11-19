import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
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

    @Get('/:id')
    public show(@Param('id') id: string): Task {
        return this.tasksService.show(id);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): void {
        return this.tasksService.delete(id);
    }

    @Patch('/:id/status')
    public updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateStatus(id, status);
    }
}
