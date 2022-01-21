export interface IClima {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  updatedAt: Date;
  hourly: object[];
  daily: object[];
}
