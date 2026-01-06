import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  const [userType, setUserType] = useState('guest');
  const [adminCode, setAdminCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:9000'//'https://evergreen-backend-80rh.onrender.com'
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setNotification({ show: true, message: "Passwords do not match!", type: 'error' });
      setLoading(false);
      return;
    }

    if (userType === 'admin' && adminCode !== 'EGH-ADMIN-2023') {
      setNotification({ show: true, message: "Invalid Admin Code contact support to get a valid one", type: 'error' });
      setLoading(false);
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      number: phone,
      password,
      ...(userType === 'admin' && { adminCode })
    };

    try {
      const response = userType === 'admin'
        ? await axios.post(`${API_BASE_URL}/api/register/admin`, formData)
        : await axios.post(`${API_BASE_URL}/api/register/user`, formData);

      setNotification({ show: true, message: response.data.message, type: 'success' });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      setNotification({ show: true, message: "User already Registered, Login", type: 'error' });
      console.error('Error creating account:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full z-50 bg-white shadow-md transition-all duration-300"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-green-500 text-white py-1"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="tel:+2340904166302"
                  className="flex items-center text-sm text-white no-underline"
                >
                  <i className="fas fa-phone mr-2"></i> (+234) 090 416 6302
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="mailto:hotelmanager@evergreen.com"
                  className="flex items-center text-sm text-white no-underline"
                >
                  <i className="fas fa-envelope mr-2"></i> hotelmanager@evergreen.com
                </motion.a>
              </div>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="text-white"
                ><i className="fab fa-facebook-f"></i></motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="text-white"
                ><i className="fab fa-twitter"></i></motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="text-white"
                ><i className="fab fa-linkedin-in"></i></motion.a>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white py-4 transition-all duration-300"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-green-500"
              >
                <a href="/" className="no-underline text-inherit">
                  <span>HotelPro Manager</span>
                </a>
              </motion.div>
              <div className="hidden">
                <i className="fas fa-bars"></i>
              </div>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex gap-8 list-none m-0 p-0"
              >
                <motion.li
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <a href="/" className="text-gray-800 transition-all duration-300 no-underline relative group">
                    Home
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
                <motion.li
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <a href="#features" className="text-gray-800 transition-all duration-300 no-underline relative group">
                    Features
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
                <motion.li
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <a href="#how-it-works" className="text-gray-800 transition-all duration-300 no-underline relative group">
                    How It Works
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
                <motion.li
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <a href="#pricing" className="text-gray-800 transition-all duration-300 no-underline relative group">
                    Pricing
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
                <motion.li
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <a href="#contact" className="text-gray-800 transition-all duration-300 no-underline relative group">
                    Contact
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
              </motion.ul>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="/login" className="px-4 py-2 border border-green-500 text-green-500 rounded-md transition-all duration-300 no-underline flex items-center">Login</a>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="/signup" className="px-4 py-2 bg-green-500 text-white rounded-md transition-all duration-300 no-underline flex items-center">Sign Up</a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>
      </motion.header>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20 bg-gray-50 relative overflow-hidden min-h-screen flex items-center pt-32"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-100 to-emerald-100 z-[-1]"></div>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <motion.div
            variants={scaleIn}
            className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-green-500 mb-4 relative inline-block"
            >
              <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
              Create an Account
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-800 mb-8 leading-relaxed"
            >
              Join HotelPro Manager to access exclusive features and manage your hotel operations efficiently.
            </motion.p>

            <div className="flex mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setUserType('guest')}
                className={`flex-1 py-3 rounded-l-md ${userType === 'guest' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} transition-all duration-300`}
              >
                Sign up as Guest
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 py-3 rounded-r-md ${userType === 'admin' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} transition-all duration-300`}
              >
                Sign up as Hotel Agent
              </motion.button>
            </div>

            {notification.show && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-md ${notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
              >
                {notification.message}
              </motion.div>
            )}

            {userType === 'admin' && (
              <div>
                <label htmlFor = "HotelName" className=""></label>
                <input> </input>
              </div>
              )}

            <form onSubmit={handleSignup} className="space-y-6">
              <input type="hidden" name="userType" value={userType} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp} className="form-group">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </motion.div>
                <motion.div variants={fadeInUp} className="form-group">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="form-group">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="form-group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="form-group">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                {password !== confirmPassword && confirmPassword && (
                  <p className="text-sm text-red-600 mt-2">Passwords do not match</p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  required
                  className="mr-3 h-5 w-5 text-green-500 rounded focus:ring-green-500 border-gray-300"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">I agree to the <a href="#" className="text-green-500 hover:underline">Terms & Conditions</a></label>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-emerald-600'} transition-all duration-300 shadow-md hover:shadow-lg`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </form>

            <motion.div
              variants={fadeInUp}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-green-500 hover:underline">Login</a></p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-gray-900 text-white py-8 mt-16 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900/90 to-gray-700/70 z-[-1]"></div>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInUp} className="footerAbout">
              <motion.div
                variants={fadeInUp}
                className="text-2xl font-bold mb-4 text-white relative pb-2"
              >
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                HotelPro Manager
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="mb-4 text-white leading-relaxed"
              >
                Revolutionizing hotel management with our comprehensive and intuitive system.
              </motion.p>
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex gap-4 mt-4"
              >
                <motion.a
                  variants={fadeInUp}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="text-white transition-all duration-300 flex items-center text-xl"
                >
                  <i className="fab fa-facebook-f"></i>
                </motion.a>
                <motion.a
                  variants={fadeInUp}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="text-white transition-all duration-300 flex items-center text-xl"
                >
                  <i className="fab fa-twitter"></i>
                </motion.a>
                <motion.a
                  variants={fadeInUp}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="text-white transition-all duration-300 flex items-center text-xl"
                >
                  <i className="fab fa-linkedin-in"></i>
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.h3
                variants={fadeInUp}
                className="text-lg font-bold mb-4 text-white relative pb-2"
              >
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                Quick Links
              </motion.h3>
              <motion.ul
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex flex-col gap-2 p-0"
              >
                {[
                  { text: 'Home', href: '/' },
                  { text: 'Features', href: '#features' },
                  { text: 'How It Works', href: '#how-it-works' },
                  { text: 'Pricing', href: '#pricing' },
                  { text: 'Resources', href: '#' }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                  >
                    <motion.a
                      whileHover={{ color: '#10b981' }}
                      href={link.href}
                      className="text-white transition-all duration-300 no-underline inline-block py-1"
                    >
                      {link.text}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.h3
                variants={fadeInUp}
                className="text-lg font-bold mb-4 text-white relative pb-2"
              >
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                Legal
              </motion.h3>
              <motion.ul
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex flex-col gap-2 p-0"
              >
                {[
                  { text: 'Terms of Service', href: '#' },
                  { text: 'Privacy Policy', href: '#' },
                  { text: 'Cookie Policy', href: '#' },
                  { text: 'Data Processing', href: '#' }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                  >
                    <motion.a
                      whileHover={{ color: '#10b981' }}
                      href={link.href}
                      className="text-white transition-all duration-300 no-underline inline-block py-1"
                    >
                      {link.text}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.h3
                variants={fadeInUp}
                className="text-lg font-bold mb-4 text-white relative pb-2"
              >
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                Contact
              </motion.h3>
              <motion.p
                variants={fadeInUp}
                className="text-sm mb-4 text-white leading-relaxed"
              >
                123 Hotel Management Road<br />
                Osogbo, Osun State<br />
                Nigeria
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-sm mb-1 text-white"
              >
                Sales: <motion.a
                  whileHover={{ color: '#10b981' }}
                  href="tel:+2349012345678"
                  className="text-white transition-all duration-300 no-underline"
                >
                  +234 90 1234 5678
                </motion.a>
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-sm mb-4 text-white"
              >
                Support: <motion.a
                  whileHover={{ color: '#10b981' }}
                  href="mailto:support@hotelpro.co"
                  className="text-white transition-all duration-300 no-underline"
                >
                  support@hotelpro.co
                </motion.a>
              </motion.p>
            </motion.div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="border-t border-white/20 pt-8 mt-8 text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-white text-sm"
            >
              &copy; 2025 HotelPro Manager. All Rights Reserved.
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Signup;