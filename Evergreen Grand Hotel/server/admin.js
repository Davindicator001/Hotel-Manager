import { supabase } from './server.js';
import jwt from 'jsonwebtoken'; // Needed for decoding token for admin profile

const JWT_SECRET = process.env.JWT_SECRET || "e752751f5b6b5e0cf70d4666e0fcd3d242f6b3bf5b034cdcb87de0852c3a134e";

// --- Admin Profile Function ---
export const getAdminProfile = async (req, res) => {
    try {
        // req.user should be populated by verifyToken middleware
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: 'Unauthorized or email not in token.' });
        }
        const adminEmail = req.user.email;

        const { data: adminData, error } = await supabase
            .from('admins') // Assuming you have an 'admins' table
            .select('firstName, lastName, email, number') // Add other fields if needed
            .eq('email', adminEmail)
            .single();

        if (error) {
            console.log('Error fetching admin profile:', error);
            return res.status(500).json({ message: 'Failed to fetch admin profile', details: error.message });
        }
        if (!adminData) {
            return res.status(404).json({ message: 'Admin profile not found.' });
        }
        return res.status(200).json(adminData);
    } catch (err) {
        console.log('Server error in getAdminProfile:', err);
        // Check if it's a JWT error from a manual verification attempt (if any)
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or Expired Token', details: err.message });
        }
        return res.status(500).json({ message: 'Internal server error getting admin profile', details: err.message });
    }
};

// --- Dashboard Overview Data ---
// In the getDashboardOverview function, replace the current implementation with this:

