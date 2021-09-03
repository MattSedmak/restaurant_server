import { Response, Request } from 'express';
import { IBooking } from '../../types/IBooking';
import Booking from '../../models/booking';

const getEditAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    let seatingTime: number = Number(req.query.seating);
    let guestNumber: number = Number(req.query.guests);
    let guestDate: string = String(req.query.date);
    const selectedSeating: IBooking[] = await Booking.find();

    let selectedDateResults = selectedSeating.filter(
      (selected) => selected.date.toLocaleString().substring(0, 9) === guestDate
    );

    let timeResults = selectedDateResults.filter(
      (selected) => seatingTime === selected.seating
    );

    let numberOfTables: number = 1;
    let totalTables: number = 0;
    let isAvailable = {
      available: true,
    };

    for (let i = 0; i < timeResults.length; i++) {
      let guests = timeResults[i].guests;
      guests > 6 ? (numberOfTables = 2) : (numberOfTables = 1);

      totalTables += numberOfTables;

      if (totalTables >= 15) {
        isAvailable.available = false;
      }
    }
    res.status(200).json(isAvailable);
  } catch (error) {
    throw error;
  }
};

export { getEditAdmin };
