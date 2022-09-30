import { EUserErrorMessages } from '@app/common/const/errorMessages';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateMessageDto } from './message.dto';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  async getAllMessages() {
    const [messages, count] = await this.messageRepository.findAndCount({
      relations: ['author'],
    });

    return { messages, count };
  }

  async sendNewMessage(createMessageDto: CreateMessageDto, userId: number) {
    const author = await this.userRepository.findOneBy({ id: userId });

    if (author) {
      const message = {
        ...createMessageDto,
        author,
      };

      delete message?.author?.password;
      return await this.messageRepository.save(message);
    }

    throw new HttpException(EUserErrorMessages.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
  }
}
