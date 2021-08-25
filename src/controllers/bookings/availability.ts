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

    console.log(seatingTimeResults);

    // const nDate = new Date();
    // const count = seatingTimeResults.reduce(
    //   (acc, cur) => (cur.date === nDate ? ++acc : acc),
    //   0
    // );

    // alla results har samma tid. Vi vill räkna ut hur många objekt har samma datum.
    // 15st === fullt.
    // guestnumber (1-6) === 1 booking
    // guestnumber (7-12) === 2 bokkings

    res.status(200).json({ seatingTimeResults });
  } catch (error) {
    throw error;
  }
};

export { getAvailability };
