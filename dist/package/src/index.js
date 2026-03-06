"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandlerFactory = createHandlerFactory;
exports.createCrudHandlerFactory = createCrudHandlerFactory;
function createHandlerFactory(config) {
    return async (input) => {
        try {
            let processedInput = input;
            if (config.transform) {
                processedInput = config.transform(input);
            }
            if (config.validate) {
                const isValid = await Promise.resolve(config.validate(processedInput));
                if (!isValid) {
                    return {
                        success: false,
                        error: 'Validation failed',
                        timestamp: new Date(),
                    };
                }
            }
            const data = await Promise.resolve(config.execute(processedInput));
            return {
                success: true,
                data,
                timestamp: new Date(),
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            return {
                success: false,
                error: errorMessage,
                timestamp: new Date(),
            };
        }
    };
}
function createCrudHandlerFactory(model) {
    return {
        create: createHandlerFactory({
            execute: async (data) => model.create(data),
        }),
        read: createHandlerFactory({
            execute: async (input) => model.findById(input.id),
        }),
        update: createHandlerFactory({
            execute: async (input) => model.findByIdAndUpdate(input.id, input.data),
        }),
        delete: createHandlerFactory({
            execute: async (input) => model.findByIdAndDelete(input.id),
        }),
        list: createHandlerFactory({
            execute: async (input) => model
                .find()
                .skip(input.skip || 0)
                .limit(input.limit || 10),
        }),
    };
}
exports.default = createHandlerFactory;
//# sourceMappingURL=index.js.map