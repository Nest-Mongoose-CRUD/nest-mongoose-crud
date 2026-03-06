import { Model, Document } from 'mongoose';
import IQuery from './interfaces/query.interface';
export declare abstract class BaseCrudService<T extends Document, CreateDto = any, UpdateDto = any> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    findAll(query: IQuery): Promise<{
        status: string;
        total: number;
        nextPage: number | null;
        prevPage: number | null;
        count: number;
        pages: number;
        currentPage: number;
        data: import("mongoose").IfAny<T, any, Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
            __v?: infer U;
        } ? T_1 : T_1 & {
            __v: number;
        } : never : never)>[];
    }>;
    findOne(id: string, query?: Partial<IQuery>): Promise<{
        status: string;
        data: import("mongoose").IfAny<T, any, Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
            __v?: infer U;
        } ? T_1 : T_1 & {
            __v: number;
        } : never : never)>;
    }>;
    createOne(createDto: CreateDto): Promise<{
        status: string;
        data: import("mongoose").IfAny<T, any, Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
            __v?: infer U;
        } ? T_1 : T_1 & {
            __v: number;
        } : never : never)>;
    }>;
    updateOne(id: string, updateDto: UpdateDto): Promise<{
        status: string;
        data: import("mongoose").IfAny<T, any, Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
            __v?: infer U;
        } ? T_1 : T_1 & {
            __v: number;
        } : never : never)> | null;
    }>;
    deleteOne(id: string): Promise<{
        status: string;
    }>;
    find(filter?: any, query?: Partial<IQuery>): Promise<import("mongoose").IfAny<T, any, Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
        __v?: infer U;
    } ? T_1 : T_1 & {
        __v: number;
    } : never : never)>[]>;
    findOneBy(filter?: any, query?: Partial<IQuery>): Promise<import("mongoose").IfAny<T, any, Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
        __v?: infer U;
    } ? T_1 : T_1 & {
        __v: number;
    } : never : never)>[]>;
    findById(id: string): Promise<T | null>;
    count(filter?: any): Promise<number>;
    exists(filter?: any): Promise<boolean>;
}
