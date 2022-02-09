import { IsNumber, IsString, IsBoolean, IsArray } from 'class-validator';

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

  @IsBoolean()
  public bestSeller: boolean;

  @IsString()
  public mainImage: string;

  @IsArray()
  public images: Array<string>;

  @IsNumber()
  public rating: number;

  @IsNumber()
  public ratingsTotal: number;
}
