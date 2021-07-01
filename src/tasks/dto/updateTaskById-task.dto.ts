import { taskStatus } from "../tasks.model";
import { IsNotEmpty, Length } from 'class-validator';
export class UpdateTaskByIdDto {
    @IsNotEmpty()
    @Length(1,10)
    status: taskStatus;
}