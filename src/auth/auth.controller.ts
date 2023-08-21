import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService) authService: AuthService;

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.authService.login(body);
  }

  @Post('register')
  private register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
