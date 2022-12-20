import { IsNotEmpty, IsUUID } from "class-validator";

export class FindTaskDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
