import { IsDate, Min, Max, IsNumber, IsString } from 'class-validator';

export class CreateRatingsDto {
  @IsString()
  public customerId: string;

  @IsString()
  public productId: string;

  @IsNumber()
  @Min(0.5)
  @Max(5)
  public rating: number;

  @IsDate()
  public timestamp: Date;
}
