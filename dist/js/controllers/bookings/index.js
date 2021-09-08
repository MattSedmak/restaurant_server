"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.addBooking = exports.findBookings = exports.getBookings = void 0;
const booking_1 = __importDefault(require("../../models/booking"));
const nodemailer = require('nodemailer');
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_1.default.find();
        res.status(200).json({ bookings });
    }
    catch (error) {
        throw error;
    }
});
exports.getBookings = getBookings;
const findBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let lastName = String(req.query.lastName);
        const bookings = yield booking_1.default.find({ lastName });
        console.log(lastName);
        res.status(200).json({ bookings });
    }
    catch (error) {
        throw error;
    }
});
exports.findBookings = findBookings;
const addBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const booking = new booking_1.default({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            mobile: body.mobile,
            guests: body.guests,
            seating: body.seating,
            information: body.information,
            date: body.date,
        });
        const newBooking = yield booking.save();
        const allBookings = yield booking_1.default.find();
        const transport = nodemailer.createTransport({
            host: 'smtp.zoho.eu',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USERMAIL,
                pass: process.env.USERPASSWORD,
            },
        });
        yield transport.sendMail({
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
        <h1>3 Dude's</h1>

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
    }
    catch (error) {
        console.log('error from add-booking');
        throw error;
    }
});
exports.addBooking = addBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateBooking = yield booking_1.default.findByIdAndUpdate({ _id: id }, body);
        const allBookings = yield booking_1.default.find();
        res.status(200).json({
            message: 'Booking updated',
            booking: updateBooking,
            bookings: allBookings,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBooking = yield booking_1.default.findByIdAndRemove(req.params.id);
        const allBookings = yield booking_1.default.find();
        res.status(200).json({
            message: 'Booking deleted',
            booking: deletedBooking,
            bookings: allBookings,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteBooking = deleteBooking;
