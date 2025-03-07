import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

describe('CountriesController', () => {
  let countriesController: CountriesController;
  let countriesService: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: {
            getAvailableCountries: jest.fn().mockReturnValue(['USA', 'UK', 'Germany']),
            getCountryInfo: jest.fn().mockReturnValue({ name: 'Ukraine', code: 'UA' }),
          },
        },
      ],
    }).compile();

    countriesController = module.get<CountriesController>(CountriesController);
    countriesService = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(countriesController).toBeDefined();
  });

  it('should return available countries', () => {
    expect(countriesController.getAvailableCountries()).toEqual(['USA', 'UK', 'Germany']);
  });

  it('should return country info', () => {
    expect(countriesController.getCountryInfo('UA')).toEqual({ name: 'Ukraine', code: 'UA' });
  });
});
