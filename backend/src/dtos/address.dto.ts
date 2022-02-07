import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  public password: string;

  @IsString()
  public city: string;

  @IsString()
  public address: string;
}
