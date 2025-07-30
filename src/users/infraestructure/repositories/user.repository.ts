import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { UserTypeOrmEntity } from '../typeorm/user.typeorm.entity';
import { Not, Repository } from 'typeorm';
import { User } from 'src/users/domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly repository: Repository<UserTypeOrmEntity>,
    private readonly userMapper: UserMapper,
  ) {}

  async save(user: User): Promise<number> {
    const userTypeOrmEntity = this.repository.create({
      ...user,
    });
    const saved = await this.repository.save(userTypeOrmEntity);

    return saved.id;
  }

  async findById(id: number): Promise<User | null> {
    const userTypeOrmEntity = await this.repository.findOne({
      where: { id },
    });
    if (!userTypeOrmEntity) return null;

    return this.userMapper.toDomain(userTypeOrmEntity);
  }

  async findAll(): Promise<User[]> {
    const userTypeOrmEntites = await this.repository.find();

    const users = userTypeOrmEntites.map((entity) =>
      this.userMapper.toDomain(entity),
    );
    return users;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async update(id: number, user: User): Promise<void> {
    const userTypeOrmEntity = this.repository.create({
      ...user,
    });
    await this.repository.update(id, userTypeOrmEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userTypeOrmEntity = await this.repository.findOne({
      where: {
        email: email,
      },
    });
    if (!userTypeOrmEntity) return null;

    return this.userMapper.toDomain(userTypeOrmEntity);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const exists = await this.repository.exists({
      where: {
        email: email,
      },
    });
    return exists;
  }

  async existsByEmailAndIdNot(id: number, email: string): Promise<boolean> {
    const exists = await this.repository.exists({
      where: {
        email: email,
        id: Not(id),
      },
    });
    return exists;
  }

  async existsByEmailAndNameAndIdNot(
    id: number,
    email: string,
    name: string,
  ): Promise<boolean> {
    const exists = await this.repository.exists({
      where: {
        email: email,
        name: name,
        id: Not(id),
      },
    });
    return exists;
  }

  async existsByEmailAndName(email: string, name: string): Promise<boolean> {
    const exists = await this.repository.exists({
      where: {
        email: email,
        name: name,
      },
    });
    return exists;
  }

  async findByNameOrEmail(nameOrEmail: string): Promise<User | null> {
    const userTypeOrmEntity = await this.repository.findOne({
      where: [{ name: nameOrEmail }, { email: nameOrEmail }],
    });
    if (!userTypeOrmEntity) return null;
    return this.userMapper.toDomain(userTypeOrmEntity);
  }
}
