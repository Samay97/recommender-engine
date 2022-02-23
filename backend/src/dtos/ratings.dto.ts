import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateRatingsDto {
  @IsString()
  public customerId: string;

  @IsString()
  public productId: string;

  @IsNumber()
  public rating: number;

  @IsDate()
  public timestamp: Date;
}
