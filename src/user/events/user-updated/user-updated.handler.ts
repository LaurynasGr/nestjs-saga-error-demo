import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserUpdatedEvent } from './user-updated.event';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedEventHandler implements IEventHandler<UserUpdatedEvent> {
  private readonly logger = new Logger(UserUpdatedEventHandler.name);

  handle(event: UserUpdatedEvent) {
    this.logger.debug('Handled UserUpdatedEventHandler with event:', JSON.stringify(event));
  }
}
