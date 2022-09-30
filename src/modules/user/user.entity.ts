import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MessageEntity } from '../message/message.entity';
import { PasswordTransformer } from './password.transformer';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  login: string;

  @ApiProperty()
  @Column({ nullable: false, transformer: new PasswordTransformer(), select: false })
  @ApiHideProperty()
  password: string;

  @ApiProperty({ type: () => MessageEntity, isArray: true })
  @OneToMany(() => MessageEntity, (message) => message.author)
  messages: MessageEntity[];
}
