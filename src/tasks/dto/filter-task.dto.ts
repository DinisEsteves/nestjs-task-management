import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class FilterTaskDto {
    @IsOptional()
    @IsNotEmpty()
    search?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}
