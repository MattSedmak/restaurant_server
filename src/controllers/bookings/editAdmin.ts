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
      (selected) =>
        selected.date.toLocaleString('sv-SE').substring(0, 10) ===
        guestDate.substring(0, 10)
    );

    let timeResults = selectedDateResults.filter(
      (selected) => seatingTime === selected.seating
    );

    let numberOfTables: number = 1;
    let totalTables: number = 0;
    let currentGuests: number = 0;
    let isAvailable = {
      available: true,
    };

    for (let i = 0; i < timeResults.length; i++) {
      let guests = timeResults[i].guests;
      guests > 6 ? (numberOfTables = 2) : (numberOfTables = 1);
      guestNumber > 6 ? (currentGuests = 2) : (currentGuests = 1);

      totalTables += numberOfTables;
      console.log('isavailable ', isAvailable);
      if (totalTables + currentGuests >= 15) {
        console.log(isAvailable);
        isAvailable.available = false;
      }
    }
    // console.log(isAvailable);
    res.status(200).json(isAvailable);
  } catch (error) {
    throw error;
  }
};

export { getEditAdmin };
