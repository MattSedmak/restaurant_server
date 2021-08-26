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
exports.deleteBooking = exports.updateBooking = exports.addBooking = exports.getBookings = void 0;
const booking_1 = __importDefault(require("../../models/booking"));
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
        res.status(201).json({
            message: 'Booking added',
            booking: newBooking,
            bookings: allBookings,
        });
    }
    catch (error) {
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
