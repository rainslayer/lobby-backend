import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from './user.entity';

export type IUserDto = Omit<UserEntity, 'password'>;

export class SignUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class DeleteUserDto {
  @IsString()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  login?: string;
}
