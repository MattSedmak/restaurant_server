import { IBooking } from '../types/IBooking';
import { model, Schema } from 'mongoose';

const bookingSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    seating: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IBooking>('Booking', bookingSchema);
