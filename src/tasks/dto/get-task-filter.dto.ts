import { IsEnum, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { taskStatus } from "../tasks.model";

export class GetTaskFilterDto {
    @IsOptional()
    @IsEnum(taskStatus)
    status: taskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}