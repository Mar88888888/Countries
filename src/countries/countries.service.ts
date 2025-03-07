import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountriesService {
  async getAvailableCountries() {
    try {
      const response = await axios.get(`${process.env.DATE_NAGER_API}/AvailableCountries`);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching available countries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const [borderCountries, populationData, flagData] = await Promise.all([
        axios.get(`${process.env.DATE_NAGER_API}/CountryInfo/${countryCode}`),
        axios.get(`${process.env.COUNTRIES_NOW_API}/population`),
        axios.get(`${process.env.COUNTRIES_NOW_API}/flag/images`),
      ]);

      const flagindex = flagData.data.data.findIndex((flag) => flag.iso2 === countryCode);
      const flagUrl = flagindex !== -1 ? flagData.data.data[flagindex].flag : '';
      const iso3 = flagData.data.data[flagindex].iso3;
      const populationIndex = populationData.data.data.findIndex(
        (population) => population.iso3 === iso3,
      );
      const population =
        populationIndex !== -1 ? populationData.data.data[populationIndex].populationCounts : [];

      return {
        borders: borderCountries.data.borders || [],
        population: population,
        flagUrl: flagUrl,
      };
    } catch (error) {
      throw new HttpException('Error fetching country information', HttpStatus.BAD_REQUEST);
    }
  }
}
