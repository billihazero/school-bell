import { SetMetadata } from '@nestjs/common';

export const MESSAGE_KEY = 'response_message';

export const Message = (message: string): MethodDecorator & ClassDecorator =>
  SetMetadata(MESSAGE_KEY, message);
