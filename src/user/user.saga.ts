import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import {
  Observable,
  // catchError,
  map,
  mergeMap,
  // of
} from 'rxjs';
import { UserUpdatedEvent } from './events/user-updated/user-updated.event';
import { NotifyAdminsCommand } from './commands/notify-admins/notify-admins.command';
import { UserService } from './user.service';

@Injectable()
export class UserSagas {
  private readonly logger = new Logger(UserSagas.name);

  constructor(private readonly userService: UserService) {}

  @Saga()
  notifyAdminOnUserUpdate = (events$: Observable<UserUpdatedEvent>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserUpdatedEvent),
      mergeMap(async ({ payload }) => {
        this.logger.debug('UserUpdatedEvent... Notifying admins. User:', JSON.stringify(payload));
        const user = await this.userService.get(payload.id);

        // The below code will cause an error and crash the application (unless process.on('uncaughtException') is uncommented in main.ts.
        // The same exact error is thrown in NotifyAdminsCommandHandler but that gets handled by NestJS.
        if (payload.id === 4) {
          const userName = user.name;
          this.logger.debug(`Will be sending email to admins: User "${userName}" has been updated.`);
        }

        return { user };
      }),
      map((payload) => new NotifyAdminsCommand(payload)),
      // The below code would prevent the app from crashing but it would also prevent
      // the saga from ever being triggered again after the first time it throws
      // catchError((error) => {
      //   this.logger.error('Error:', error);
      //   return of();
      // }),
    );
}
