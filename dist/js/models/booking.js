"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    seating: {
        type: Number,
        required: true,
    },
    information: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.model('Booking', bookingSchema);
