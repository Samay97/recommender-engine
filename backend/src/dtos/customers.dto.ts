import { IsEmail, IsString } from 'class-validator';

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

  @IsString()
  public Email: string;

  @IsString()
  public Birthday: string;

  @IsString()
  public AdressId: string;
}
