import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'senha',  // Substitua pela senha do seu banco
      database: 'quiz_app',
      entities: [],
      synchronize: true,  // Cuidado, em produção, use migrations!
    }),
    UserModule,
    QuizModule,
    QuestionModule,
  ],
})
export class AppModule {}

