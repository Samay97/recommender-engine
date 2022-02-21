import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  public logo: string;

  @IsString()
  public name: string;
}
