import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../utils/user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService) authService: AuthService;

  @Post('sign-in')
  private login(@Body() body: LoginDto, @User() user): Promise<string | never> {
    console.log(user);
    return this.authService.login(body);
  }

  @Post('sign-up')
  private register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
