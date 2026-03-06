import { Model } from 'mongoose';
import { BaseCrudService } from 'utils/base-crud.service';
import { UserDocument } from './schemas/user.schema';
export declare class UserService extends BaseCrudService<UserDocument> {
    constructor(userModel: Model<UserDocument>);
}
