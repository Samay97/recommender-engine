import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  public city: string;

  @IsString()
  public address: string;
}
