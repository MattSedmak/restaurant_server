"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookings_1 = require("../controllers/bookings");
const availability_1 = require("../controllers/bookings/availability");
const router = express_1.Router();
router.get('/bookings', bookings_1.getBookings);
router.get('/find-booking', bookings_1.findBookings);
router.post('/add-booking', bookings_1.addBooking);
router.put('/edit-booking/:id', bookings_1.updateBooking);
router.delete('/delete-booking/:id', bookings_1.deleteBooking);
router.get('/availability', availability_1.getAvailability);
exports.default = router;
