import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = [
        "foo",
        "bar"
    ];

    /*
    * Defining the acessor in this case might be optional
    * by default it is public.
    */
    public get() {
        return this.tasks;
    }
}
