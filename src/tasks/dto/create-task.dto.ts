import { IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @Length(5,20)
    title: string;

    @IsNotEmpty()
    @Length(5,40)
    description: string;
}