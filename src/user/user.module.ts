import { Module } from '@nestjs/common';
import { UserSagas } from './user.saga';
import { UserController } from './user.controller';
import { UpdateUserCommandHandler } from './commands/update-user/update-user.handler';
import { GetUserQueryHandler } from './queries/get-user/get-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UserUpdatedEventHandler } from './events/user-updated/user-updated.handler';
import { NotifyAdminsCommandHandler } from './commands/notify-admins/notify-admins.handler';
import { UserService } from './user.service';

@Module({
  imports: [CqrsModule],
  providers: [
    GetUserQueryHandler,
    UpdateUserCommandHandler,
    UserUpdatedEventHandler,
    NotifyAdminsCommandHandler,
    UserSagas,
    UserService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
