import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

  @IsString()
  public name: string;

  @IsString()
  public category: string;

  @IsString()
  public size: string;
  
  @IsString()
  public description: string;

  @IsNumber()
  public price: Number;

 
  
}

