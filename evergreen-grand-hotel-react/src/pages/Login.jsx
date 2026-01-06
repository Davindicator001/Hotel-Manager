import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('guest');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:9000'//'https://evergreen-backend-80rh.onrender.com'
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = { email, password, remember };
      const response = userType === 'admin'
        ? await axios.post(`${API_BASE_URL}/api/login/admin`, formData)
        : await axios.post(`${API_BASE_URL}/api/login/guest`, formData);

      const token = response.data.token;
      localStorage.setItem('authToken', token);
      setNotification({ show: true, message: "Successfully Logged In, Welcome!", type: 'success' });

      setTimeout(() => {
        navigate(userType === 'admin' ? '/admin' : '/dashboard');
      }, 1500);
    } catch (error) {
      setNotification({ show: true, message: "Invalid credentials", type: 'error' });
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="bg-primary text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <a href="tel:+2340904166302" className="flex items-center text-sm">
                  <i className="fas fa-phone mr-2"></i> (+234) 090 416 6302
                </a>
                <a href="mailto:evergreen.g.hotel@gmail.com" className="flex items-center text-sm">
                  <i className="fas fa-envelope mr-2"></i> evergreen.g.hotel@gmail.com
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
              <ul className="hidden md:flex space-x-8">
                <li><a href="/" className="text-dark hover:text-primary">Home</a></li>
                <li><a href="#about" className="text-dark hover:text-primary">About</a></li>
                <li><a href="#accommodations" className="text-dark hover:text-primary">Rooms & Suites</a></li>
                <li><a href="#experiences" className="text-dark hover:text-primary">Dining</a></li>
                <li><a href="#facilities" className="text-dark hover:text-primary">Facilities</a></li>
                <li><a href="#gallery" className="text-dark hover:text-primary">Gallery</a></li>
                <li><a href="#contact" className="text-dark hover:text-primary">Contact</a></li>
              </ul>
              <div className="flex space-x-4">
                <a href="/login" className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition">Login</a>
                <a href="/signup" className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition">Sign Up</a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-2">Login to Your Account</h2>
            <p className="text-dark mb-6">Welcome back! Please enter your credentials to access your account.</p>

            <div className="flex mb-6">
              <button
                type="button"
                onClick={() => setUserType('guest')}
                className={`flex-1 py-2 rounded-l ${userType === 'guest' ? 'bg-primary text-white' : 'bg-gray-200 text-dark'}`}
              >
                Login as Guest
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 py-2 rounded-r ${userType === 'admin' ? 'bg-primary text-white' : 'bg-gray-200 text-dark'}`}
              >
                Login as Admin
              </button>
            </div>

            {notification.show && (
              <div className={`mb-4 p-3 rounded ${notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {notification.message}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input type="hidden" name="userType" value={userType} />

              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="block text-sm font-medium text-dark mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="remember" className="text-sm text-dark">Remember me</label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded text-white ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-secondary'} transition`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-dark">Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign Up</a></p>
            </div>
          </div>
        </div>
      </section>

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

export default Login;
