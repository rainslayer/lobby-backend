import { EUserErrorMessages } from '@app/common/const/errorMessages';
import { Controller, Delete, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import {
  ApiGoneResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteUserDto, IUserDto, SignUserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ status: 200, type: UserEntity, isArray: true })
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user' })
  @ApiGoneResponse({ status: HttpStatus.NO_CONTENT })
  @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND })
  async deleteUser(@Query() query: DeleteUserDto): Promise<IUserDto> {
    return await this.userService.deleteUser(query);
  }
}
