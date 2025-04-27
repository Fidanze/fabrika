//@ts-nocheck
import { IsBoolean, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    completed: boolean;
}
