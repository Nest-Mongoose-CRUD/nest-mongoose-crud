import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}
export declare enum UserStatus {
    PENDING = "pending",
    ACTIVE = "active",
    SUSPENDED = "suspended"
}
export declare class User {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    lastLogin: Date;
    role: UserRole;
    status: UserStatus;
    isActive: boolean;
    tags: string[];
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
