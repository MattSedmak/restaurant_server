import { Router } from 'express';
import {
  getBookings,
  addBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookings';

import { getAvailability } from '../controllers/bookings/availability';

const router: Router = Router();

router.get('/bookings', getBookings);

router.post('/add-booking', addBooking);

router.put('/edit-booking/:id', updateBooking);

router.delete('/delete-booking/:id', deleteBooking);

router.get('/availability', getAvailability);

export default router;
