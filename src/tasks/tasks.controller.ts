import { Body, Controller, Get, Post, Param, Delete, Patch, Query, ConsoleLogger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './task.entity';
import { FindTaskDto } from './dto/find-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    public index(@Param() filterTaskDto: FilterTaskDto): Promise<Task[]> {
        return this.tasksService.index(filterTaskDto);
    }

    @Post()
    public store(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.store(createTaskDto);
    }

    @Get("/:id")
    public show(@Param() findTaskDto: FindTaskDto): Promise<Task> {
        return this.tasksService.show(findTaskDto);
    }

    @Patch("/:id/status")
    public update(@Param() findTaskDto: FindTaskDto, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        return this.tasksService.update(findTaskDto, updateTaskStatusDto);
    }

    @Delete("/:id")
    public delete(@Param() findTaskDto: FindTaskDto): Promise<void> {
        return this.tasksService.delete(findTaskDto);
    }
}
