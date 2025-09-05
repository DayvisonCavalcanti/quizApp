import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common'; // Importe HttpException e HttpStatus
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    try {
      const user = await this.userService.registerUser(body.name, body.email, body.password);
      return user; // Retorna o usuário criado ou uma mensagem de sucesso
    } catch (error) {
      // Exemplo: se o userService.registerUser lançar um erro específico (ex: email já existe)
      // Você pode querer capturá-lo e retornar um HttpException apropriado.
      // Isso depende de como seu userService lida com erros.
      if (error.message === 'Email already exists') { // Exemplo de verificação
        throw new HttpException({
          status: HttpStatus.CONFLICT, // 409 Conflict
          error: 'Este email já está cadastrado.',
        }, HttpStatus.CONFLICT);
      }
      // Para outros erros, um erro genérico do servidor
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Ocorreu um erro ao processar o cadastro.',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @Post('login')
  async login(@Body() body: { token: string }) {
    return this.userService.verifyFirebaseToken(body.token);
  }
}