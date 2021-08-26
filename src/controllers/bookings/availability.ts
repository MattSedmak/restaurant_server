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
      let guests = seatingTimeResults[i].guests;
      let oneDate = seatingTimeResults[i].date;
      guests > 6 ? (numberOfTables = 2) : numberOfTables;

      // Ta reda på om ListofDate har ett objekt som har samma date som på rad 28. 
      const found = listOfDates.find(d => d.date.toString() === oneDate.toString())
      
      // Om JA, ta objekt i listOfDate och lägg på nrOfTables till IAvailable tables. 
        if (found) {
          found.tables += numberOfTables
        } else {
          // OM NEJ, skapa ett objekt 
          listOfDates.push({
            date: oneDate,
            tables: numberOfTables,
            isAvailable: true,
          })
        } 
        // console.log(listOfDates)
    }
    console.log(listOfDates)
    
    
    res.status(200).json({ seatingTimeResults });
  } catch (error) {
    throw error;
  }
};

export { getAvailability };
