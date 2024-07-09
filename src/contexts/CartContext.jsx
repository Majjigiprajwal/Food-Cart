import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:4000/order/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data.cart.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (recipe) => {
    try {
        
      const response = await axios.post(
        'http://localhost:4000/order/cart',
        { recipeId: recipe._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.cart.items);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:4000/order/cart/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
     
      setCart((prevCart) => prevCart.filter((item) => item._id !== recipeId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (recipeId, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/order/cart/${recipeId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.cart.items);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:4000/order/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};