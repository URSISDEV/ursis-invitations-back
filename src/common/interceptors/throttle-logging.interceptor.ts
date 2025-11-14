import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ThrottlerException } from '@nestjs/throttler';
import { CustomLoggerService } from '../logger/logger.service';

@Injectable()
export class ThrottleLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ThrottlerException) {
          const request = context.switchToHttp().getRequest();
          const { method, url, ip } = request;
          const userAgent = request.get('User-Agent') || 'unknown';

          // Log específico para rate limiting usando el método dedicado
          this.logger.logRateLimitViolation({
            ip,
            userAgent,
            endpoint: url,
            method
          });

          // Log adicional para contexto
          this.logger.warn(
            `Rate limit exceeded: ${method} ${url} - IP: ${ip}`,
            'ThrottleLoggingInterceptor'
          );
        }

        return throwError(() => error);
      })
    );
  }
}
