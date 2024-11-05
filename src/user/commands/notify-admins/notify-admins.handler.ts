import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotifyAdminsCommand } from './notify-admins.command';

@CommandHandler(NotifyAdminsCommand)
export class NotifyAdminsCommandHandler implements ICommandHandler<NotifyAdminsCommand> {
  private readonly logger = new Logger(NotifyAdminsCommandHandler.name);

  async execute(command: NotifyAdminsCommand) {
    this.logger.debug('Handled NotifyAdminsCommandHandler with event:', JSON.stringify(command));

    // Send an email to the admins
    const userName = command.payload.user.name;
    this.logger.debug(`Sending email to admins: User "${userName}" has been updated.`);
  }
}
