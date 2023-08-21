import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../users/interfaces/roles.enum';
import { ROLES_KEY } from '../utils/constants';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements IAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  public handleRequest(err: unknown, user: UserEntity): any {
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    await super.canActivate(context);
    const { user } = context.switchToHttp().getRequest();

    if (requiredRoles.includes(RolesEnum.Any)) {
      return !!user;
    }
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
