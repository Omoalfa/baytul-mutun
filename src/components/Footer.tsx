'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-green-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo size="lg" textColor="white" />
            <p className="text-gray-300 mt-4">
              Empowering Muslims worldwide through authentic Islamic learning and traditional texts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="hover:text-gold transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-gold transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <FaYoutube size={24} />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-300">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-md flex-1 text-black focus:outline-none"
                />
                <button className="bg-gold text-green-dark px-4 py-2 rounded-r-md hover:bg-gold-dark transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              {new Date().getFullYear()} Baytul Mutun Wal Manzumaat. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-gold text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-gold text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
