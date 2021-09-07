import { Response, Request } from 'express';
import { IBooking } from '../../types/IBooking';
import Booking from '../../models/booking';
import { isatty } from 'tty';
import { AnyARecord } from 'dns';

const getEditAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    let seatingTime: number = Number(req.query.seating);
    let guestNumber: number = Number(req.query.guests);
    let guestDate: string = String(req.query.date);
    let id: string = String(req.query.id);
    console.log('query id: ' + id);
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
    // let testingObject: {} = {};
    let isAvailable = {
      available: true,
    };

    for (let i = 0; i < timeResults.length; i++) {
      let guests = timeResults[i].guests;
      guests > 6 ? (numberOfTables = 2) : (numberOfTables = 1);
      guestNumber > 6 ? (newTables = 2) : (newTables = 1);

      let totalTables = (currentTables += numberOfTables);
      let totalTablesSameDateEdit = totalTables - newTables;
      // totalTablesSameDateEdit + newTables >= 16

      if (
        timeResults[i].id.toString() === id &&
        totalTablesSameDateEdit + newTables >= 16
      ) {
        // totalTablesSameDateEdit + newTables >= 16
        //   ? (isAvailable.available = false)
        //   : (isAvailable.available = true);
        // console.log(timeResults[i].id.toString());
        // console.log(timeResults[i]);
        isAvailable.available = false;
        console.log('första if körs');
      } else if (totalTables + newTables >= 16) {
        isAvailable.available = false;
        console.log('andra if id: ' + timeResults[i].id.toString());
        console.log('query id: ' + id);
        console.log('andra if körs');
        // NÄR EN BOKNING PÅ SAMMA DAG ÄNDRAS TILL 2 från 1 bildas nytt id?!?!
        // console.log(timeResults[i].id.toString());
        //console.log(timeResults[i]);
        //console.log(id);
      }

      // if (totalTables + newTables >= 16) {
      //   isAvailable.available = false;
      // }
    }

    console.log(isAvailable);
    res.status(200).json(isAvailable);
  } catch (error) {
    throw error;
  }
};

export { getEditAdmin };
