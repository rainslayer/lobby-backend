import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { options } from '../../ormconfig';
import { MessageEntity } from './message.entity';
import { UserEntity } from '../user/user.entity';

describe('MessageService', () => {
  let messageService: MessageService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(options),
        TypeOrmModule.forFeature([MessageEntity, UserEntity]),
      ],
      providers: [MessageService],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
  });

  it('User must receive list of all messages', async () => {
    const { messages, count } = await messageService.getAllMessages();
    expect(messages).toBeInstanceOf(Array<MessageEntity>);
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
