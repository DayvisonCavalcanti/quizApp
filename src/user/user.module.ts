import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';  // Importando o AuthModule para acessar o serviço de autenticação

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],  // Adicionando AuthModule aqui
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
