import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEvent } from './calendar-event.entity';
import { AddHolidaysDto } from './dto/add-holidays.dto';
import axios from 'axios';
import { UserService } from '../user/user.service';

@Injectable()
export class CalendarService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(CalendarEvent)
    private readonly calendarRepository: Repository<CalendarEvent>,
  ) {}

  async addHolidaysToCalendar(userId: string, dto: AddHolidaysDto) {
    const { countryCode, year, holidays } = dto;

    const url = `${process.env.DATE_NAGER_API}/PublicHolidays/${year}/${countryCode}`;
    const response = await axios.get(url);

    if (!response.data || response.data.length === 0) {
      throw new NotFoundException(`No holidays found for ${countryCode} in ${year}`);
    }

    const selectedHolidays = response.data.filter((holiday) =>
      holidays.includes(holiday.localName),
    );

    if (selectedHolidays.length === 0) {
      throw new NotFoundException('No matching holidays found.');
    }

    const user = await this.userService.getUserById(parseInt(userId));

    const calendarEntries = selectedHolidays.map((holiday) =>
      this.calendarRepository.create({
        user: user,
        name: holiday.localName,
        date: holiday.date,
        countryCode,
      }),
    );

    await this.calendarRepository.save(calendarEntries);

    return {
      message: 'Holidays added successfully',
      holidays: selectedHolidays,
    };
  }
}
