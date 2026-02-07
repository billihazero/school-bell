// src/common/interceptors/response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MESSAGE_KEY } from '@common/decorators/message.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const res = http.getResponse();

    const message =
      this.reflector.get<string>(MESSAGE_KEY, context.getHandler()) ??
      this.reflector.get<string>(MESSAGE_KEY, context.getClass()) ??
      '';

    return next.handle().pipe(
      map((data) => ({
        status: res.statusCode,
        messages: message,
        data: data ?? null,
        total: null,
      })),
    );
  }
}
