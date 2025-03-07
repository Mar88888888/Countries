import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import axios from 'axios';
import { HttpException } from '@nestjs/common';

jest.mock('axios');

describe('CountriesService', () => {
  let service: CountriesService;
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesService],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return available countries', async () => {
    mockedAxios.get.mockResolvedValue({ data: ['USA', 'UK', 'Germany'] });
    await expect(service.getAvailableCountries()).resolves.toEqual(['USA', 'UK', 'Germany']);
  });

  it('should throw an error if fetching available countries fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Request failed'));
    await expect(service.getAvailableCountries()).rejects.toThrow(HttpException);
  });

  it('should return country information', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/CountryInfo/')) {
        return Promise.resolve({ data: { borders: ['POL', 'SVK'] } });
      }
      if (url.includes('/flag/images')) {
        return Promise.resolve({ data: { data: [{ iso2: 'UA', iso3: 'UKR', flag: 'flag-url' }] } });
      }
      if (url.includes('/population')) {
        return Promise.resolve({
          data: { data: [{ iso3: 'UKR', populationCounts: [{ year: 2025, value: 40000000 }] }] },
        });
      }
      return Promise.reject(new Error('Not found'));
    });

    await expect(service.getCountryInfo('UA')).resolves.toEqual({
      borders: ['POL', 'SVK'],
      population: [{ year: 2025, value: 40000000 }],
      flagUrl: 'flag-url',
    });
  });

  it('should throw an error if fetching country information fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Request failed'));
    await expect(service.getCountryInfo('UA')).rejects.toThrow(HttpException);
  });
});
