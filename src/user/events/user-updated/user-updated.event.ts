import { IEvent } from '@nestjs/cqrs';

export interface UserUpdatedEventPayload {
  id: number;
}

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly payload: UserUpdatedEventPayload) {}
}
