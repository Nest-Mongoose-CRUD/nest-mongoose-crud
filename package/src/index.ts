/**
 * Handler Factory - A reusable pattern for creating NestJS handlers
 *
 * Example usage:
 * const handler = createHandlerFactory((data) => {
 *   return processData(data);
 * });
 */

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

/**
 * Creates a handler with validation and transformation capabilities
 * @param config Handler configuration
 * @returns An async function that processes input according to config
 */
export function createHandlerFactory<T = any, R = any>(
  config: HandlerConfig<T>,
): (input: T) => Promise<HandlerResult<R>> {
  return async (input: T): Promise<HandlerResult<R>> => {
    try {
      // Transform input if transformer is provided
      let processedInput = input;
      if (config.transform) {
        processedInput = config.transform(input);
      }

      // Validate input if validator is provided
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

      // Execute the handler
      const data = await Promise.resolve(config.execute(processedInput));

      return {
        success: true,
        data,
        timestamp: new Date(),
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      return {
        success: false,
        error: errorMessage,
        timestamp: new Date(),
      };
    }
  };
}

/**
 * Creates a CRUD handler factory for database operations
 */
export function createCrudHandlerFactory<T = any>(model: any) {
  return {
    create: createHandlerFactory<T>({
      execute: async (data: T) => model.create(data),
    }),
    read: createHandlerFactory<{ id: string }>({
      execute: async (input) => model.findById(input.id),
    }),
    update: createHandlerFactory<{ id: string; data: T }>({
      execute: async (input) => model.findByIdAndUpdate(input.id, input.data),
    }),
    delete: createHandlerFactory<{ id: string }>({
      execute: async (input) => model.findByIdAndDelete(input.id),
    }),
    list: createHandlerFactory<{ skip?: number; limit?: number }>({
      execute: async (input) =>
        model
          .find()
          .skip(input.skip || 0)
          .limit(input.limit || 10),
    }),
  };
}

export default createHandlerFactory;
