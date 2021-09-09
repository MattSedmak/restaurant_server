import { Response, Request } from 'express';
import { IBooking } from '../../types/IBooking';
import Booking from '../../models/booking';

const getEditAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    let seatingTime: number = Number(req.query.seating);
    let guestNumber: number = Number(req.query.guests);
    let guestDate: string = String(req.query.date);
    let id: string = String(req.query.id);

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
    let currentTables: number = 0;
    let newTables: number = 0;

    let isAvailable: boolean = true;
    let totalTables: number = 0;

    for (let i = 0; i < timeResults.length; i++) {
      let guests = timeResults[i].guests;
      guests > 6 ? (numberOfTables = 2) : (numberOfTables = 1);
      guestNumber > 6 ? (newTables = 2) : (newTables = 1);
      totalTables = currentTables += numberOfTables;
    }

    let foundOwnBooking = false;
    let tablesFromCurrentBooking: number = 0;

    for (let i = 0; i < timeResults.length; i++) {
      if (timeResults[i].id.toString() === id) {
        foundOwnBooking = true;
        tablesFromCurrentBooking = Math.ceil(timeResults[i].guests / 6);
      }
    }

    if (foundOwnBooking) {
      if (totalTables - tablesFromCurrentBooking + newTables >= 16) {
        isAvailable = false;
        foundOwnBooking = true;
      }
    } else {
      if (totalTables + newTables >= 16) {
        isAvailable = false;
      }
    }

    res.status(200).json(isAvailable);
  } catch (error) {
    throw error;
  }
};

export { getEditAdmin };
