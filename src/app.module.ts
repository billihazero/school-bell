import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { AllExceptionFilter } from '@common/interceptors/exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from 'test/test.module';

@Module({
  imports: [TestModule],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    AppService,
  ],
})
export class AppModule {}