export const getDashboardOverview = async (req, res) => {
    try {
        // 1. Total guest count
        const { count: totalGuests, error: guestError } = await supabase
            .from('guests')
            .select('id', { count: 'exact', head: true });
        if (guestError) throw guestError;

        // 2. Total rooms and available rooms count
        const { data: allRooms, error: roomError } = await supabase
            .from('hotel_rooms')
            .select('id, current_status');
        if (roomError) throw roomError;

        // Calculate available rooms count
        const availableRoomsCount = allRooms 
            ? allRooms.filter(room => room.current_status === 'available').length
            : 0;

        // 3. Today's check-ins and check-outs
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const { data: todayBookings, error: bookingError } = await supabase
            .from('bookings')
            .select('*')
            .gte('checkInDate', today.toISOString())
            .lt('checkInDate', tomorrow.toISOString());
        if (bookingError) throw bookingError;

        const todayCheckIns = todayBookings ? todayBookings.length : 0;

        const { data: todayCheckOuts, error: checkOutError } = await supabase
            .from('bookings')
            .select('*')
            .gte('checkOutDate', today.toISOString())
            .lt('checkOutDate', tomorrow.toISOString());
        if (checkOutError) throw checkOutError;

        const todayCheckOutsCount = todayCheckOuts ? todayCheckOuts.length : 0;

        // 4. Recent reservations (last 5)
        const { data: recentReservations, error: recentError } = await supabase
            .from('bookings')
            .select('*')
            .order('checkInDate', { ascending: false })
            .limit(5);
        if (recentError) throw recentError;

        return res.status(200).json({
            totalGuests: totalGuests || 0,
            totalRooms: allRooms ? allRooms.length : 0,
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
// GET /api/admin/staff - Fetch all admins (as staff for now)
export const getAllStaff = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('admins') // Assuming staff are in 'admins' table
            .select('id, firstName, lastName, email, number, role'); // Add 'role' or other relevant fields

        if (error) {
            console.log('Error fetching staff:', error);
            return res.status(500).json({ message: 'Failed to fetch staff', details: error.message });
        }
        return res.status(200).json(data || []);
    } catch (err) {
        console.log('Server error in getAllStaff:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

// --- Room Management Functions ---

// GET /api/admin/rooms - Fetch all rooms
export const getAllRooms = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('hotel_rooms')
            .select('*') // Select all columns, or specify if needed
            .order('room_number', { ascending: true }); // Example ordering

        if (error) {
            console.log('Error fetching rooms:', error);
            return res.status(500).json({ message: 'Failed to fetch rooms', details: error.message });
        }
        return res.status(200).json(data);
    } catch (err) {
        console.log('Server error in getAllRooms:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};
export const getRoom = async (req, res) => {
    try {
        const { roomId } = req.params
        const { data, error } = await supabase
            .from('hotel_rooms')
            .select('*')
            .eq('id', roomId)
            .single();

        if (error) {
            console.log('Error fetching rooms:', error);
            return res.status(500).json({ message: 'Failed to fetch rooms', details: error.message });
        }
        return res.status(200).json(data);
    } catch (err) {
        console.log('Server error in getAllRooms:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

// POST /api/admin/rooms - Add a new room
export const addRoom = async (req, res) => {
    try {
        // Validate req.body here - ensure all required fields are present
        const { room_type, room_number, description, capacity_adults, capacity_children, total_quantity, price_per_night, amenities, images, bed_type, size_sqm, is_smoking_allowed, is_pet_friendly, current_status } = req.body;
        const newRoomData = {
            room_type,
            room_number,
            description,
            capacity_adults: capacity_adults || 3,
            capacity_children: capacity_children || 3,
            total_quantity,
            price_per_night,
            amenities: amenities || [],
            images: images || [],
            bed_type:bed_type || "Standard 2" ,
            size_sqm: size_sqm || "30",
            current_status: current_status || 'Available' 
        };

        const { data, error } = await supabase
            .from('hotel_rooms')
            .insert([newRoomData])
            .select(); // Return the inserted object(s)

        if (error) {
            console.log('Error adding room:', error);
            return res.status(500).json({ message: 'Failed to add room', details: error.message });
        }
        return res.status(200).json(data[0]); // Return the newly created room
    } catch (err) {
        console.log('Server error in addRoom:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

// PUT /api/admin/rooms/:roomId - Update an existing room
export const updateRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const updates = req.body; // Object with fields to update

        if (!roomId) {
            return res.status(400).json({ message: 'Room ID is required.' });
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No update data provided.' });
        }

        // Prevent updating the ID itself if it's part of the body
        delete updates.id;

        const { data, error } = await supabase
            .from('hotel_rooms')
            .update(updates)
            .eq('id', roomId)
            .select(); // Return the updated object

        if (error) {
            console.log('Error updating room:', error);
            return res.status(500).json({ message: `Failed to update room ${roomId}`, details: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: `Room with ID ${roomId} not found.` });
        }
        return res.status(200).json(data[0]);
    } catch (err) {
        console.log('Server error in updateRoom:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

// DELETE /api/admin/rooms/:roomId - Delete a room
export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        if (!roomId) {
            return res.status(400).json({ message: 'Room ID is required.' });
        }

        // Optional: Check for active bookings for this room before deleting. 
        // This would be complex with your current users.bookings schema.
        // If you had a separate bookings table, you could check:
         const { count, error: bookingCheckError } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('room_id', roomId)
            .in('status', ['Confirmed', 'CheckedIn']); // Active statuses
         if (bookingCheckError) { throw bookingCheckError }
         if (count > 0) { return res.status(400).json({ message: 'Cannot delete room with active bookings.'}); }

        const { error } = await supabase
            .from('hotel_rooms')
            .delete()
            .eq('id', roomId);

        if (error) {
            console.log('Error deleting room:', error);
            return res.status(500).json({ message: `Failed to delete room ${roomId}`, details: error.message });
        }
        
        // Supabase delete doesn't return the deleted object by default. 
        // It returns an error or null if successful (or an empty array for .select() if used before delete).
        // We check if an error occurred. If not, assume success.
        return res.status(200).json({ message: `Room ${roomId} deleted successfully.` }); // Or res.status(204).send(); for no content

    } catch (err) {
        console.log('Server error in deleteRoom:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
}; 

export const getGuests = async (req,res) =>{
    try{
        const {data,error} = await supabase
        .from("guests")
        .select("*");
        if(error) throw error
        return res.status(200).json(data)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: "failed to fetch Guest data"})
    }
        
}
export const addGuest = async (req,res) =>{
    try{
        const guestData = req.body;
        console.log(guestData)
        const {data,error} = await supabase
        .from("guests")
        .insert(guestData)
        if(error) throw error
        return res.status(200).json({message: "Guest added successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: "failed to add Guest data"})
    }
        
}

export const updateGuest = async (req, res) => {
    try {
        const { guestId } = req.params;
        const updates = req.body; // Object with fields to update

        if (!guestId) {
            return res.status(400).json({ message: 'Guest ID is required.' });
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No update data provided.' });
        }

        // Prevent updating the ID itself if it's part of the body
        delete updates.id;

        const { data, error } = await supabase
            .from('guests')
            .update(updates)
            .eq('id', guestId)
            .select(); // Return the updated object

        if (error) {
            console.log('Error updating room:', error);
            return res.status(500).json({ message: `Failed to update guest ${guestId}`, details: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: `Room with ID ${guestId} not found.` });
        }
        return res.status(200).json(data[0]);
    } catch (err) {
        console.log('Server error in updateGuest:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

export const getReservations = async (req,res) =>{
    try{
        const {data,error} = await supabase
        .from("bookings")
        .select("*");
        if(error) throw error
        return res.status(200).json(data)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: "failed to fetch Booking data"})
    }
        
}



export const updateReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const updates = req.body; // Object with fields to update

        if (!reservationId) {
            return res.status(400).json({ message: 'Reservation ID is required.' });
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No update data provided.' });
        }

        // Prevent updating the ID itself if it's part of the body
        delete updates.id;

        const { data, error } = await supabase
            .from('bookings')
            .update(updates)
            .eq('id', reservationId)
            .select(); // Return the updated object

        if (error) {
            console.log('Error updating reservation', error);
            return res.status(500).json({ message: `Failed to update reservation ${reservationId}`, details: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: `Reservationwith ID ${reservationId} not found.` });
        }
        return res.status(200).json(data[0]);
    } catch (err) {
        console.log('Server error in updateReservation:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};

export const getReservation = async (req, res) => {
    try {
        const { reservationId } = req.params
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('id', reservationId)
            .single();

        if (error) {
            console.log('Error fetching reservation', error);
            return res.status(500).json({ message: 'Failed to fetch reservation', details: error.message });
        }
        return res.status(200).json(data);
    } catch (err) {
        console.log('Server error in getReservation:', err);
        return res.status(500).json({ message: 'Internal server error', details: err.message });
    }
};