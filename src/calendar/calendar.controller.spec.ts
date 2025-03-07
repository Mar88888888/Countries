import { Test, TestingModule } from '@nestjs/testing';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { AddHolidaysDto } from './dto/add-holidays.dto';

describe('CalendarController', () => {
  let controller: CalendarController;
  let service: CalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarController],
      providers: [
        {
          provide: CalendarService,
          useValue: {
            addHolidaysToCalendar: jest.fn().mockResolvedValue('success'),
          },
        },
      ],
    }).compile();

    controller = module.get<CalendarController>(CalendarController);
    service = module.get<CalendarService>(CalendarService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call addHolidaysToCalendar and return success', async () => {
    const userId = '123';
    const dto: AddHolidaysDto = { holidays: ['Independence Day'], year: 2025, countryCode: 'US' };

    await expect(controller.addHolidays(userId, dto)).resolves.toBe('success');
    expect(service.addHolidaysToCalendar).toHaveBeenCalledWith(userId, dto);
  });
});
