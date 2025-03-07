import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class AddHolidaysDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsInt()
  @Min(1900)
  year: number;

  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  holidays: string[];
}
