import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(recipe);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/recipe/${recipe._id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.images[0]} 
          alt={recipe.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2 truncate">{recipe.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold text-red-400">₹{recipe.price}</p>
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-red-500 text-white py-2 px-4 hover:bg-red-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;