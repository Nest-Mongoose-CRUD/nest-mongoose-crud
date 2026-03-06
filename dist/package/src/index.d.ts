export interface HandlerConfig<T = any> {
    execute: (input: T) => Promise<any> | any;
    validate?: (input: T) => boolean | Promise<boolean>;
    transform?: (input: T) => T;
}
export interface HandlerResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: Date;
}
export declare function createHandlerFactory<T = any, R = any>(config: HandlerConfig<T>): (input: T) => Promise<HandlerResult<R>>;
export declare function createCrudHandlerFactory<T = any>(model: any): {
    create: (input: T) => Promise<HandlerResult<any>>;
    read: (input: {
        id: string;
    }) => Promise<HandlerResult<any>>;
    update: (input: {
        id: string;
        data: T;
    }) => Promise<HandlerResult<any>>;
    delete: (input: {
        id: string;
    }) => Promise<HandlerResult<any>>;
    list: (input: {
        skip?: number;
        limit?: number;
    }) => Promise<HandlerResult<any>>;
};
export default createHandlerFactory;
