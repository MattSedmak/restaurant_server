import { Response, Request } from 'express';
import { IBooking } from './../../types/IBooking';
import { IAvailable } from './../../types/IAvailable';
import Booking from '../../models/booking';

const getAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    let seatingTime: number = Number(req.query.seating);
    let guestNumber: number = Number(req.query.guests);

    const selectedSeatingTime: IBooking[] = await Booking.find();
    let seatingTimeResults: IBooking[] = selectedSeatingTime.filter(
      (selected) => seatingTime === selected.seating
    );

    let numberOfTables: number = 1;
    let requestedTables: number = 1;
    let listOfDates: IAvailable[] = [];

    for (let i = 0; i < seatingTimeResults.length; i++) {
      let guests = seatingTimeResults[i].guests;
      let oneDate = seatingTimeResults[i].date;
      guests > 6 ? (numberOfTables = 2) : (numberOfTables = 1);
      guestNumber > 6 ? (requestedTables = 2) : (requestedTables = 1);

      const found = listOfDates.find(
        (d) =>
          d.date.toLocaleString().substring(0, 10) ===
          oneDate.toLocaleString().substring(0, 10)
      );

      if (found) {
        let tableCheck = (found.tables += numberOfTables);
        let test = tableCheck + requestedTables;
        test >= 16 ? (found.isAvailable = false) : (found.isAvailable = true);
      } else {
        listOfDates.push({
          date: oneDate,
          tables: numberOfTables,
          isAvailable: true,
        });
      }
    }
    res.status(200).json(listOfDates);
  } catch (error) {
    throw error;
  }
};

export { getAvailability };
