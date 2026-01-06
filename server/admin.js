import { Admin, Room, Guest, Booking } from './mongodb.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "e752751f5b6b5e0cf70d4666e0fcd3d242f6b3bf5b034cdcb87de0852c3a134e";

// --- Admin Profile Function ---
export const getAdminProfile = async (req, res) => {
    try {
        // req.user should be populated by verifyToken middleware
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: 'Unauthorized or email not in token.' });
        }
        const adminEmail = req.user.email;

        const adminData = await Admin.findOne({ email: adminEmail }, 'firstName lastName email number');

        if (!adminData) {
            return res.status(404).json({ message: 'Admin profile not found.' });
        }
        return res.status(200).json(adminData);
    } catch (err) {
        console.log('Server error in getAdminProfile:', err);
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or Expired Token', details: err.message });
        }
        return res.status(500).json({ message: 'Internal server error getting admin profile', details: err.message });
    }
};

// --- Dashboard Overview Data ---
export const getDashboardOverview = async (req, res) => {
    try {
        // 1. Total guest count
        const totalGuests = await Guest.countDocuments();

        // 2. Total rooms and available rooms count
        const allRooms = await Room.find();
        const availableRoomsCount = allRooms.filter(room => room.current_status === 'available').length;

        // 3. Today's check-ins and check-outs
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayBookings = await Booking.find({
            checkInDate: { $gte: today, $lt: tomorrow }
        });
        const todayCheckIns = todayBookings.length;

        const todayCheckOuts = await Booking.find({
            checkOutDate: { $gte: today, $lt: tomorrow }
        });
        const todayCheckOutsCount = todayCheckOuts.length;

        // 4. Recent reservations (last 5)
        const recentReservations = await Booking.find()
            .sort({ checkInDate: -1 })
            .limit(5);

        return res.status(200).json({
            totalGuests: totalGuests || 0,
            totalRooms: allRooms.length || 0,
            availableRooms: availableRoomsCount,
            todaysCheckin: todayCheckIns,
            todaysCheckout: todayCheckOutsCount,
            recentReservations: recentReservations || []
        });

    } catch (err) {
        console.log('Server error in getDashboardOverview:', err);
        return res.status(500).json({
            message: 'Internal server error getting dashboard overview',
            details: err.message
        });
    }
};

// --- Staff Management ---
export const getAllStaff = async (req, res) => {
    try {
        const staff = await Admin.find({}, 'firstName lastName email number');

        return res.status(200).json(staff || []);
    } catch (err) {
        console.log('Server error in getAllStaff:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

// --- Room Management Functions ---
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ room_number: 1 });

        return res.status(200).json(rooms);
    } catch (err) {
        console.log('Server error in getAllRooms:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

export const getRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.status(200).json(room);
    } catch (err) {
        console.log('Server error in getRoom:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

export const addRoom = async (req, res) => {
    try {
        const roomData = req.body;
        const newRoom = new Room(roomData);
        await newRoom.save();

        return res.status(200).json(newRoom);
    } catch (err) {
        console.log('Server error in addRoom:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const updates = req.body;

        if (!roomId) {
            return res.status(400).json({ message: 'Room ID is required.' });
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No update data provided.' });
        }

        const updatedRoom = await Room.findByIdAndUpdate(roomId, updates, { new: true });

        if (!updatedRoom) {
            return res.status(404).json({ message: `Room with ID ${roomId} not found.` });
        }
        return res.status(200).json(updatedRoom);
    } catch (err) {
        console.log('Server error in updateRoom:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        if (!roomId) {
            return res.status(400).json({ message: 'Room ID is required.' });
        }

        // Check for active bookings for this room
        const activeBookings = await Booking.countDocuments({
            room_id: roomId,
            status: { $in: ['Confirmed', 'CheckedIn'] }
        });

        if (activeBookings > 0) {
            return res.status(400).json({ message: 'Cannot delete room with active bookings.' });
        }

        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            return res.status(404).json({ message: `Room with ID ${roomId} not found.` });
        }

        return res.status(200).json({ message: `Room ${roomId} deleted successfully.` });
    } catch (err) {
        console.log('Server error in deleteRoom:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

export const getGuests = async (req, res) => {
    try {
        const guests = await Guest.find();

        return res.status(200).json(guests);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to fetch Guest data" });
    }
}

export const addGuest = async (req, res) => {
    try {
        const guestData = req.body;
        const newGuest = new Guest(guestData);
        await newGuest.save();

        return res.status(200).json({ message: "Guest added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to add Guest data" });
    }
}

export const updateGuest = async (req, res) => {
    try {
        const { guestId } = req.params;
        const updates = req.body;

        if (!guestId) {
            return res.status(400).json({ message: 'Guest ID is required.' });
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No update data provided.' });
        }

        const updatedGuest = await Guest.findByIdAndUpdate(guestId, updates, { new: true });

        if (!updatedGuest) {
            return res.status(404).json({ message: `Guest with ID ${guestId} not found.` });
        }
        return res.status(200).json(updatedGuest);
    } catch (err) {
        console.log('Server error in updateGuest:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

export const getReservations = async (req, res) => {
    try {
        const reservations = await Booking.find();

        return res.status(200).json(reservations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to fetch Booking data" });
    }
}

export const updateReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const updates = req.body;

        if (!reservationId) {
            return res.status(400).json({ message: 'Reservation ID is required.' });
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No update data provided.' });
        }

        const updatedReservation = await Booking.findByIdAndUpdate(reservationId, updates, { new: true });

        if (!updatedReservation) {
            return res.status(404).json({ message: `Reservation with ID ${reservationId} not found.` });
        }
        return res.status(200).json(updatedReservation);
    } catch (err) {
        console.log('Server error in updateReservation:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

export const getReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await Booking.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        return res.status(200).json(reservation);
    } catch (err) {
        console.log('Server error in getReservation:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};
