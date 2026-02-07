import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: any = 'Internal server error';
    let data = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        messages = res;
      } else {
        messages = (res as any).message ?? messages;
        data = (res as any).data ?? null;
      }
    }

    response.status(status).json({
      status,
      messages,
      data,
      total: null,
    });
  }
}
