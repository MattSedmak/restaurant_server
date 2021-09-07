import { Response, Request } from 'express';
import { IBooking } from './../../types/IBooking';
import Booking from '../../models/booking';
const nodemailer = require('nodemailer');

const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings: IBooking[] = await Booking.find();
    res.status(200).json({ bookings });
  } catch (error) {
    throw error;
  }
};

const findBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    let lastName: string = String(req.query.lastName);
    const bookings: IBooking[] = await Booking.find({ lastName });
    console.log(lastName);
    res.status(200).json({ bookings });
  } catch (error) {
    throw error;
  }
};

const addBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IBooking,
      | 'firstName'
      | 'lastName'
      | 'email'
      | 'mobile'
      | 'guests'
      | 'seating'
      | 'information'
      | 'date'
    >;

    const booking: IBooking = new Booking({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      mobile: body.mobile,
      guests: body.guests,
      seating: body.seating,
      information: body.information,
      date: body.date,
    });

    const newBooking: IBooking = await booking.save();
    const allBookings: IBooking[] = await Booking.find();
    console.log(newBooking);
    console.log(process.env.USERMAIL);
    const transport = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USERMAIL,
        pass: process.env.USERPASSWORD,
      },
    });

    console.log(body.email);
    await transport.sendMail({
      from: process.env.USERMAIL,
      to: body.email,
      subject: 'Bokningsbekräftelse',
      html: `
      <h4>Tack för din bokning ${body.lastName}</h4>
      <p>http://localhost:4000/delete-booking/${newBooking._id}</p>
      `,
    });

    res.status(201).json({
      message: 'Booking added',
      booking: newBooking,
      bookings: allBookings,
    });
  } catch (error) {
    console.log('error from add-booking');
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

export { getBookings, findBookings, addBooking, updateBooking, deleteBooking };
