import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { UpdateTaskByIdDto } from "../dto/updateTaskById-task.dto";
import { taskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        taskStatus.OPEN,
        taskStatus.IN_PROGRESS,
        taskStatus.DONE
    ];

    transform(value: UpdateTaskByIdDto):UpdateTaskByIdDto{

        if(!Object.keys(value).length){
            throw new BadRequestException('Invalid parameters!');
        }
        let status = value.status.toUpperCase();

        if(!this.isStatusValid(status)){
            throw new BadRequestException(status+' is an invalid Status!');
        }

        return value;
    }


    private isStatusValid(status:any){
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}