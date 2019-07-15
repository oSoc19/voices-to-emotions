import { Moment } from 'moment';

export type User = {
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Moment;
  picture: string;
  hiredDate: Moment;
};

export type UserAPIResponse = {
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  picture: string;
  hiredDate: string;
};
