import { Moment } from 'moment';

export type User = {
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Moment;
  picture: string;
  hiredDate: Moment;
  happiness: Array<number>;
  anger: Array<number>;
  fear: Array<number>;
  sadness: Array<number>;
  durations: Array<number>;
  feedback: Array<number>;
};

export type UserAPIResponse = {
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  picture: string;
  hiredDate: string;
  happiness: Array<number>;
  anger: Array<number>;
  fear: Array<number>;
  sadness: Array<number>;
  durations: Array<number>;
  feedback: Array<number>;
};
