import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get(':id/update')
  updateUser(@Param('id') id: string) {
    this.logger.debug('Received request to update user with id: ' + id);
    return this.userService.update(+id);
  }
}
