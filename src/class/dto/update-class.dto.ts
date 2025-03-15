import { IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class UpdateClassDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsDateString() // ✅ 날짜 형식 강제
  releaseDate?: string;
}