import { IsEmail, IsString, IsDate } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public firstname: string;

  @IsString()
  public lastname: string;

  @IsString()
  public gender: string;

  @IsDate()
  public birthday: Date;

  @IsString()
  public adressId: string;
}
