import { EUserErrorMessages } from '@app/common/const/errorMessages';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteUserDto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  async getAllUsers() {
    const [users, count] = await this.userRepository.findAndCount({ relations: ['messages'] });
    return { users, count };
  }

  async deleteUser(deleteUserDto: DeleteUserDto) {
    const user = await this.userRepository.findOneBy({
      id: deleteUserDto.id,
      login: deleteUserDto.login,
    });

    if (!user) {
      throw new HttpException(EUserErrorMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.remove(user);
  }
}
