import { IUserDto, SignUserDto } from '../user/user.dto';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { options } from '../../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { EUserErrorMessages } from '../../common/const/errorMessages';
import { HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthModule } from './auth.module';

const testUserCreds: SignUserDto = {
  login: 'barakuda17',
  password: 'sheedari',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let user: IUserDto;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(options), TypeOrmModule.forFeature([UserEntity]), AuthModule],
      providers: [JwtService, AuthService, UserService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('Exception is thrown on wrong credentials', async () => {
    try {
      await authService.validateUser(testUserCreds.login, testUserCreds.password);
    } catch (e: any) {
      expect(e).toBeInstanceOf(Error);
      expect(e.response).toBe(EUserErrorMessages.WRONG_CREDENTIALS);
      expect(e.status).toEqual(403);
    }
  });

  it('User must be able to create account', async () => {
    const res = await authService.signup(testUserCreds);
    user = res;
    expect(res).toHaveProperty('id');
  });

  it('User must be warned when login is already in use', async () => {
    try {
      expect(await authService.signup(testUserCreds)).toBeInstanceOf(UserEntity);
    } catch (e: any) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.response).toBe(EUserErrorMessages.LOGIN_TAKEN);
      expect(e.status).toEqual(409);
    }
  });

  it('User must receive access_token on successful login', async () => {
    expect(await authService.login(user)).toHaveProperty('access_token');
  });

  afterAll(async () => {
    await userService.deleteUser({ login: testUserCreds.login });
  });
});
