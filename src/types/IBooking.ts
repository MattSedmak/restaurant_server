import { Document } from 'mongoose';

export interface IBooking extends Document {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  guests: number;
  seating: number;
  information: string;
  date: Date;
}
