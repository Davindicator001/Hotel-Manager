import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('https://evergreen-backend-80rh.onrender.com/api/userdata', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setNotification({ show: true, message: 'Booking Confirmed!' });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    setShowBookingModal(false);
  };

  if (!userData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="bg-primary text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <a href="tel:+23409034244576" className="flex items-center text-sm">
                  <i className="fas fa-phone mr-2"></i> (+234) 0903 424 4576
                </a>
                <a href="mailto:evergreengrandhotel@gmail.com" className="flex items-center text-sm">
                  <i className="fas fa-envelope mr-2"></i> evergreengrandhotel@gmail.com
                </a>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white"><i className="fab fa-tripadvisor"></i></a>
              </div>
            </div>
          </div>
        </div>
        <nav className="bg-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-primary">
                <a href="/">
                  <span>Evergreen Grand Hotel</span>
                </a>
              </div>
              <div className="md:hidden">
                <i className="fas fa-bars"></i>
              </div>
              <div className="relative">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => document.querySelector('.user-dropdown').classList.toggle('hidden')}>
                  <img src="/placeholder.svg?height=40&width=40" alt="User Profile" className="w-10 h-10 rounded-full" />
                  <span className="text-dark">{userData.firstName} <i className="fas fa-chevron-down ml-1"></i></span>
                </div>
                <div className="user-dropdown absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 hidden">
                  <a href="/dashboard" className="block px-4 py-2 text-dark hover:bg-light"><i className="fas fa-tachometer-alt mr-2"></i> Dashboard</a>
                  <a href="/profile" className="block px-4 py-2 text-dark hover:bg-light"><i className="fas fa-user-edit mr-2"></i> Edit Profile</a>
                  <a href="/booking-history" className="block px-4 py-2 text-dark hover:bg-light"><i className="fas fa-history mr-2"></i> Booking History</a>
                  <a href="/settings" className="block px-4 py-2 text-dark hover:bg-light"><i className="fas fa-cog mr-2"></i> Settings</a>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-dark hover:bg-light"><i className="fas fa-sign-out-alt mr-2"></i> Logout</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {notification.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification.message}
        </div>
      )}

      <section className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-primary">Welcome back, <span>{userData.firstName}!</span></h1>
                <p className="text-dark">Manage your bookings and explore exclusive offers tailored just for you.</p>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => setShowBookingModal(true)} className="px-6 py-2 bg-primary text-white rounded hover:bg-secondary transition">New Booking</button>
                <a href="/support" className="px-6 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition">Support</a>
              </div>
            </div>
          </div>

          {showBookingModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
                <button onClick={() => setShowBookingModal(false)} className="absolute top-4 right-4 text-dark text-xl">&times;</button>
                <h2 className="text-2xl font-bold text-primary mb-6">Book Your Stay</h2>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="check-in" className="block text-sm font-medium text-dark mb-1">Check-in Date</label>
                    <input type="date" id="check-in" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label htmlFor="check-out" className="block text-sm font-medium text-dark mb-1">Check-out Date</label>
                    <input type="date" id="check-out" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label htmlFor="adults" className="block text-sm font-medium text-dark mb-1">Adults</label>
                    <select id="adults" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="1">1</option>
                      <option value="2" selected>2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="children" className="block text-sm font-medium text-dark mb-1">Children</label>
                    <select id="children" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="0" selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="room-type" className="block text-sm font-medium text-dark mb-1">Room Type</label>
                    <select id="room-type" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="" disabled selected>Select Room Type</option>
                      <option value="Single">Single Room</option>
                      <option value="Double">Double Room</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-secondary transition">Check Availability</button>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ul className="space-y-2">
                <li><a href="#overview" className="block px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition">Overview</a></li>
                <li><a href="#bookings" className="block px-4 py-2 text-dark hover:bg-light rounded transition">My Bookings</a></li>
                <li><a href="#profile" className="block px-4 py-2 text-dark hover:bg-light rounded transition">Profile</a></li>
                <li><a href="#rewards" className="block px-4 py-2 text-dark hover:bg-light rounded transition">Rewards</a></li>
                <li><a href="#preferences" className="block px-4 py-2 text-dark hover:bg-light rounded transition">Preferences</a></li>
                <li><a href="#support" className="block px-4 py-2 text-dark hover:bg-light rounded transition">Support</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-8">
              <div id="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-secondary text-2xl mb-4"><i className="fas fa-calendar-alt"></i></div>
                    <h3 className="text-xl font-bold text-primary mb-2">Upcoming Stay</h3>
                    <p className="text-lg font-medium mb-1">May 15 - May 20, 2023</p>
                    <p className="text-dark">Ocean View Suite</p>
                    <a href="/manage-booking" className="text-primary hover:underline mt-4 inline-block">Manage Booking</a>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-secondary text-2xl mb-4"><i className="fas fa-medal"></i></div>
                    <h3 className="text-xl font-bold text-primary mb-2">Loyalty Points</h3>
                    <p className="text-lg font-medium mb-1">750 Points</p>
                    <p className="text-dark">Gold Member Status</p>
                    <a href="/redeem-points" className="text-primary hover:underline mt-4 inline-block">Redeem Points</a>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-secondary text-2xl mb-4"><i className="fas fa-percentage"></i></div>
                    <h3 className="text-xl font-bold text-primary mb-2">Special Offers</h3>
                    <p className="text-lg font-medium mb-1">3 New Offers</p>
                    <p className="text-dark">Exclusive for you</p>
                    <a href="/special-offers" className="text-primary hover:underline mt-4 inline-block">View Offers</a>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-2xl font-bold text-primary mb-6">Upcoming Reservation</h2>
                  <div className="bg-light p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-primary">Ocean View Suite</h3>
                        <p className="text-dark">Reservation #EGH78945</p>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Confirmed</span>
                      </div>
                      <div className="flex space-x-8">
                        <div className="text-center">
                          <div className="text-sm text-dark">Check-in</div>
                          <div className="font-medium">May 15, 2025</div>
                          <div className="text-sm text-dark">From 2:00 PM</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-dark">Check-out</div>
                          <div className="font-medium">May 20, 2025</div>
                          <div className="text-sm text-dark">Until 12:00 PM</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-6 mb-6">
                      <div className="flex items-center">
                        <i className="fas fa-user text-secondary mr-2"></i>
                        <span>2 Adults</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-bed text-secondary mr-2"></i>
                        <span>King Bed</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-wifi text-secondary mr-2"></i>
                        <span>Free Wi-Fi</span>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <a href="/modify-booking" className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition">Modify Booking</a>
                      <a href="/cancel-booking" className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition">Cancel Booking</a>
                      <a href="/online-checkin" className="px-4 py-2 bg-accent text-white rounded hover:bg-blue-600 transition">Online Check-in</a>
                    </div>
                  </div>
                </div>
              </div>

              <div id="bookings" className="hidden">
                <h2 className="text-2xl font-bold text-primary mb-6">My Bookings</h2>
                <p className="mb-6">View and manage all your current and past bookings.</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow">
                    <thead>
                      <tr className="bg-light">
                        <th className="py-3 px-4 text-left">Booking ID</th>
                        <th className="py-3 px-4 text-left">Room</th>
                        <th className="py-3 px-4 text-left">Check-in</th>
                        <th className="py-3 px-4 text-left">Check-out</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4">EGH78945</td>
                        <td className="py-3 px-4">Presidential Deluxe Room</td>
                        <td className="py-3 px-4">May 15, 2025</td>
                        <td className="py-3 px-4">May 20, 2025</td>
                        <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Confirmed</span></td>
                        <td className="py-3 px-4">
                          <a href="/view-booking" className="text-primary mr-2"><i className="fas fa-eye"></i></a>
                          <a href="/modify-booking" className="text-primary mr-2"><i className="fas fa-edit"></i></a>
                          <a href="/cancel-booking" className="text-red-500"><i className="fas fa-times"></i></a>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4">EGH65432</td>
                        <td className="py-3 px-4">Deluxe Room</td>
                        <td className="py-3 px-4">Mar 10, 2025</td>
                        <td className="py-3 px-4">Mar 15, 2025</td>
                        <td className="py-3 px-4"><span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Completed</span></td>
                        <td className="py-3 px-4">
                          <a href="/view-booking" className="text-primary mr-2"><i className="fas fa-eye"></i></a>
                          <a href="/book-again" className="text-primary"><i className="fas fa-redo"></i></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="profile" className="hidden">
                <h2 className="text-2xl font-bold text-primary mb-6">My Profile</h2>
                <p className="mb-6">Manage your personal information and preferences.</p>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">First Name</label>
                      <input type="text" defaultValue={userData.firstName} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Last Name</label>
                      <input type="text" defaultValue={userData.lastName} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Email</label>
                      <input type="email" defaultValue={userData.email} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Phone</label>
                      <input type="tel" defaultValue="+234 903 424 4576" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Address</label>
                    <input type="text" defaultValue="15 Adeola Odeku Street" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary mb-2" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input type="text" defaultValue="Ciciliza Estate" placeholder="City" className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input type="text" defaultValue="Osogbo" placeholder="State" className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input type="text" defaultValue="Nigeria" placeholder="Country" className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <button type="submit" className="px-6 py-2 bg-primary text-white rounded hover:bg-secondary transition">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="flex items-center bg-primary text-white px-4 py-3 rounded-full shadow-lg cursor-pointer">
          <i className="fas fa-comments mr-2"></i>
          <span>Live Support</span>
        </div>
      </div>

      <footer className="bg-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Evergreen Grand Hotel. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition">Terms & Conditions</a>
            <a href="#" className="hover:text-primary transition">Sitemap</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default UserDashboard;
