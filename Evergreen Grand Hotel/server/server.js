import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import { registerUser, registerAdmin, loginUserGuest, loginUserAdmin, verifyToken } from './auth.js';
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

const app = express();
const PORT = process.env.PORT || 9000;
const SUPABASE_URL = 'https://egybfgjtfkxdnqpgianj.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVneWJmZ2p0Zmt4ZG5xcGdpYW5qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjQ3OTUyNCwiZXhwIjoyMDYyMDU1NTI0fQ.wXKw-NkeOjf7qosV8IRKVaHNxOL6CmVXHXHFz53IWCY";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
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

app.get('/api/admin/profile', verifyToken, getAdminProfile);
app.get('/api/admin/dashboard-overview', verifyToken, getDashboardOverview);

app.post('/api/book', createBooking);
app.get('/api/admin/rooms', verifyToken, getAllRooms);
app.get('/api/admin/rooms/:roomId', verifyToken, getRoom);
app.post('/api/admin/rooms', verifyToken, addRoom);
app.post('/api/admin/rooms/:roomId/update', verifyToken, updateRoom);
app.delete('/api/admin/rooms/:roomId', verifyToken, deleteRoom);

app.get('/api/admin/staff', verifyToken, getAllStaff);

app.get('/api/admin/guests', verifyToken, getGuests);
app.post('/api/admin/guests', verifyToken, addGuest);
app.post('/api/admin/guests/:guestId/update', verifyToken, updateGuest);

app.get('/api/admin/reservations', verifyToken, getReservations);
app.post('/api/admin/reservations/:reservationId/update', verifyToken, updateReservation);
app.get('/api/admin/reservations/:reservationId', verifyToken, getReservation);

app.get('/', (req, res) => {
    res.status(200).json({
      status: true,
      message: 'All systems working fine Bro',
    });
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});