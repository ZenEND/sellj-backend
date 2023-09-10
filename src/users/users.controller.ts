import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from './interfaces/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from '../utils/current-user';
import { UserEntity } from './user.entity';
import { CurrentUserInterceptor } from './users.interseptor';

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

  @Get('me')
  @UseInterceptors(CurrentUserInterceptor)
  getMe(@CurrentUser() user: UserEntity) {
    return this.usersService.findOne(user.id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
