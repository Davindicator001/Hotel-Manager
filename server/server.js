import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { registerUser, registerAdmin, loginUserGuest, loginUserAdmin, verifyToken, verifyAdmin } from './auth.js';
import { fetchUserData, checkRoomAvailability, createBooking } from './dashboard.js';
import {
   getAllRooms,
   getRoom,
   addRoom,
   updateRoom,
   deleteRoom,
   getAdminProfile,
   getDashboardOverview,
   getAllStaff,
   getGuests,
   addGuest,
   updateGuest,
   getReservations,
   getReservation,
   updateReservation
  } from './admin.js';
dotenv.config();

import { connectDB } from './mongodb.js';

const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/api/register/user',registerUser);
app.post('/api/register/admin',registerAdmin);
app.post('/api/login/guest',loginUserGuest);
app.post('/api/login/admin',loginUserAdmin);

app.get('/api/userdata',verifyToken,fetchUserData);

app.post('/api/rooms/check-availability', verifyToken, checkRoomAvailability);

    app.get('/api/admin/profile', verifyAdmin, getAdminProfile);
    app.get('/api/admin/dashboard-overview', verifyAdmin, getDashboardOverview);

app.post('/api/book', createBooking);
    app.get('/api/admin/rooms', verifyAdmin, getAllRooms);
    app.get('/api/admin/rooms/:roomId', verifyAdmin, getRoom);
    app.post('/api/admin/rooms', verifyAdmin, addRoom);
    app.post('/api/admin/rooms/:roomId/update', verifyAdmin, updateRoom);
    app.delete('/api/admin/rooms/:roomId', verifyAdmin, deleteRoom);

    app.get('/api/admin/staff', verifyAdmin, getAllStaff);

    app.get('/api/admin/guests', verifyAdmin, getGuests);
    app.post('/api/admin/guests', verifyAdmin, addGuest);
    app.post('/api/admin/guests/:guestId/update', verifyAdmin, updateGuest);

    app.get('/api/admin/reservations', verifyAdmin, getReservations);
    app.post('/api/admin/reservations/:reservationId/update', verifyAdmin, updateReservation);
    app.get('/api/admin/reservations/:reservationId', verifyAdmin, getReservation);

app.get('/', (req, res) => {
    res.status(200).json({
      status: true,
      message: 'All systems working fine Bro',
    });
  });
  
// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });