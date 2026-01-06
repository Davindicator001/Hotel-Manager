import React from 'react';
import { Link } from 'react-router-dom';

const Home2 = () => {

    return (
        <>
        <header className=' w-full z-40'>
            <div className="absolute inset-0 p-0 m-0 w-full h-[400px] bg-gradient-to-r from-[#0F2A44] via-[#1F3F66] to-[#081A2E] z-10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 90%)" }}></div>
            <div class="absolute opacity-95 blur-[0.3px] z-20"></div>

            <nav className='p-4 relative z-20 text-white'>
                <div className="mx-auto px-4 max-w-6xl">
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-between items-center max-w-xs gap-4 relative group transition-all scale-100 duration-300 hover:scale-105 '>
                            <i>+</i>
                            <div className='text-xl font-mono antialiased '>
                                <Link>
                                    <span className="font-semibold">
                                        <span className="text-[#C9A24D] group-hover:text-white transition duration-300">Hotel</span>
                                        <span className="text-white group-hover:text-[#C9A24D] transition duration-300">Pro</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <ul className="flex gap-6 font-sans text-sm text-white/90">
                            <li className="">
                                <a className='cursor-pointer hover:text-white/80 transition-all duration-300 no-underline relative group'>
                                    Home
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C9A24D] transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                            <li className="">
                                <a className='cursor-pointer hover:text-white/80 transition-all duration-300 no-underline relative group'>
                                    Pricing
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C9A24D] transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>r
                            <li className="">
                                <a className='cursor-pointer hover:text-white/80 transition-all duration-300 no-underline relative group'>
                                    About
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C9A24D] transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <section className='relative flex min-h-screen justify-start items-top overflow-hidden w-full z-50'>
            <div className='max-w-6xl mx-auto px-4 w-full p-4'>
                <div className='flex flex-col gap-12 items-center text-center'>
                    <h1 className='text-2xl font-bold text-white/90 mb-6'>
                        <span>HotelPro Manager</span><br></br>
                        <span className="inline-block bg-gradient-to-r from-[#C9A24D] to-[#D9AAAD] bg-clip-text text-transparent">Hotel Management System</span>
                    </h1>
                    
                </div>
            </div>
        </section>
        </>
    );
};

export default Home2;