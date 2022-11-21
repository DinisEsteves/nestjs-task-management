import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    /*
    * Defining the acessor in this case might be optional
    * by default it is public.
    */
    public get(): Task[] {
        return this.tasks;
    }

    public getFiltered(filterTaskDto: FilterTaskDto): Task[] {
        const { status, search } = filterTaskDto;
        let tasks = this.get();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    public store(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }

    public show(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    public delete(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    public updateStatus(id: string, status: TaskStatus): Task {
        const task = this.show(id);
        task.status = status;
        return task;
    }
}
