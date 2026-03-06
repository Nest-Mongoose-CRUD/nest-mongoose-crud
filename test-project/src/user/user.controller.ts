import { Controller } from '@nestjs/common';

import { UserService } from './user.service';

import { BaseCrudController } from 'utils/base-crud.controller';
import { UserDocument } from './schemas/user.schema';

@Controller('users')
export class UserController extends BaseCrudController<UserDocument> {
  constructor(protected readonly service: UserService) {
    super();
  }
}
