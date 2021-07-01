import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, taskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskByIdDto } from './dto/getTaskById-task.dto';
import { UpdateTaskByIdDto } from './dto/updateTaskById-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }

    getFilteredTask(getTaskFilterDto:GetTaskFilterDto):Task[]{
        const {status,search} = getTaskFilterDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto):Task{
        const {title,description} = createTaskDto;

        const task: Task = {
            id:uuidv4(),
            title,
            description,
            status: taskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    getTaskById(getTaskById: GetTaskByIdDto):Task{
        const data = this.tasks.find(task => task.id === getTaskById.id);

        if(!data){
            throw new NotFoundException('Task with ID '+getTaskById.id+' not found');
        }

        return data;
    }

    deleteTaskById(deleteTaskById: GetTaskByIdDto){
        const data = this.getTaskById(deleteTaskById);
        this.tasks = this.tasks.filter(task => task.id !== data.id);
    }

    updateTaskById(updateTaskById: UpdateTaskByIdDto,getTaskById:GetTaskByIdDto):Task{
        const task = this.getTaskById(getTaskById);
        task.status = updateTaskById.status;
        return task;
    }

}
