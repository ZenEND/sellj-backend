import { Controller, Get, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from './interfaces/roles.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Inject(UsersService) usersService: UsersService;

  @Get()
  @Roles(RolesEnum.Any)
  @ApiBearerAuth()
  getUsers() {
    return this.usersService.getUsers();
  }
}
