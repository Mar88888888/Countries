import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { CalendarEvent } from './src/calendar/calendar-event.entity';
import { User } from './src/user/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [CalendarEvent, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
