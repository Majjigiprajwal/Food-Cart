// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {cart} = useCart()

  return (
    <header className="bg-red-400 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-extrabold text-white font-serif">FoodieHub</Link>
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="py-2 px-4 pr-10 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Link to="/cart" className="relative text-3xl text-white hover:text-black transition-colors">
             <FaShoppingCart />
                  {cart.length > 0 && (
               <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
               </span>)}
            </Link>
            <Link to="/profile" className="text-3xl text-white hover:text-black transition-colors ">
              <FaUser />
            </Link>
          </div>
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-full py-2 px-4 pr-10 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Link to="/cart" className="flex items-center space-x-2 text-gray-600">
                <FaShoppingCart />
                <span>Cart</span>
              </Link>
              <Link to="/profile" className="flex items-center space-x-2 text-gray-600">
                <FaUser />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

