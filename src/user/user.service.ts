import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { FirebaseAuthService } from '../auth/firebase-auth.service';  // Importando o FirebaseAuthService

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private firebaseAuthService: FirebaseAuthService,  // Injetando o serviço de autenticação
  ) {}

  // Método para verificar o token do Firebase e pegar o usuário
  async verifyFirebaseToken(token: string): Promise<User> {
    try {
      const decodedToken = await this.firebaseAuthService.verifyToken(token);  // Verificando o token
      const email = decodedToken.email;
      let user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        // Se o usuário não existir, cria um novo
        user = this.userRepository.create({ email, name: decodedToken.name });
        await this.userRepository.save(user);
      }

      return user;
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }

  // Método para registrar o usuário
  async registerUser(name: string, email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ name, email, password });
    return this.userRepository.save(user);
  }
}
