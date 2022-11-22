import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class FilterTaskDto {
    search?: string;

    @IsEnum(TaskStatus)
    status?: TaskStatus;
}
