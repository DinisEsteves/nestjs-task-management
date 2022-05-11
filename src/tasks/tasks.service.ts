import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

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
}
