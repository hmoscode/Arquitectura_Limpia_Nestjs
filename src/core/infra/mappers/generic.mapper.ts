export interface IGenericMapper<TypeOrmEntity, DomainEntity> {
  toDomain(entity: TypeOrmEntity): DomainEntity;
  toTypeOrm(domain: DomainEntity): TypeOrmEntity;
}

export class GenericMapper<TypeOrmEntity, DomainEntity>
  implements IGenericMapper<TypeOrmEntity, DomainEntity>
{
  toDomain(entity: TypeOrmEntity): DomainEntity {
    return { ...entity } as unknown as DomainEntity;
  }

  toTypeOrm(domain: DomainEntity): TypeOrmEntity {
    return { ...domain } as unknown as TypeOrmEntity;
  }
}
