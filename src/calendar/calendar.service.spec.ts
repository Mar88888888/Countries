import { Test, TestingModule } from '@nestjs/testing';
import { CalendarService } from './calendar.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CalendarEvent } from './calendar-event.entity';
import { UserService } from '../user/user.service';
import axios from 'axios';
import { AddHolidaysDto } from './dto/add-holidays.dto';

jest.mock('axios');

describe('CalendarService', () => {
  let service: CalendarService;
  let calendarRepository: Repository<CalendarEvent>;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalendarService,
        {
          provide: getRepositoryToken(CalendarEvent),
          useValue: {
            create: jest.fn().mockImplementation((event) => event),
            save: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<CalendarService>(CalendarService);
    calendarRepository = module.get<Repository<CalendarEvent>>(getRepositoryToken(CalendarEvent));
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add holidays to calendar', async () => {
    const dto: AddHolidaysDto = {
      countryCode: 'US',
      year: 2025,
      holidays: ["New Year's Day"],
    };

    (axios.get as jest.Mock).mockResolvedValue({
      data: [{ localName: "New Year's Day", date: '2025-01-01' }],
    });

    await expect(service.addHolidaysToCalendar('1', dto)).resolves.toEqual({
      message: 'Holidays added successfully',
      holidays: [{ localName: "New Year's Day", date: '2025-01-01' }],
    });
  });
});
