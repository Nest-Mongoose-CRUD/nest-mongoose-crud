import { CallHandler, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class LogRequest1Interceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
