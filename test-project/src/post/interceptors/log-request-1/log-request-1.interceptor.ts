import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LogRequest1Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptor 1');

    return next.handle().pipe(
      map((response: Record<string, any>) => {
        return {
          ...response,
          foo: 'bar',
        };
      }),
    );
  }
}
