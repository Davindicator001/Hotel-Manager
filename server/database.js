import { User, Admin, Room, Booking, Guest } from './mongodb.js';

export async function insertUserData(formData) {
  try {
    const user = new User(formData);
    await user.save();
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function insertAdminData(formData) {
  try {
    const admin = new Admin(formData);
    await admin.save();
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function insertRoomData(roomData) {
  try {
    const room = new Room({
      room_number: roomData.room_number,
      type: roomData.type,
      price: roomData.price,
      status: roomData.status,
      capacity: roomData.capacity,
      description: roomData.description,
      amenity: roomData.amenity,
      room_type: roomData.room_type,
      capacity_adults: roomData.capacity_adults,
      capacity_children: roomData.capacity_children,
      total_quantity: roomData.total_quantity,
      price_per_night: roomData.price_per_night,
      amenities: roomData.amenities,
      images: roomData.images,
      bed_type: roomData.bed_type,
      size_sqm: roomData.size_sqm,
      current_status: roomData.current_status || 'Available'
    });

    await room.save();
    return room;
  } catch (error) {
    console.error('Error inserting room:', error);
    throw error;
  }
}
