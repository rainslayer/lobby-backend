import { EUserErrorMessages } from '@app/common/const/errorMessages';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IUserDto, SignUserDto } from '../user/user.dto';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';

@ApiTags('authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiCreatedResponse({ status: 200 })
  @ApiConflictResponse({
    status: 403,
    description: EUserErrorMessages.WRONG_CREDENTIALS,
  })
  @ApiBody({ type: SignUserDto })
  async signIn(@Body() signInUserDto: SignUserDto) {
    return await this.authService.login(
      await this.authService.validateUser(signInUserDto.login, signInUserDto.password)
    );
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ status: 200, type: UserEntity })
  @ApiConflictResponse({
    status: 209,
    description: EUserErrorMessages.LOGIN_TAKEN,
  })
  @ApiBody({ type: SignUserDto })
  async createUser(@Body() signUpUserDto: SignUserDto): Promise<IUserDto> {
    return await this.authService.signup(signUpUserDto);
  }
}
