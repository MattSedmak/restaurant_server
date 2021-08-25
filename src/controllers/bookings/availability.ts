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

    console.log('seatingTimeResults ', seatingTimeResults);

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
