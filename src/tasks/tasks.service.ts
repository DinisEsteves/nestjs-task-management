import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { FindTaskDto } from './dto/find-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    async index(filterTaskDto: FilterTaskDto): Promise<Task[]> {
        const { search, status } = filterTaskDto;
        const query = this.taskRepository.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
                { search: `%${search.toLowerCase()}%` }
            );
        }

        return await query.getMany();
    }

    async store(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        return await this.taskRepository.save(task);
    }

    async show(findTaskDto: FindTaskDto): Promise<Task> {
        const { id } = findTaskDto;
        const task = await this.taskRepository.findOneBy({ id });

        if (!task) {
            throw new NotFoundException("Task not found");
        }
        return task;
    }

    async update(findTaskDto: FindTaskDto, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        const task = await this.show(findTaskDto);
        task.status = updateTaskStatusDto.status;

        return await this.taskRepository.save(task);
    }

    async delete(findTaskDto: FindTaskDto): Promise<void> {
        const result = await this.taskRepository.delete(findTaskDto.id);

        if (!result.affected) {
            throw new NotFoundException("Task not found");
        }
    }
}
