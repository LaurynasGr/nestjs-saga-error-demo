import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CqrsModule, UnhandledExceptionBus, UnhandledExceptionInfo } from '@nestjs/cqrs';
import { Subject, takeUntil } from 'rxjs';

@Module({ imports: [CqrsModule, UserModule] })
export class AppModule implements OnModuleDestroy {
  private readonly logger = new Logger(AppModule.name);
  private destroy$ = new Subject<void>();

  constructor(private unhandledExceptionsBus: UnhandledExceptionBus) {
    this.unhandledExceptionsBus.pipe(takeUntil(this.destroy$)).subscribe((exceptionInfo: UnhandledExceptionInfo) => {
      this.logger.error('Exception occurred in the application!!!');
      this.logger.error(exceptionInfo.exception);
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
