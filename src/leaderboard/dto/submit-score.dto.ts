import { IsInt, IsOptional, Min } from 'class-validator';

export class SubmitScoreDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsInt()
  @Min(0)
  score: number;
}
