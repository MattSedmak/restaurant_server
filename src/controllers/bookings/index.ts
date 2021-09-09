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

    const transport = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USERMAIL,
        pass: process.env.USERPASSWORD,
      },
    });

    await transport.sendMail({
      from: process.env.USERMAIL,
      to: body.email,
      subject: 'Bokningsbekräftelse: 3 Dudes',
      html: `
      <h2>Tack för din bokning <strong style="text-transform: capitalize">${body.firstName} ${body.lastName}!</strong></h2>
      
        <h4 style="text-decoration:underline;">Bokningsinformation</h4>
        <ul>
        <li> <p><strong>Tid:</strong> ${body.seating}:00</p></li>
        <li> <p><strong>Antal gäster:</strong> ${body.guests}</p></li>
        <li> <p><strong>Datum:</strong> ${body.date}</p></li>
        </ul>
       
        <h4 style="margin-top:20px">Vi ser fram emot att träffa dig!</h4>
        <h1>The 3 Dudes</h1>

        <div style="margin-top:40px">
        <p style="font-style:italic;">Om du får förhinder, se till att avboka din bokning minst 2 timmar innan</p>
        <a href="http://localhost:3000/cancel/${newBooking._id}"><button style="background-color:red;color:white;padding:12px 28px;font-size:15px;border-radius:8px;">Avboka</button></a>
        </div>
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
