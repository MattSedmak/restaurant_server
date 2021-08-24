import { Response, Request } from 'express';
import { IBooking } from './../../types/IBooking';
import { IAvailable } from './../../types/IAvailable';
import Booking from '../../models/booking';

const getAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
      let guestTime: number = Number(req.query.seating);
      const guestTimeTest = 18;
      let guestNumber: number = Number(req.query.guests);
      const maxBooking = 15;
      let availableArray: IBooking[] = [];

      const availability: IBooking[] = await Booking.find();
      availability.map((available) => {
        if (guestTimeTest === available.seating) {
            return available;
        }
      })

      res.status(200).json({ availableArray });
    } catch (error) {
      throw error;
    }
  };

  export { getAvailability };