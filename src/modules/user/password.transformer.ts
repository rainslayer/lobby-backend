import { ValueTransformer } from 'typeorm';
import { UtilsService } from '@app/common/providers/utils.service';

export class PasswordTransformer implements ValueTransformer {
  to(value: string) {
    return UtilsService.generateHash(value);
  }

  from(value: string) {
    return value;
  }
}
