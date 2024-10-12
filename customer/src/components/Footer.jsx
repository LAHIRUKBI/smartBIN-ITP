import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-gray-400">
              SmartBin is dedicated to creating innovative solutions for waste management. Our mission is to make recycling easy and accessible for everyone.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-green-400">Services</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-green-400">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-400">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li className="text-gray-400">1234 Green St, Eco City, EC 56789</li>
              <li className="text-gray-400">Email: <a href="mailto:info@smartbin.com" className="hover:text-green-400">info@smartbin.com</a></li>
              <li className="text-gray-400">Phone: <a href="tel:+1234567890" className="hover:text-green-400">+1 234 567 890</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SmartBin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
