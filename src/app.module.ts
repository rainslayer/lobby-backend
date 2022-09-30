import { Module } from '@nestjs/common';
import { options } from './ormconfig';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './modules/message/message.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(options), UserModule, MessageModule, AuthModule],
})
export class AppModule {}
