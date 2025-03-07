import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CalendarEvent } from '../calendar/calendar-event.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @OneToMany(() => CalendarEvent, (calendarEvent) => calendarEvent.user)
  calendarEvents: CalendarEvent[];
}
