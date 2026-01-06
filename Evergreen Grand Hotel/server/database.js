import { supabase } from "./server.js";

export async function insertUserData(formData) {
  try{

    const { data, error } = await supabase
    .from('users')
    .insert([formData]);
    
    if (error) {
      throw error;
    }
    return true;
  }
  catch(error){
    console.log(error);
    return error
  }
}
export async function insertAdminData(formData) {
  try{

    const { data, error } = await supabase
    .from('admins')
    .insert([formData]);
    
    if (error) {
      throw error;
    }
    return true;
  }
  catch(error){
    console.log(error);
    return error
  }
}
export async function insertRoomData(roomData) {
  try {
    const { data, error } = await supabase
      .from('room')
      .insert([{
        room_number: roomData.room_number,
        type: roomData.type,
        price: roomData.price,
        status: roomData.status,
        capacity: roomData.capacity,
        description: roomData.description,
        amenity: roomData.amenity
      }]);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error inserting room:', error);
    throw error;
  }
}
