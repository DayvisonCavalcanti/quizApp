import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from '../question/question.entity';
import { Result } from 'src/result/result.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions: Question[];

   @OneToMany(() => Result, (result) => result.quiz)
  results: Result[];
}