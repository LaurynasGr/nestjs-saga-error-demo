import { EventBus, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.query';
import { UserUpdatedEvent } from 'src/user/events/user-updated/user-updated.event';
import { User } from 'src/user/types';
import { UserService } from 'src/user/user.service';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand, User> {
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ id }: UpdateUserCommand): Promise<User> {
    const user = await this.userService.get(id);

    this.eventBus.publish(new UserUpdatedEvent({ id }));

    return user;
  }
}
