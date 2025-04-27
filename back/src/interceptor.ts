import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map(value => {
                    if (value === undefined) {
                        return { success: true }
                    }
                    return { success: true, result: value }
                }),
                catchError(async (err: any, caught: Observable<any>) => {
                    return { success: false, result: { error: err.response || err.meta.cause } }
                })
            )
    }
}
