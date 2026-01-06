import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [adminName, setAdminName] = useState('Admin User');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = localStorage.getItem('authToken');
      /* if (!token) {
        navigate('/login');
        return;
      } */

      try {
        const response = await axios.get('https://evergreen-backend-80rh.onrender.com/api/admin/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data && response.data.firstName) {
          setAdminName(response.data.firstName);
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 7000);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-64 bg-[#0F2A44] text-white p-6 fixed h-full">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold">Evergreen Grand Hotel</h2>
            <p className="text-sm opacity-80">Admin Dashboard</p>
          </div>
          <div className="space-y-2">
            <ul className="space-y-1">
              <li><a href="#dashboard" onClick={() => setActiveSection('dashboard')} className={`block px-4 py-2 rounded ${activeSection === 'dashboard' ? 'bg-white text-[#0F2A44]' : 'hover:bg-white/10'}`}><i className="fas fa-tachometer-alt mr-2"></i> Dashboard</a></li>
              <li><a href="#guest-management" onClick={() => setActiveSection('guest-management')} className={`block px-4 py-2 rounded ${activeSection === 'guest-management' ? 'bg-white text-[#0F2A44]' : 'hover:bg-white/10'}`}><i className="fas fa-users mr-2"></i> Guest Management</a></li>
              <li><a href="#room-management" onClick={() => setActiveSection('room-management')} className={`block px-4 py-2 rounded ${activeSection === 'room-management' ? 'bg-white text-[#0F2A44]' : 'hover:bg-white/10'}`}><i className="fas fa-bed mr-2"></i> Room Management</a></li>
              <li><a href="#reservations" onClick={() => setActiveSection('reservations')} className={`block px-4 py-2 rounded ${activeSection === 'reservations' ? 'bg-white text-[#0F2A44]' : 'hover:bg-white/10'}`}><i className="fas fa-calendar-check mr-2"></i> Reservations</a></li>
              <li><a href="#payments" onClick={() => setActiveSection('payments')} className={`block px-4 py-2 rounded ${activeSection === 'payments' ? 'bg-white text-[#0F2A44]' : 'hover:bg-white/10'}`}><i className="fas fa-credit-card mr-2"></i> Payments & Invoices</a></li>
              <li><a href="#feedback" onClick={() => setActiveSection('feedback')} className={`block px-4 py-2 rounded ${activeSection === 'feedback' ? 'bg-white text-[#0F2A44]' : 'hover:bg-white/10'}`}><i className="fas fa-comment mr-2"></i> Feedback & Reviews</a></li>
              <li><a href="#staff" onClick={() => setActiveSection('staff')} className={`block px-4 py-2 rounded ${activeSection === 'staff' ? 'bg-white text-[#0F2A44]' : 'hover:bg-white/10'}`}><i className="fas fa-user-tie mr-2"></i> Staff Management</a></li>
              <li><a href="#content" onClick={() => setActiveSection('content')} className={`block px-4 py-2 rounded ${activeSection === 'content' ? 'bg-white text-[#0F2A44]' : 'hover:bg-white/10'}`}><i className="fas fa-images mr-2"></i> Content Updates</a></li>
              <li><a href="#settings" onClick={() => setActiveSection('settings')} className={`block px-4 py-2 rounded ${activeSection === 'settings' ? 'bg-white text-[#0F2A44]' : 'hover:bg-white/10'}`}><i className="fas fa-cog mr-2"></i> Settings</a></li>
            </ul>
          </div>
        </div>

        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <button className="text-[#0F2A44] text-xl"><i className="fas fa-bars"></i></button>
            <h1 className="text-2xl font-bold text-[#0F2A44]">Admin Dashboard</h1>
            <div className="relative">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => document.querySelector('.dropdown-content').classList.toggle('hidden')}>
                <img src="https://source.unsplash.com/random/40x40/?person" alt="Admin User" className="w-10 h-10 rounded-full" />
                <span className="text-dark">{adminName} <i className="fas fa-chevron-down ml-1"></i></span>
              </div>
              <div className="dropdown-content absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 hidden">
                <a href="#" className="block px-4 py-2 text-dark hover:bg-light"><i className="fas fa-user mr-2"></i> Profile</a>
                <a href="#" className="block px-4 py-2 text-dark hover:bg-light"><i className="fas fa-cog mr-2"></i> Settings</a>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-dark hover:bg-light"><i className="fas fa-sign-out-alt mr-2"></i> Logout</button>
              </div>
            </div>
          </div>

          {notification.show && (
            <div className={`mb-4 p-3 rounded ${notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {notification.message}
            </div>
          )}

          {activeSection === 'dashboard' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44]">Dashboard Overview</h2>
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition"><i className="fas fa-sync-alt mr-2"></i> Refresh</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-[#C9A24D] text-2xl mb-4"><i className="fas fa-users"></i></div>
                  <h3 className="text-lg font-medium mb-2">Total Guests</h3>
                  <p className="text-2xl font-bold text-[#0F2A44]">50</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-[#C9A24D] text-2xl mb-4"><i className="fas fa-bed"></i></div>
                  <h3 className="text-lg font-medium mb-2">Available Rooms</h3>
                  <p className="text-2xl font-bold text-[#0F2A44]">12</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-[#C9A24D] text-2xl mb-4"><i className="fas fa-calendar-check"></i></div>
                  <h3 className="text-lg font-medium mb-2">Today's Check-ins</h3>
                  <p className="text-2xl font-bold text-[#0F2A44]">7</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-[#C9A24D] text-2xl mb-4"><i className="fas fa-calendar-minus"></i></div>
                  <h3 className="text-lg font-medium mb-2">Today's Check-outs</h3>
                  <p className="text-2xl font-bold text-[#0F2A44]">3</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44] mb-4">Recent Reservations</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow">
                    <thead>
                      <tr className="bg-light">
                        <th className="py-3 px-4 text-left">Booking ID</th>
                        <th className="py-3 px-4 text-left">Guest Name</th>
                        <th className="py-3 px-4 text-left">Room</th>
                        <th className="py-3 px-4 text-left">Check-in</th>
                        <th className="py-3 px-4 text-left">Check-out</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4">BK-2023-004</td>
                        <td className="py-3 px-4">John Smith</td>
                        <td className="py-3 px-4">Deluxe Suite 302</td>
                        <td className="py-3 px-4">May 15, 2023</td>
                        <td className="py-3 px-4">May 20, 2023</td>
                        <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Confirmed</span></td>
                        <td className="py-3 px-4">
                          <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                          <button className="text-[#0F2A44] mr-2"><i className="fas fa-edit"></i></button>
                          <button className="text-red-500"><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4">BK-2023-005</td>
                        <td className="py-3 px-4">Emma Johnson</td>
                        <td className="py-3 px-4">Executive Room 206</td>
                        <td className="py-3 px-4">May 18, 2023</td>
                        <td className="py-3 px-4">May 22, 2023</td>
                        <td className="py-3 px-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span></td>
                        <td className="py-3 px-4">
                          <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                          <button className="text-[#0F2A44] mr-2"><i className="fas fa-edit"></i></button>
                          <button className="text-red-500"><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0F2A44] mb-4">Revenue Overview</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-center py-12">Revenue Chart Placeholder</p>
                  <p className="text-center">This would be a chart showing revenue data</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'guest-management' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44]">Guest Management</h2>
                <button onClick={() => setShowGuestModal(true)} className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition"><i className="fas fa-plus mr-2"></i> Add New Guest</button>
              </div>

              <div className="mb-6">
                <div className="flex">
                  <input type="text" placeholder="Search guests..." className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                  <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-r hover:bg-[#C9A24D] transition"><i className="fas fa-search"></i></button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead>
                    <tr className="bg-light">
                      <th className="py-3 px-4 text-left">Guest ID</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Phone</th>
                      <th className="py-3 px-4 text-left">Last Stay</th>
                      <th className="py-3 px-4 text-left">Total Stays</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">G-001</td>
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4">john.doe@example.com</td>
                      <td className="py-3 px-4">+1 234 567 8901</td>
                      <td className="py-3 px-4">May 15, 2023</td>
                      <td className="py-3 px-4">3</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-edit"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition">1</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition">2</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition">3</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition">4</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition">5</button>
              </div>
            </div>
          )}

          {activeSection === 'room-management' && (
            <div>
              {showRoomModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
                    <button onClick={() => setShowRoomModal(false)} className="absolute top-4 right-4 text-dark text-xl">&times;</button>
                    <h2 className="text-2xl font-bold text-[#0F2A44] mb-6">Add New Room</h2>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="roomNumber" className="block text-sm font-medium text-dark mb-1">Room Number:</label>
                        <input type="text" id="roomNumber" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                      </div>
                      <div>
                        <label htmlFor="roomType" className="block text-sm font-medium text-dark mb-1">Room Type:</label>
                        <select id="roomType" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]">
                          <option value="Single">Single</option>
                          <option value="Double">Double</option>
                          <option value="Suite">Suite</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-dark mb-1">Price per Night (N):</label>
                        <input type="number" id="price" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                      </div>
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-dark mb-1">Status:</label>
                        <select id="status" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]">
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="adults" className="block text-sm font-medium text-dark mb-1">Adults:</label>
                        <input type="number" id="adults" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-dark mb-1">Description:</label>
                        <textarea id="description" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]"></textarea>
                      </div>
                      <div>
                        <label htmlFor="amenities" className="block text-sm font-medium text-dark mb-1">Amenities (comma separated):</label>
                        <input type="text" id="amenities" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                      </div>
                      <button type="submit" className="w-full py-2 px-4 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition">Add Room</button>
                    </form>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44]">Room Management</h2>
                <button onClick={() => setShowRoomModal(true)} className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition"><i className="fas fa-plus mr-2"></i> Add New Room</button>
              </div>

              <div className="flex mb-6">
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-l hover:bg-[#C9A24D] transition">All Rooms</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded-r transition">Available</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Occupied</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Maintenance</button>
              </div>

              <div className="mb-6">
                <div className="flex">
                  <input type="text" placeholder="Search rooms..." className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                  <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-r hover:bg-[#C9A24D] transition"><i className="fas fa-search"></i></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-[#0F2A44] mb-2">Deluxe Room 101</h3>
                  <p className="text-dark mb-2">Single</p>
                  <p className="text-dark mb-2">$100/night</p>
                  <p className="text-dark mb-2">Available</p>
                  <p className="text-dark mb-4">2 Adults</p>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition">Edit</button>
                    <button className="px-4 py-2 border border-[#0F2A44] text-[#0F2A44] rounded hover:bg-[#0F2A44] hover:text-white transition">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'reservations' && (
            <div>
              {showReservationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
                    <button onClick={() => setShowReservationModal(false)} className="absolute top-4 right-4 text-dark text-xl">&times;</button>
                    <h2 className="text-2xl font-bold text-[#0F2A44] mb-6">Add New Reservation</h2>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="reservation-room-number" className="block text-sm font-medium text-dark mb-1">Room Number</label>
                        <input type="number" id="reservation-room-number" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                      </div>
                      <div>
                        <label htmlFor="reservation-checkin" className="block text-sm font-medium text-dark mb-1">Check In</label>
                        <input type="date" id="reservation-checkin" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                      </div>
                      <div>
                        <label htmlFor="reservation-checkout" className="block text-sm font-medium text-dark mb-1">Check Out</label>
                        <input type="date" id="reservation-checkout" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                      </div>
                      <div>
                        <label htmlFor="reservation-room-type" className="block text-sm font-medium text-dark mb-1">Room Type</label>
                        <select id="reservation-room-type" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]">
                          <option value="Single">Single</option>
                          <option value="Double">Double</option>
                          <option value="Suite">Suite</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="reservation-status" className="block text-sm font-medium text-dark mb-1">Status</label>
                        <select id="reservation-status" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]">
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="reservation-payment-status" className="block text-sm font-medium text-dark mb-1">Payment Status</label>
                        <select id="reservation-payment-status" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]">
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button type="button" onClick={() => setShowReservationModal(false)} className="px-4 py-2 border border-[#0F2A44] text-[#0F2A44] rounded hover:bg-[#0F2A44] hover:text-white transition">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition">Save</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44]">Reservations</h2>
                <button onClick={() => setShowReservationModal(true)} className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition"><i className="fas fa-plus mr-2"></i> New Reservation</button>
              </div>

              <div className="flex mb-6">
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-l hover:bg-[#C9A24D] transition">Upcoming</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded-r transition">Current</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Past</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Cancelled</button>
              </div>

              <div className="mb-6">
                <div className="flex">
                  <input type="text" placeholder="Search reservations..." className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                  <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-r hover:bg-[#C9A24D] transition"><i className="fas fa-search"></i></button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead>
                    <tr className="bg-light">
                      <th className="py-3 px-4 text-left">Booking ID</th>
                      <th className="py-3 px-4 text-left">Guest Name</th>
                      <th className="py-3 px-4 text-left">Room</th>
                      <th className="py-3 px-4 text-left">Room Type</th>
                      <th className="py-3 px-4 text-left">Check-in</th>
                      <th className="py-3 px-4 text-left">Check-out</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Payment</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">BK-2023-004</td>
                      <td className="py-3 px-4">John Smith</td>
                      <td className="py-3 px-4">Deluxe Suite 302</td>
                      <td className="py-3 px-4">Deluxe</td>
                      <td className="py-3 px-4">May 15, 2023</td>
                      <td className="py-3 px-4">May 20, 2023</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Confirmed</span></td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Paid</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-edit"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">BK-2023-005</td>
                      <td className="py-3 px-4">Emma Johnson</td>
                      <td className="py-3 px-4">Executive Room 206</td>
                      <td className="py-3 px-4">Executive</td>
                      <td className="py-3 px-4">May 18, 2023</td>
                      <td className="py-3 px-4">May 22, 2023</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span></td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-edit"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'payments' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44]">Payments & Invoices</h2>
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition"><i className="fas fa-plus mr-2"></i> Create Invoice</button>
              </div>

              <div className="flex mb-6">
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-l hover:bg-[#C9A24D] transition">All Payments</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded-r transition">Pending</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Completed</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Refunded</button>
              </div>

              <div className="mb-6">
                <div className="flex">
                  <input type="text" placeholder="Search payments..." className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                  <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-r hover:bg-[#C9A24D] transition"><i className="fas fa-search"></i></button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead>
                    <tr className="bg-light">
                      <th className="py-3 px-4 text-left">Invoice #</th>
                      <th className="py-3 px-4 text-left">Booking ID</th>
                      <th className="py-3 px-4 text-left">Guest</th>
                      <th className="py-3 px-4 text-left">Amount</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Method</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">INV-2023-001</td>
                      <td className="py-3 px-4">BK-2023-001</td>
                      <td className="py-3 px-4">Daniel Ogba</td>
                      <td className="py-3 px-4">$750.00</td>
                      <td className="py-3 px-4">May 3, 2023</td>
                      <td className="py-3 px-4">Credit Card</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Paid</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-print"></i></button>
                        <button className="text-[#0F2A44]"><i className="fas fa-envelope"></i></button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">INV-2023-002</td>
                      <td className="py-3 px-4">BK-2023-002</td>
                      <td className="py-3 px-4">Chinedu Johnson</td>
                      <td className="py-3 px-4">$900.00</td>
                      <td className="py-3 px-4">May 5, 2023</td>
                      <td className="py-3 px-4">Bank Transfer</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-print"></i></button>
                        <button className="text-[#0F2A44]"><i className="fas fa-envelope"></i></button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">INV-2023-003</td>
                      <td className="py-3 px-4">BK-2023-003</td>
                      <td className="py-3 px-4">Michael Deborah</td>
                      <td className="py-3 px-4">$240.00</td>
                      <td className="py-3 px-4">May 2, 2023</td>
                      <td className="py-3 px-4">PayPal</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Refunded</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-print"></i></button>
                        <button className="text-[#0F2A44]"><i className="fas fa-envelope"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'feedback' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44]">Feedback & Reviews</h2>
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition"><i className="fas fa-paper-plane mr-2"></i> Request Feedback</button>
              </div>

              <div className="flex mb-6">
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-l hover:bg-[#C9A24D] transition">All Reviews</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded-r transition">New</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Published</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Hidden</button>
              </div>

              <div className="mb-6">
                <div className="flex">
                  <input type="text" placeholder="Search reviews..." className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                  <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-r hover:bg-[#C9A24D] transition"><i className="fas fa-search"></i></button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead>
                    <tr className="bg-light">
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Guest</th>
                      <th className="py-3 px-4 text-left">Rating</th>
                      <th className="py-3 px-4 text-left">Review</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">REV-001</td>
                      <td className="py-3 px-4">Daniel Ogba</td>
                      <td className="py-3 px-4">
                        <div className="flex text-yellow-400">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </td>
                      <td className="py-3 px-4">Excellent service and beautiful rooms. Will definitely come back!</td>
                      <td className="py-3 px-4">May 9, 2023</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Published</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-reply"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">REV-002</td>
                      <td className="py-3 px-4">Sarah Johnson</td>
                      <td className="py-3 px-4">
                        <div className="flex text-yellow-400">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                        </div>
                      </td>
                      <td className="py-3 px-4">Great stay overall. The staff was very friendly and helpful.</td>
                      <td className="py-3 px-4">May 11, 2023</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">New</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-reply"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">REV-003</td>
                      <td className="py-3 px-4">Michael Deborah</td>
                      <td className="py-3 px-4">
                        <div className="flex text-yellow-400">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                        </div>
                      </td>
                      <td className="py-3 px-4">Room service was slow and the air conditioning wasn't working properly.</td>
                      <td className="py-3 px-4">May 7, 2023</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Hidden</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-reply"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'staff' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44]">Staff Management</h2>
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition"><i className="fas fa-plus mr-2"></i> Add Staff Member</button>
              </div>

              <div className="flex mb-6">
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-l hover:bg-[#C9A24D] transition">All Staff</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded-r transition">Management</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Front Desk</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Housekeeping</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Maintenance</button>
              </div>

              <div className="mb-6">
                <div className="flex">
                  <input type="text" placeholder="Search staff..." className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                  <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-r hover:bg-[#C9A24D] transition"><i className="fas fa-search"></i></button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead>
                    <tr className="bg-light">
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Position</th>
                      <th className="py-3 px-4 text-left">Department</th>
                      <th className="py-3 px-4 text-left">Contact</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">EMP-001</td>
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4">General Manager</td>
                      <td className="py-3 px-4">Management</td>
                      <td className="py-3 px-4">john.doe@example.com</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-edit"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">EMP-002</td>
                      <td className="py-3 px-4">Jane Smith</td>
                      <td className="py-3 px-4">Front Desk Manager</td>
                      <td className="py-3 px-4">Front Desk</td>
                      <td className="py-3 px-4">jane.smith@example.com</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-edit"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">EMP-003</td>
                      <td className="py-3 px-4">Robert Johnson</td>
                      <td className="py-3 px-4">Housekeeping Supervisor</td>
                      <td className="py-3 px-4">Housekeeping</td>
                      <td className="py-3 px-4">robert.j@example.com</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-edit"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">EMP-004</td>
                      <td className="py-3 px-4">Michael Brown</td>
                      <td className="py-3 px-4">Maintenance Technician</td>
                      <td className="py-3 px-4">Maintenance</td>
                      <td className="py-3 px-4">michael.b@example.com</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">On Leave</span></td>
                      <td className="py-3 px-4">
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-[#0F2A44] mr-2"><i className="fas fa-edit"></i></button>
                        <button className="text-red-500"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'content' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44]">Content Updates</h2>
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition"><i className="fas fa-plus mr-2"></i> Add New Content</button>
              </div>

              <div className="flex mb-6">
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-l hover:bg-[#C9A24D] transition">Website</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded-r transition">Promotions</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Gallery</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Social Media</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#0F2A44]">Homepage Banner</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Published</span>
                  </div>
                  <div className="mb-4">
                    <img src="https://source.unsplash.com/random/400x200/?hotel,luxury" alt="Homepage Banner" className="w-full h-40 object-cover rounded mb-2" />
                    <p>Welcome to Evergreen Grand Hotel - Where Luxury Meets Comfort</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-[#0F2A44]"><i className="fas fa-edit"></i></button>
                    <button className="text-[#0F2A44]"><i className="fas fa-eye"></i></button>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#0F2A44]">Special Offers Section</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Published</span>
                  </div>
                  <div className="mb-4">
                    <img src="https://source.unsplash.com/random/400x200/?hotel,pool" alt="Special Offers" className="w-full h-40 object-cover rounded mb-2" />
                    <p>Summer Special: Book 3 nights, get 1 night free!</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-[#0F2A44]"><i className="fas fa-edit"></i></button>
                    <button className="text-[#0F2A44]"><i className="fas fa-eye"></i></button>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#0F2A44]">About Us Page</h3>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Draft</span>
                  </div>
                  <div className="mb-4">
                    <img src="https://source.unsplash.com/random/400x200/?hotel,lobby" alt="About Us" className="w-full h-40 object-cover rounded mb-2" />
                    <p>Our story begins in 1985 when the Evergreen Grand Hotel first opened its doors...</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-[#0F2A44]"><i className="fas fa-edit"></i></button>
                    <button className="text-[#0F2A44]"><i className="fas fa-eye"></i></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#0F2A44]">System Settings</h2>
              </div>

              <div className="flex mb-6">
                <button className="px-4 py-2 bg-[#0F2A44] text-white rounded-l hover:bg-[#C9A24D] transition">General</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded-r transition">Booking</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Payment</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Notifications</button>
                <button className="px-4 py-2 text-dark hover:bg-light rounded transition ml-2">Users</button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="hotel-name" className="block text-sm font-medium text-dark mb-1">Hotel Name</label>
                    <input type="text" id="hotel-name" defaultValue="Evergreen Grand Hotel" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                  </div>
                  <div>
                    <label htmlFor="hotel-address" className="block text-sm font-medium text-dark mb-1">Address</label>
                    <textarea id="hotel-address" rows="3" defaultValue={"Beside Unity Supermarket Ilubo RD\nOsogbo, Osun State, Nigeria"} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]"></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="hotel-email" className="block text-sm font-medium text-dark mb-1">Email</label>
                      <input type="email" id="hotel-email" defaultValue="info@evergreengrandhotel.com" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                    </div>
                    <div>
                      <label htmlFor="hotel-phone" className="block text-sm font-medium text-dark mb-1">Phone</label>
                      <input type="tel" id="hotel-phone" defaultValue="+234 903 424 4576" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-dark mb-1">Timezone</label>
                    <select id="timezone" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]">
                      <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                      <option value="UTC">UTC (GMT+0)</option>
                      <option value="America/New_York">America/New_York (GMT-5)</option>
                      <option value="Europe/London">Europe/London (GMT+0)</option>
                      <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date-format" className="block text-sm font-medium text-dark mb-1">Date Format</label>
                    <select id="date-format" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY" selected>DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-dark mb-1">Currency</label>
                    <select id="currency" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F2A44]">
                      <option value="USD" selected>USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="NGN">NGN (₦)</option>
                    </select>
                  </div>
                  <button type="submit" className="px-6 py-2 bg-[#0F2A44] text-white rounded hover:bg-[#C9A24D] transition">Save Changes</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
