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
      guests > 6 ? (numberOfTables = 2) : numberOfTables;

      // Ta reda på om ListofDate har ett objekt som har samma date som på rad 28.
      const found = listOfDates.find(
        (d) => d.date.toString() === oneDate.toString()
      );
      guestNumber > 6 ? (requestedTables = 2) : requestedTables;
      // Om JA, ta objekt i listOfDate och lägg på nrOfTables till IAvailable tables.
      if (found) {
        found.tables += numberOfTables + requestedTables;
        // 15 är max bord
        found.tables > 15 ? (found.isAvailable = false) : (found.isAvailable = true);
      } else {
        // OM NEJ, skapa ett objekt
        listOfDates.push({
          date: oneDate,
          tables: numberOfTables,
          isAvailable: true,
        });
      }
    }
    res.status(200).json(
      // message: 'Booking Availability',
      listOfDates,
    );
  } catch (error) {
    throw error;
  }
};

export { getAvailability };
