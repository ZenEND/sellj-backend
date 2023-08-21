import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RolesEnum } from '../users/interfaces/roles.enum';

@Injectable()
export class AuthService {
  private readonly jwt: JwtService;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<UserEntity> {
    return this.usersService.findOne(decoded.id);
  }

  // Generate JWT Token
  public generateToken(user: UserEntity): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: UserEntity = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }

  public async register(body: RegisterDto) {
    const { email, password }: RegisterDto = body;
    let user = await this.usersService.findByEmail(email);

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    user = new UserEntity();

    user.email = email;
    user.password = this.encodePassword(password);
    user.roles = [RolesEnum.User];
    return this.usersService.createUser(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return this.generateToken(user);
  }

  public async refresh(user: UserEntity): Promise<string> {
    return this.generateToken(user);
  }
}
