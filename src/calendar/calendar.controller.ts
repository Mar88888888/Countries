import { Controller, Post, Param, Body } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { AddHolidaysDto } from './dto/add-holidays.dto';

@Controller('users/:userId/calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('holidays')
  async addHolidays(@Param('userId') userId: string, @Body() dto: AddHolidaysDto) {
    return this.calendarService.addHolidaysToCalendar(userId, dto);
  }
}
