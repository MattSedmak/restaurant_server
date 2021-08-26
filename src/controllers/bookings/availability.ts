import { Response, Request } from 'express';
import { IBooking } from './../../types/IBooking';
import { IAvailable } from './../../types/IAvailable';
import Booking from '../../models/booking';

const getAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    let seatingTime: number = Number(req.query.seating);
    const seatingTimeTest = 18;
    let guestNumber: number = Number(req.query.guests);
    const maxBooking = 15;

    const selectedSeatingTime: IBooking[] = await Booking.find();

    let seatingTimeResults: IBooking[] = selectedSeatingTime.filter(
      (selected) => seatingTimeTest === selected.seating
    );

    //  console.log('seatingTimeResults ', seatingTimeResults);

    // *** loop 1 = tid
    let numberOfTables: number = 1;
    let totalNumberOfTables: number = 0;
    let listOfDates: IAvailable[] = [];

    for (let i = 0; i < seatingTimeResults.length; i++) {
      let num = seatingTimeResults[i].guests;
      num > 6 ? (numberOfTables = 2) : numberOfTables;
      totalNumberOfTables += numberOfTables;
    }
    // console.log('totalNumberofTables: ', totalNumberOfTables);

    // *** loop 2 = datum
    for (let i = 0; i < seatingTimeResults.length; i++) {
      let date = seatingTimeResults[i].date;
    }

    // ************* //

    // Interface { date: Date, available: boolean}
    // Vi måste ange att en bokning med 1-6 gäster, motsvarar 1 bord. 7-12 gäster, motsvarar 2 bord.
    // Vi måste summera antal bord som finns för ett specifikt datum
    // OM 15 bord = available: false
    // OM <15 = available: true

    // ************* //

    res.status(200).json({ seatingTimeResults });
  } catch (error) {
    throw error;
  }
};

export { getAvailability };
