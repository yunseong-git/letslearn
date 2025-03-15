import { IsNotEmpty, IsString, IsOptional, IsInt, IsDateString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  genre!: string;

  @IsNotEmpty()
  @IsInt()
  duration!: number;

  @IsNotEmpty()
  @IsDateString()
  releaseDate!: string;
}