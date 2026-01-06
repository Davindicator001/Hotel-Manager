import jwt from 'jsonwebtoken';
import {supabase} from './server.js';
import { v4 as uuidv4 } from 'uuid';
const JWT_SECRET = process.env.JWT_SECRET || "e752751f5b6b5e0cf70d4666e0fcd3d242f6b3bf5b034cdcb87de0852c3a134e";

export const fetchUserData = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userEmail = decoded.email;

    if (!userEmail) {
        return res.status(400).json({ message: 'Email not found in token' });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('firstName, lastName, email, number, address_street, address_city, address_state, address_country, loyalty_points, member_status, bookings')
      .eq('email', userEmail)
      .single();
    const {data: bookingData, error: bookingError } = await supabase
    .from('bookings')
    .select("*")
    .eq('user_email', userEmail)

    if (userError) {
      console.error('Error fetching user data from Supabase:', userError);
      return res.status(500).json({ message: 'Error fetching user data', details: userError.message });
    }

    if (!userData) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    const responseData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.number,
      address: {
          street: userData.address_street,
          city: userData.address_city,
          state: userData.address_state,
          country: userData.address_country,
      },
      loyalty: {
        points: userData.loyalty_points,
        status: userData.member_status || 'Member'
      },
      bookings: bookingData,
      specialOffers: [ 
        // Example: { id: 'offer1', title: 'Weekend Getaway', description: '20% off on suites' } 
      ] 
    };

    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Token verification or other error in fetchUserData:', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Invalid or Expired Token', details: error.message });
    }
    return res.status(500).json({ message: 'Internal server error', details: error.message });
  }
};
export async function createBooking(req, res) {
    const { checkInDate, checkOutDate, roomType, adults, children } = req.body;

    // 1. Validate input
    if (!checkInDate || !checkOutDate || !roomType || adults === undefined) {
        return res.status(400).json({ success: false, message: 'Missing required data.' });
    }

    try {
        // 2. Get current user via JWT
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json({ success: false, message: 'Access denied.' });

        const decoded = jwt.verify(token, JWT_SECRET);
        const userEmail = decoded.email;
        const {data:userData} = await supabase.from("users").select("*").eq("email",userEmail).single()
        const newBooking = {
            checkInDate,
            checkOutDate,
            firstName: userData.firstName,
            lastName: userData.lastName,
            roomType: roomType.toLowerCase(),
            adults: parseInt(adults, 10),
            children: parseInt(children, 10),
            status: 'Pending',
            payment_status: 'Pending',
            user_email: userEmail
        };

        const { data, error } = await supabase.from('bookings').insert([newBooking]);
        if (error) throw error;
        if (error) return res.status(500).json({ success: false, message: 'Database error.' });

        return res.status(201).json({ success: true, booking: newBooking });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ success: false, message: 'Booking failed.' });
    }
}
// --- Function to Check Room Availability ---
export async function checkRoomAvailability(req, res) {
    try {
        const { checkInDate, checkOutDate, roomType, adults, children } = req.body;
        // 1. Validate input parameters
        if (!checkInDate || !checkOutDate || !roomType || adults === undefined) {
            return res.status(400).json({ message: "Missing required fields: checkInDate, checkOutDate, roomType, adults." });
        }

        const parsedCheckInDate = new Date(checkInDate);
        const parsedCheckOutDate = new Date(checkOutDate);

        if (parsedCheckOutDate <= parsedCheckInDate) {
            return res.status(400).json({ message: "Check-out date must be after check-in date." });
        }

        // 2. Fetch details of the requested room type from 'hotel_rooms' table
        const { data: roomDetails, error: roomError } = await supabase
            .from('hotel_rooms')
            .select('*')
            .eq('room_type', roomType)

        if (roomError) {
            console.error("Error fetching room details:", roomError);
            return res.status(500).json({ message: "Error fetching room details.", details: roomError.message });
        }

        if (!roomDetails) {
            return res.status(404).json({ message: `Room type '${roomType}' not found.` });
        }

        // 3. Check capacity
        const numAdults = parseInt(adults, 10);
        const numChildren = parseInt(children, 10) || 0;

        if (numAdults > roomDetails.capacity_adults || (numAdults + numChildren) > (roomDetails.capacity_adults + roomDetails.capacity_children)) {
            return res.status(400).json({
                available: false,
                message: `The selected room type '${roomType.toLowerCase()}' does not have enough capacity for ${numAdults} adults and ${numChildren} children.`,
                reason: "capacity_exceeded"
            });
        }
        let availableQuantity = 0;
        roomDetails.forEach(room => {
            if(room.current_status.toLowerCase() == 'available'){
                console.log(room.current_status)
                availableQuantity++;
            }
        })
        if (availableQuantity > 0) {
            return res.status(200).json({
                available: true,
                message: `Rooms of type '${roomType.toLowerCase()}' are available.`,
                availableCount: availableQuantity,
                price_per_night: roomDetails.price_per_night,
                amenities: roomDetails.amenities
            });
        } else {
            return res.status(200).json({
                available: false,
                message: `Sorry, room type '${roomType.toLowerCase()}' is fully booked for the selected dates.`,
                reason: "fully_booked"
            });
        }

    } catch (error) {
        console.error("Error in checkRoomAvailability:", error);
        return res.status(500).json({ message: "Internal server error while checking availability.", details: error.message });
    }
}
