import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { CalendarModule } from './calendar/calendar.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './calendar/calendar-event.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [CalendarEvent, User],
      synchronize: false,
    }),
    CountriesModule,
    CalendarModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
