import React, { useState, useContext } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { BlogContext } from '../context/BlogContext';

const Navbar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { currentUser, signOut } = useContext(BlogContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
        setMenuVisible(false);
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                            BlogiSphere
                        </Link>
                        <div className="hidden md:flex items-center gap-8 text-base text-slate-600 font-medium">
                            <NavLink
                                to="/"
                                className={({ isActive }) => 
                                    `transition-colors duration-200 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                                }
                            >
                                Home
                            </NavLink>
                            {currentUser && (
                                <NavLink
                                    to="/create"
                                    className={({ isActive }) => 
                                        `transition-colors duration-200 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                                    }
                                >
                                    Write a Blog
                                </NavLink>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {currentUser ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                    <img 
                                        src={currentUser.profileImageUrl} 
                                        alt={currentUser.fullname} 
                                        className="w-8 h-8 rounded-full bg-slate-200 border border-slate-200"
                                    />
                                    <span className="text-sm font-medium text-slate-700">{currentUser.fullname}</span>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="text-slate-500 hover:text-red-600 font-medium transition duration-200 cursor-pointer text-sm"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium cursor-pointer transition">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 cursor-pointer shadow-sm">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button className="text-slate-600 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-50" onClick={() => setMenuVisible(!menuVisible)}>
                            {menuVisible ? <RxCross1 className="w-6 h-6" /> : <RxHamburgerMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {menuVisible && (
                    <div className="absolute right-4 top-full mt-2 w-56 bg-white border border-slate-150 p-2 rounded-xl shadow-xl flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <NavLink
                            to="/"
                            onClick={() => setMenuVisible(false)}
                            className={({ isActive }) => 
                                `block px-4 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                                    isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        {currentUser && (
                            <NavLink
                                to="/create"
                                onClick={() => setMenuVisible(false)}
                                className={({ isActive }) => 
                                    `block px-4 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                                        isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                                    }`
                                }
                            >
                                Write a Blog
                            </NavLink>
                        )}
                        <hr className="my-1 border-slate-100" />
                        {currentUser ? (
                            <>
                                <div className="px-4 py-2.5 flex items-center space-x-3">
                                    <img 
                                        src={currentUser.profileImageUrl} 
                                        alt={currentUser.fullname} 
                                        className="w-8 h-8 rounded-full bg-slate-100"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-slate-800 leading-tight">{currentUser.fullname}</span>
                                        <span className="text-[10px] text-slate-400 leading-tight truncate max-w-[140px]">{currentUser.email}</span>
                                    </div>
                                </div>
                                <hr className="my-1 border-slate-100" />
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition duration-150 cursor-pointer"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuVisible(false)}
                                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition duration-150"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setMenuVisible(false)}
                                    className="block px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 text-center transition duration-150 mt-1 shadow-sm"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;