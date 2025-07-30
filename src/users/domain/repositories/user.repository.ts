import { User } from '../entities/user.entity';

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<number>;
  findByEmail(email: string): Promise<User | null>;
  delete(id: number): Promise<void>;
  update(id: number, user: User): Promise<void>;
  findAll(): Promise<User[]>;
  existsByEmail(email: string): Promise<boolean>;
  existsByEmailAndIdNot(id: number, email: string): Promise<boolean>;
  existsByEmailAndNameAndIdNot(
    id: number,
    email: string,
    name: string,
  ): Promise<boolean>;

  existsByEmailAndName(email: string, name: string): Promise<boolean>;

  findByNameOrEmail(nameOrEmail: string): Promise<User | null>;
}
