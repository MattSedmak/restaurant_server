import { Response, Request } from 'express';
import { IBooking } from './../../types/IBooking';
import Booking from '../../models/booking';

const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings: IBooking[] = await Booking.find();
    res.status(200).json({ bookings });
    // res.send("Hello guys")
  } catch (error) {
    throw error;
  }
};

const addBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    // Try to get Pick to work...
    // const body = req.body as Pick<IBooking, "firstName" | "lastName" | "email" | "mobile" | "guests" | "seatings" | "date">

    const booking: IBooking = new Booking({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      guests: req.body.guests,
      seatings: req.body.seatings,
      date: req.body.date,
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
