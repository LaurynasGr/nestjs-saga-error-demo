import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './queries/get-user/get-user.query';
import { User } from './types';
import { UpdateUserCommand } from './commands/update-user/update-user.query';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async get(id: number) {
    return this.queryBus.execute<GetUserQuery, User>(new GetUserQuery(id));
  }

  public async update(id: number) {
    return this.commandBus.execute<UpdateUserCommand, User>(new UpdateUserCommand(id));
  }
}
