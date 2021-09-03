import { Router } from 'express';
import {
  getBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  findBookings,
} from '../controllers/bookings';

import { getAvailability } from '../controllers/bookings/availability';
import { getEditAdmin } from '../controllers/bookings/editAdmin';

const router: Router = Router();

router.get('/bookings', getBookings);

router.get('/find-booking', findBookings);

router.post('/add-booking', addBooking);

router.get('/edit-admin', getEditAdmin);

router.put('/edit-booking/:id', updateBooking);

router.delete('/delete-booking/:id', deleteBooking);

router.get('/availability', getAvailability);

export default router;
