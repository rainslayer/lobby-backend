import { UserEntity } from '@app/modules/user/user.entity';

export interface IRequestWithUserCreds extends Express.Request {
  user: Omit<UserEntity, 'password'>;
}
