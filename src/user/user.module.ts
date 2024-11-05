import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { UserSagas } from './user.saga';
import { UserController } from './user.controller';
import { UpdateUserCommandHandler } from './commands/update-user/update-user.handler';
import { GetUserQueryHandler } from './queries/get-user/get-user.handler';
import { CqrsModule, UnhandledExceptionBus, UnhandledExceptionInfo } from '@nestjs/cqrs';
import { UserUpdatedEventHandler } from './events/user-updated/user-updated.handler';
import { NotifyAdminsCommandHandler } from './commands/notify-admins/notify-admins.handler';
import { UserService } from './user.service';
import { Subject, takeUntil } from 'rxjs';

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
export class UserModule implements OnModuleDestroy {
  private readonly logger = new Logger(UserModule.name);
  private destroy$ = new Subject<void>();

  constructor(private unhandledExceptionsBus: UnhandledExceptionBus) {
    this.unhandledExceptionsBus.pipe(takeUntil(this.destroy$)).subscribe((exceptionInfo: UnhandledExceptionInfo) => {
      this.logger.error('Exception occurred in the UserModule!!!');
      this.logger.error(exceptionInfo.exception);
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
