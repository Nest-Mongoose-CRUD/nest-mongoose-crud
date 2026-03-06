import { UserService } from './user.service';
import { BaseCrudController } from 'utils/base-crud.controller';
import { UserDocument } from './schemas/user.schema';
export declare class UserController extends BaseCrudController<UserDocument> {
    protected readonly service: UserService;
    constructor(service: UserService);
}
