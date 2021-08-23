import { Response, Request } from 'express';
import { IBooking } from './../../types/IBooking';
import Booking from '../../models/booking';

const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings: IBooking[] = await Booking.find();
    res.status(200).json({ bookings });
  } catch (error) {
    throw error;
  }
};

const addBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IBooking,
      'firstName' | 'lastName' | 'email' | 'mobile' | 'guests' | 'seating' | 'date'
    >;

    const booking: IBooking = new Booking({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      mobile: body.mobile,
      guests: body.guests,
      seating: body.seating,
      date: body.date,
    });

    const newBooking: IBooking = await booking.save();
    const allBookings: IBooking[] = await Booking.find();

    res.status(201).json({
      message: 'Booking added',
      booking: newBooking,
      bookings: allBookings,
    });
  } catch (error) {
    throw error;
  }
};

const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateBooking: IBooking | null = await Booking.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allBookings: IBooking[] = await Booking.find();
    res.status(200).json({
      message: 'Booking updated',
      booking: updateBooking,
      bookings: allBookings,
    });
  } catch (error) {
    throw error;
  }
};

const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBooking: IBooking | null = await Booking.findByIdAndRemove(
      req.params.id
    );
    const allBookings: IBooking[] = await Booking.find();
    res.status(200).json({
      message: 'Booking deleted',
      booking: deletedBooking,
      bookings: allBookings,
    });
  } catch (error) {
    throw error;
  }
};

export { getBookings, addBooking, updateBooking, deleteBooking };
