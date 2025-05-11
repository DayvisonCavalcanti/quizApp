import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';

@Module({
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService],  // Exportando o serviço para ser usado em outros módulos
})
export class AuthModule {}
