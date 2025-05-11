import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_text: string;

  @Column('json')
  options: string[]; // Ex: ["opção 1", "opção 2", "opção 3", "opção 4"]

  @Column()
  correct_answer: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
