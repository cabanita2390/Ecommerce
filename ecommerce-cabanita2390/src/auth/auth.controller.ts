import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  signin(@Body('email') email: string, @Body('password') password: string) {
    const signin = this.authService.signin(email, password);

    return signin;
  }
}
