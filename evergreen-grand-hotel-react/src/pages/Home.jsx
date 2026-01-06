import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.5}px)`,
    transition: 'transform 0.1s ease-out'
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
          animate={{ opacity: scrollPosition > 100 ? 0.9 : 1 }}
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
          className={`bg-white py-4 ${scrollPosition > 100 ? 'shadow-lg' : ''} transition-all duration-300`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-green-500"
              >
                <Link to="/" className="no-underline text-inherit">
                  <span>HotelPro Manager</span>
                </Link>
              </motion.div>
              <div className="visible">
                <i className="fas fa-bars"></i>
              </div>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex gap-8 list-none m-0 p-0"
              >
                <motion.li variants={staggerItem}>
                  <Link
                    to="/"
                    className="text-green-500 font-medium no-underline transition-all duration-300 relative group"
                  >
                    Home
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.li>
                <motion.li variants={staggerItem}>
                  <a
                    href="#features"
                    className="text-gray-800 transition-all duration-300 no-underline relative group"
                  >
                    Features
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
                <motion.li variants={staggerItem}>
                  <a
                    href="#how-it-works"
                    className="text-gray-800 transition-all duration-300 no-underline relative group"
                  >
                    How It Works
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
                <motion.li variants={staggerItem}>
                  <a
                    href="#pricing"
                    className="text-gray-800 transition-all duration-300 no-underline relative group"
                  >
                    Pricing
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
                <motion.li variants={staggerItem}>
                  <a
                    href="#contact"
                    className="text-gray-800 transition-all duration-300 no-underline relative group"
                  >
                    Contact
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
              </motion.ul>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="px-4 py-2 border border-green-500 text-green-500 rounded-md transition-all duration-300 no-underline flex items-center">Login</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded-md transition-all duration-300 no-underline flex items-center">Get Started</Link>
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
        className="py-20 bg-gray-50 relative overflow-hidden min-h-screen flex items-center"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-100 to-emerald-100 z-[-1]"></div>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-12 items-center text-center"
          >
            <motion.div variants={staggerItem} className="w-full max-w-2xl mx-auto">
              <motion.h1
                variants={fadeInUp}
                className="text-4xl mt-20 font-bold text-green-500 mb-6"
              >
                <span className='mt-20' style={{ color: '#10b981' }}>HotelPro Manager</span><br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent"
                >Hotel Management System</motion.span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg mb-6 text-gray-800 leading-relaxed"
              >
                Streamline your hotel operations with our comprehensive management solution. From room bookings to staff management, we provide the tools you need to manage your hotel efficiently.
              </motion.p>
              <motion.div
                variants={staggerContainer}
                className="flex flex-col gap-4 justify-center mt-8"
              >
                <motion.div variants={staggerItem}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/signup" className="py-3 px-8 bg-green-500 text-white rounded-md transition-all duration-300 no-underline inline-block shadow-md hover:shadow-lg">Start Free Trial</Link>
                  </motion.div>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href="#features" className="py-3 px-8 border border-green-500 text-green-500 rounded-md transition-all duration-300 no-underline inline-block shadow-md hover:shadow-lg">Learn More</a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="w-full mt-8 perspective-1000"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto"
              >
                <motion.h3
                  variants={fadeInUp}
                  className="text-xl font-bold text-green-500 mb-4 relative pb-2"
                >
                  <span className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                  Hotel Management Made Easy
                </motion.h3>
                <motion.ul
                  variants={staggerContainer}
                  className="flex flex-col gap-3 p-0 m-0"
                >
                  {[
                    { icon: 'fa-check', text: 'Manage bookings and reservations' },
                    { icon: 'fa-check', text: 'Room status tracking and availability' },
                    { icon: 'fa-check', text: 'User dashboard for guests and admins' },
                    { icon: 'fa-check', text: 'Real-time data and analytics' }
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      variants={staggerItem}
                      className="flex items-start"
                    >
                      <motion.i
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`fas ${item.icon} text-green-500 mt-1 mr-2`}
                      ></motion.i>
                      <span className="text-gray-800">{item.text}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 relative pb-4"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-green-500 mb-4 relative inline-block"
            >
              <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
              Comprehensive Management Features
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed"
            >
              Our hotel management system provides all the tools you need to run your hotel business efficiently and effectively.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          >
            {[
              {
                icon: 'fa-bed',
                title: 'Room Management',
                description: 'Effortlessly manage your room inventory, update room status, and monitor availability in real-time.'
              },
              {
                icon: 'fa-calendar-check',
                title: 'Booking Management',
                description: 'Track all reservations, manage check-ins and check-outs, and monitor booking status with our intuitive interface.'
              },
              {
                icon: 'fa-user-tie',
                title: 'Staff Management',
                description: 'Manage your staff, assign responsibilities, and track work schedules for different departments.'
              },
              {
                icon: 'fa-chart-line',
                title: 'Analytics Dashboard',
                description: 'Get real-time insights with our comprehensive analytics dashboard showing key metrics and performance indicators.'
              },
              {
                icon: 'fa-user-edit',
                title: 'Guest Management',
                description: 'Maintain guest profiles, track previous stays, and manage loyalty programs efficiently.'
              },
              {
                icon: 'fa-cog',
                title: 'Configuration Options',
                description: 'Customize your system with various configuration options to fit your hotel\'s specific needs.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
                className="text-center p-8 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-green-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:bg-green-100"
                >
                  <i className={`fas ${feature.icon} text-4xl text-green-500 transition-all duration-300 hover:text-green-600`}></i>
                </motion.div>
                <motion.h3
                  variants={fadeInUp}
                  className="text-xl font-bold text-green-500 mb-3 relative pb-2"
                >
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                  {feature.title}
                </motion.h3>
                <motion.p
                  variants={fadeInUp}
                  className="text-gray-800 leading-relaxed transition-colors duration-300 hover:text-gray-900"
                >{feature.description}</motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="how-it-works"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-16 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-50 to-emerald-50 z-[-1]"></div>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 relative pb-4"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-green-500 mb-4 relative inline-block"
            >
              <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
              How HotelPro Manager Works
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed"
            >
              Our solution makes hotel management intuitive and efficient with a few simple steps.
            </motion.p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <motion.div
                  variants={fadeInLeft}
                  className="p-8"
                >
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-col gap-8"
                  >
                    {[
                      {
                        number: '1',
                        title: 'Registration',
                        description: 'Sign up and create your hotel profile with all necessary details and room inventory.'
                      },
                      {
                        number: '2',
                        title: 'Customization',
                        description: 'Customize your dashboard with settings tailored to your hotel\'s specific needs.'
                      },
                      {
                        number: '3',
                        title: 'Operation',
                        description: 'Start using our comprehensive tools to manage bookings, rooms, staff, and guest services.'
                      }
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        variants={staggerItem}
                        className="flex items-start"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="flex-shrink-0 mr-4 bg-green-50 text-green-500 rounded-full p-3 w-12 h-12 flex items-center justify-center transition-all duration-300 hover:bg-green-100"
                        >
                          <span className="text-xl font-bold transition-colors duration-300 hover:text-green-600">{step.number}</span>
                        </motion.div>
                        <div>
                          <motion.h4
                            variants={fadeInUp}
                            className="text-lg font-bold mb-2 text-green-500 relative pb-1"
                          >
                            <span className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                            {step.title}
                          </motion.h4>
                          <motion.p
                            variants={fadeInUp}
                            className="text-gray-800 leading-relaxed transition-colors duration-300 hover:text-gray-900"
                          >{step.description}</motion.p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
                <motion.div
                  variants={fadeInRight}
                  className="flex items-center p-8 bg-green-50"
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white p-6 rounded-lg shadow-xl w-full"
                  >
                    <motion.h4
                      variants={fadeInUp}
                      className="text-xl font-bold mb-4 text-green-500 relative pb-2"
                    >
                      <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                      Key Features
                    </motion.h4>
                    <motion.ul
                      variants={staggerContainer}
                      className="flex flex-col gap-3 mb-0 p-0"
                    >
                      {[
                        'Real-time room status tracking',
                        'Comprehensive guest history',
                        'Staff access management',
                        'Multi-hotel support'
                      ].map((feature, index) => (
                        <motion.li
                          key={index}
                          variants={staggerItem}
                          className="flex items-start"
                        >
                          <motion.i
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="fas fa-check text-green-500 mt-1 mr-2 transition-all duration-300 hover:text-green-600"
                          ></motion.i>
                          <span className="text-gray-800 transition-colors duration-300 hover:text-gray-900">{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/signup" className="mt-6 block text-center py-3 px-6 bg-green-500 text-white rounded-md transition-all duration-300 no-underline shadow-md hover:shadow-lg">Start Your Free Trial</Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="why-choose"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-16 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 relative pb-4"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-green-500 mb-4 relative inline-block"
            >
              <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
              Why Choose HotelPro Manager
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed"
            >
              Our system offers unique advantages that set us apart from other hotel management solutions.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          >
            {[
              {
                icon: 'fa-cloud',
                title: 'Cloud-Based Platform',
                description: 'Access your management tools from anywhere, any device, with our secure cloud infrastructure.'
              },
              {
                icon: 'fa-shield-alt',
                title: 'Advanced Security',
                description: 'Rest easy with enterprise-grade security protocols protecting your sensitive hotel data.'
              },
              {
                icon: 'fa-headset',
                title: '24/7 Support',
                description: 'Our dedicated support team is always available to help you with any challenges you might face.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
                className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-green-500 mb-6 text-5xl flex justify-center transition-all duration-300 hover:text-green-600"
                >
                  <i className={`fas ${feature.icon}`}></i>
                </motion.div>
                <motion.h3
                  variants={fadeInUp}
                  className="text-xl font-bold text-green-500 mb-3 relative pb-2 text-center"
                >
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                  {feature.title}
                </motion.h3>
                <motion.p
                  variants={fadeInUp}
                  className="text-gray-800 leading-relaxed text-center transition-colors duration-300 hover:text-gray-900"
                >{feature.description}</motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="pricing"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-16 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-50 to-emerald-50 z-[-1]"></div>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 relative pb-4"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-green-500 mb-4 relative inline-block"
            >
              <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
              Transparent Pricing
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed"
            >
              Choose the plan that fits your hotel's needs - no hidden fees, clear pricing
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                title: 'Starter',
                price: '$49',
                features: [
                  'Up to 50 rooms',
                  'Basic analytics',
                  'Email support'
                ],
                buttonText: 'Get Started',
                highlight: false
              },
              {
                title: 'Professional',
                price: '$99',
                features: [
                  'Up to 200 rooms',
                  'Advanced analytics',
                  'Live support',
                  'Priority bookings'
                ],
                buttonText: 'Select Plan',
                highlight: true
              },
              {
                title: 'Enterprise',
                price: '$199',
                features: [
                  'Unlimited rooms',
                  'Premium analytics',
                  '24/7 premium support',
                  'Custom integrations'
                ],
                buttonText: 'Contact Sales',
                highlight: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: plan.highlight ? -5 : -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
                className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${plan.highlight ? 'transform scale-105 z-10' : 'transform scale-100 z-1'}`}
              >
                <motion.div
                  variants={fadeInUp}
                  className={`p-6 ${plan.highlight ? 'bg-emerald-500' : 'bg-green-50'}`}
                >
                  <motion.h3
                    variants={fadeInUp}
                    className={`text-xl font-bold text-center py-2 relative ${plan.highlight ? 'text-white' : 'text-green-500'}`}
                  >
                    <span className={`absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-12 h-1 ${plan.highlight ? 'bg-white' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}></span>
                    {plan.title}
                  </motion.h3>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="p-8"
                >
                  <motion.div
                    variants={fadeInUp}
                    className="text-center mb-6"
                  >
                    <span className="text-3xl font-bold text-green-500 transition-colors duration-300 hover:text-green-600">{plan.price}</span>
                    <span className="text-gray-800 transition-colors duration-300 hover:text-gray-900">/month</span>
                  </motion.div>
                  <motion.ul
                    variants={staggerContainer}
                    className="flex flex-col gap-3 mb-8 p-0"
                  >
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        variants={staggerItem}
                        className="flex items-start"
                      >
                        <motion.i
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="fas fa-check text-green-500 mt-1 mr-2 transition-all duration-300 hover:text-green-600"
                        ></motion.i>
                        <span className="text-gray-800 transition-colors duration-300 hover:text-gray-900">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/register" className="block text-center py-3 px-6 bg-green-500 text-white rounded-md transition-all duration-300 no-underline shadow-md hover:shadow-lg">Start Your Free Trial</Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-16 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={scaleIn}
            className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-8 relative pb-4"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold text-green-500 mb-4 relative inline-block"
              >
                <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                Get Started Today
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-800 leading-relaxed"
              >
                Start streamlining your hotel operations with a 14-day free trial. No credit card required.
              </motion.p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              className="flex flex-col gap-4 justify-center"
            >
              <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="py-4 px-8 bg-green-500 text-white rounded-md transition-all duration-300 no-underline text-center shadow-md hover:shadow-lg">Sign up for a free trial</Link>
              </motion.div>
              <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/demo" className="py-4 px-8 border border-green-500 text-green-500 rounded-md transition-all duration-300 no-underline text-center shadow-md hover:shadow-lg">Request a Demo</Link>
              </motion.div>
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
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={staggerItem} className="footerAbout">
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
              >Revolutionizing hotel management with our comprehensive and intuitive system.</motion.p>
              <motion.div
                variants={staggerContainer}
                className="flex gap-4 mt-4"
              >
                <motion.a
                  variants={staggerItem}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="text-white transition-all duration-300 flex items-center text-xl"
                ><i className="fab fa-facebook-f"></i></motion.a>
                <motion.a
                  variants={staggerItem}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="text-white transition-all duration-300 flex items-center text-xl"
                ><i className="fab fa-twitter"></i></motion.a>
                <motion.a
                  variants={staggerItem}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="text-white transition-all duration-300 flex items-center text-xl"
                ><i className="fab fa-linkedin-in"></i></motion.a>
              </motion.div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <motion.h3
                variants={fadeInUp}
                className="text-lg font-bold mb-4 text-white relative pb-2"
              >
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                Quick Links
              </motion.h3>
              <motion.ul
                variants={staggerContainer}
                className="flex flex-col gap-2 p-0"
              >
                {[
                  { text: 'Home', href: '#' },
                  { text: 'Features', href: '#features' },
                  { text: 'How It Works', href: '#how-it-works' },
                  { text: 'Pricing', href: '#pricing' },
                  { text: 'Resources', href: '#' }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  >
                    <motion.a
                      whileHover={{ color: '#10b981' }}
                      href={link.href}
                      className="text-white transition-all duration-300 no-underline inline-block py-1"
                    >{link.text}</motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div variants={staggerItem}>
              <motion.h3
                variants={fadeInUp}
                className="text-lg font-bold mb-4 text-white relative pb-2"
              >
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                Legal
              </motion.h3>
              <motion.ul
                variants={staggerContainer}
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
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  >
                    <motion.a
                      whileHover={{ color: '#10b981' }}
                      href={link.href}
                      className="text-white transition-all duration-300 no-underline inline-block py-1"
                    >{link.text}</motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div variants={staggerItem}>
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
                >+234 90 1234 5678</motion.a>
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-sm mb-4 text-white"
              >
                Support: <motion.a
                  whileHover={{ color: '#10b981' }}
                  href="mailto:support@hotelpro.co"
                  className="text-white transition-all duration-300 no-underline"
                >support@hotelpro.co</motion.a>
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
            >&copy; 2025 HotelPro Manager. All Rights Reserved.</motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Home;
