import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Encode the password in the MongoDB URI
const encodeMongoUri = (uri) => {
  const passwordStart = uri.indexOf('://') + 3;
  const passwordEnd = uri.indexOf('@');
  if (passwordStart > 2 && passwordEnd > passwordStart) {
    const password = uri.substring(passwordStart, passwordEnd);
    const encodedPassword = encodeURIComponent(password);
    return uri.substring(0, passwordStart) + encodedPassword + uri.substring(passwordEnd);
  }
  return uri;
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

export { connectDB };


// Define schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  _id: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  address_street: { type: String },
  address_city: { type: String },
  address_state: { type: String },
  address_country: { type: String },
  loyalty_points: { type: Number, default: 0 },
  member_status: { type: String, default: 'Bronze' },
  bookings: { type: Array, default: [] }

});

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true }
});

const roomSchema = new mongoose.Schema({
  room_number: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true, default: 'available' },
  capacity: { type: Number, required: true },
  description: { type: String },
  amenity: { type: Array, default: [] },
  room_type: { type: String },
  capacity_adults: { type: Number },
  capacity_children: { type: Number },
  total_quantity: { type: Number },
  price_per_night: { type: Number },
  amenities: { type: Array, default: [] },
  images: { type: Array, default: [] },
  bed_type: { type: String, default: "Standard 2" },
  size_sqm: { type: String, default: "30" },
  current_status: { type: String, default: 'Available' }
});

const bookingSchema = new mongoose.Schema({
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  roomType: { type: String, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, default: 0 },
  status: { type: String, default: 'Pending' },
  payment_status: { type: String, default: 'Pending' },
  user_email: { type: String, required: true }
});

const guestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String }
  },
  checkInDate: { type: Date },
  checkOutDate: { type: Date },
  roomType: { type: String }
});

// Create models
export const User = mongoose.model('User', userSchema);
export const Admin = mongoose.model('Admin', adminSchema);
export const Room = mongoose.model('Room', roomSchema);
export const Booking = mongoose.model('Booking', bookingSchema);
export const Guest = mongoose.model('Guest', guestSchema);
