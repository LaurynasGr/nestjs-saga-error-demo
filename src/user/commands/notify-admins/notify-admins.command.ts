import { ICommand } from '@nestjs/cqrs';
import { User } from 'src/user/types';

export interface NotifyAdminsCommandPayload {
  user: User;
}

export class NotifyAdminsCommand implements ICommand {
  constructor(public readonly payload: NotifyAdminsCommandPayload) {}
}
