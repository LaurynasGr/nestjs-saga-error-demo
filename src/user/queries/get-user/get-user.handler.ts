import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { User } from 'src/user/types';

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@doe.com' },
  { id: 2, name: 'Alice Caeiro', email: 'alice@caeiro.com' },
];

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery, User> {
  async execute({ id }: GetUserQuery): Promise<User> {
    return users.find((user) => user.id === +id);
  }
}
