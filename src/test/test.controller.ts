import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { Message } from '@common/decorators/message.decorator';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  @Get()
  @Message('hello 성공적으로 조회했습니다.')
  getHello(): string {
    return this.testService.getHello(); // 인터셉터가 감쌈
  }
}
