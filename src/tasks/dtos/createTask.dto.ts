import { IsAlpha, MinLength } from 'class-validator';

export class CreateTaskDTO {
  @MinLength(5)
  @IsAlpha()
  title: string;

  @MinLength(10)
  @IsAlpha()
  description: string;
}
