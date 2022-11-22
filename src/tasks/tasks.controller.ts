import { Body, Controller, Get, Post, Param, Delete, Patch, Query, ConsoleLogger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    public get(@Query() filterTaskDto: FilterTaskDto): Task[] {
        if (Object.keys(filterTaskDto).length) {
            return this.tasksService.getFiltered(filterTaskDto);
        }
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
    public updateStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
        return this.tasksService.updateStatus(id, updateTaskStatusDto);
    }
}
