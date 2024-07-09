// Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-red-400 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">FoodieHub</h2>
            <p className="mt-2 text-white">Discover, Cook, Enjoy</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition-colors"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><FaTwitter size={24} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><FaInstagram size={24} /></a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-white">
          <p>&copy; 2024 FoodieHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;