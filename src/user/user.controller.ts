import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    return this.userService.registerUser(body.name, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { token: string }) {
    return this.userService.verifyFirebaseToken(body.token);  // Passando o token para o método de verificação
  }
}
