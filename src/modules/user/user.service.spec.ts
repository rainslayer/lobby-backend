import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { options } from '../../ormconfig';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(options), TypeOrmModule.forFeature([UserEntity])],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('Any user must be able to get list of other users', async () => {
    const { users, count } = await userService.getAllUsers();
    expect(users).toBeInstanceOf(Array<UserEntity>);
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
