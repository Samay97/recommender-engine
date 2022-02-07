import { IsEmail, IsString, IsDate } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public Firstname: string;

  @IsString()
  public Lastname: string;

  @IsString()
  public Gender: string;

  @IsDate()
  public Birthday: Date;

  @IsString()
  public AdressId: string;
}
