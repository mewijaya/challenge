import { User } from 'src/auth/models/user.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.scores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;
}
