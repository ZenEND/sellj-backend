import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RolesEnum } from '../users/interfaces/roles.enum';

@Injectable()
export class SeedService {
  @Inject(UsersService)
  private usersService: UsersService;

  seedUsers() {
    return this.usersService.createUser({
      password: '1234',
      email: 'admin@email.com',
      roles: [RolesEnum.Admin],
    });
  }
}
