import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskByIdDto } from './dto/getTaskById-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { v4 as uuidv4 } from 'uuid'
import { UpdateTaskByIdDto } from './dto/updateTaskById-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) getTaskFilterDto: GetTaskFilterDto):Task[]{
        if(Object.keys(getTaskFilterDto).length){
            return this.tasksService.getFilteredTask(getTaskFilterDto);
        }else{
            return this.tasksService.getAllTasks();
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto):Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id:uuidv4,getTaskById: GetTaskByIdDto):Promise<Task>{
        getTaskById = {id:id};
        return this.tasksService.getTaskById(getTaskById);
    }

    @Delete('/:id')
    async deleteTaskById(@Param('id') id:uuidv4,deleteTaskById: GetTaskByIdDto):Promise<void>{
        deleteTaskById = {id:id};
        this.tasksService.deleteTaskById(deleteTaskById);
    }

    @Patch('/:id/status')
    async updateTaskById(
        @Body() UpdateTaskByIdDto: UpdateTaskByIdDto,
        @Param('id') id:uuidv4, getTaskById: GetTaskByIdDto
    ):Promise<Task>{
        getTaskById = {id:id};
        return this.tasksService.updateTaskById(UpdateTaskByIdDto,getTaskById);
    }
}
