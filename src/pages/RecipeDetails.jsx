import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useCart } from '../contexts/CartContext';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const {addToCart} = useCart()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.get(`http://localhost:4000/menu/recipes/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data.recipe)
        setRecipe(response.data.recipe);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe. Please try again.');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(recipe);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-400"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{recipe.name}</h1>
      
      <div className="mb-8 max-w-3xl mx-auto">
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000}>
          {recipe?.images?.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`${recipe.name} - view ${index + 1}`} className="object-cover h-96 w-full rounded-lg" />
            </div>
          ))}
        </Carousel>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <p className="text-2xl font-semibold mb-4 text-red-500 text-center"><span className="font-medium text-black mr-4 text-2xl">Price -</span>₹{recipe.price}</p>
          <p className="text-gray-700 mb-4">{recipe.description}</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside">
              {recipe?.ingredients?.map((ingredient, index) => (
                <li key={index} className="text-gray-600">{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
          <button onClick={handleAddToCart} className="w-fit bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
             Add to Cart
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
