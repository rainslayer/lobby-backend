import { EUserErrorMessages } from '@app/common/const/errorMessages';
import { UtilsService } from '@app/common/providers/utils.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserDto, SignUserDto } from '../user/user.dto';
import { UserEntity } from '../user/user.entity';
import * as requestContext from 'request-context-ts';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async login(user: IUserDto) {
    return { access_token: await this.jwtService.signAsync(user) };
  }

  async signup(signUpUserDto: SignUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneBy({ login: signUpUserDto.login });

    if (existingUser) {
      throw new HttpException(EUserErrorMessages.LOGIN_TAKEN, HttpStatus.CONFLICT);
    }

    const createdUser = await this.userRepository.save(signUpUserDto);
    delete createdUser.password;

    return createdUser;
  }

  async validateUser(login: string, password: string): Promise<IUserDto> {
    const user = await this.userRepository.findOne({
      where: { login },
      select: ['id', 'login', 'password'],
    });

    if (!user) {
      throw new HttpException(EUserErrorMessages.WRONG_CREDENTIALS, HttpStatus.FORBIDDEN);
    }

    if (await UtilsService.validateHash(password, user.password)) {
      const { password, ...rest } = user;
      requestContext.set('request.user', rest);
      return rest;
    }

    throw new HttpException(EUserErrorMessages.WRONG_CREDENTIALS, HttpStatus.FORBIDDEN);
  }
}
