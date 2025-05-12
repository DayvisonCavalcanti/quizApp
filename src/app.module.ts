import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import {Question} from './question/question.entity'
import {Quiz} from './quiz/quiz.entity'
import {Result} from './result/result.entity'
import {User} from './user/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'D4YV1S0N39',  // Substitua pela senha do seu banco
      database: 'quiz_app',
      entities: [Question, Quiz, Result, User ],
      synchronize: true,  // Cuidado, em produção, use migrations!
        logging: true,  // Ativa o log para ver as consultas SQL
    }),
    UserModule,
    QuizModule,
    QuestionModule,
  ],
})
export class AppModule {}

