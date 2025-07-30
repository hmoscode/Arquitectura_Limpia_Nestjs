export class User {
  private id?: number;
  private name: string;
  private email: string;
  private password: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private deletedAt?: Date | null;
  private isActive: boolean;

  constructor(props: {
    id?: number;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    isActive: boolean;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
    this.isActive = props.isActive;
  }

  getId(): number | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }
  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }
  getDeletedAt(): Date | null | undefined {
    return this.deletedAt;
  }
  getIsActive(): boolean {
    return this.isActive;
  }
  setName(name: string): void {
    this.name = name;
  }
  setEmail(email: string): void {
    this.email = email;
  }
  setPassword(password: string): void {
    this.password = password;
  }
  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }
  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
  setDeletedAt(deletedAt: Date | null): void {
    this.deletedAt = deletedAt;
  }
  setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }
}
