import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  synchronize: false,
  entities: [__dirname + '/../../**/*.typeorm.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
});
