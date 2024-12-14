'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="nav-link">
              Courses
            </Link>
            <Link href="/courses/catalog" className="nav-link">
              Course Catalog
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/donate" className="nav-link">
              Donate
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <FaUserCircle size={24} />
                  <span>{user.firstName}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="btn-secondary">Login</button>
                </Link>
                <Link href="/register">
                  <button className="btn-primary">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/courses" className="nav-link">
                Courses
              </Link>
              <Link href="/courses/catalog" className="nav-link">
                Course Catalog
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/donate" className="nav-link">
                Donate
              </Link>
              
              {user ? (
                <>
                  <Link href="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="nav-link">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="btn-secondary w-full">Login</button>
                  </Link>
                  <Link href="/register">
                    <button className="btn-primary w-full">Register</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
