# Hotel Manager Backend with MongoDB

This is a backend application for a hotel management system that uses MongoDB as the database.

## Prerequisites

1. Node.js (v16 or higher)
2. MongoDB (local or cloud instance)

## Setup Instructions

1. **Install Dependencies**:
   Open a command prompt in this directory and run:
   ```
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/hotel_manager
   JWT_SECRET=your_jwt_secret_here
   PORT=9000
   ```

3. **Start MongoDB**:
   Make sure MongoDB is running on your system or update the `MONGODB_URI` in the `.env` file to point to your MongoDB instance.

4. **Run the Application**:
   ```
   node server.js
   ```

## API Endpoints

- **Authentication**:
  - POST `/api/register/user` - Register a new user
    - Required fields: email, number, firstName, lastName, password
    - Password requirements: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  - POST `/api/register/admin` - Register a new admin
    - Required fields: email, number, firstName, lastName, password, adminCode
    - Admin code: HOTELADMIN2025 (can be changed in the code)
    - Password requirements: Same as user registration
  - POST `/api/login/guest` - User login
  - POST `/api/login/admin` - Admin login

- **User Data**:
  - GET `/api/userdata` - Get user data (requires authentication)

- **Rooms**:
  - POST `/api/rooms/check-availability` - Check room availability
  - POST `/api/book` - Create a booking

- **Admin**:
  - GET `/api/admin/profile` - Get admin profile
  - GET `/api/admin/dashboard-overview` - Get dashboard overview
  - GET `/api/admin/rooms` - Get all rooms
  - GET `/api/admin/rooms/:roomId` - Get a specific room
  - POST `/api/admin/rooms` - Add a new room
  - POST `/api/admin/rooms/:roomId/update` - Update a room
  - DELETE `/api/admin/rooms/:roomId` - Delete a room
  - GET `/api/admin/staff` - Get all staff
  - GET `/api/admin/guests` - Get all guests
  - POST `/api/admin/guests` - Add a new guest
  - POST `/api/admin/guests/:guestId/update` - Update a guest
  - GET `/api/admin/reservations` - Get all reservations
  - POST `/api/admin/reservations/:reservationId/update` - Update a reservation
  - GET `/api/admin/reservations/:reservationId` - Get a specific reservation

## Troubleshooting

If you encounter issues with running npm commands, you may need to adjust your PowerShell execution policy. Run this command in an elevated PowerShell session:

```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try running `npm install` again.
