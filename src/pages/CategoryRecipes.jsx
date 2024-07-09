import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/cards/RecipeCard';

const CategoryRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.get(`http://localhost:4000/menu/category-recipes/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data)
        setRecipes(response.data.recipes);
        setCategory(response.data.category);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching category recipes:', err);
        setError('Failed to load recipes. Please try again.');
        setLoading(false);
      }
    };

    fetchCategoryRecipes();
  }, [id]);

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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {category ? `${category.name} Recipes` : 'Category Recipes'}
      </h1>
      
      {category && category.image && (
        <div className="mb-8">
          <img src={category.image} alt={category.name} className="w-full h-64 object-cover rounded-lg shadow-md" />
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      
      {recipes.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No recipes found in this category.</p>
      )}
    </div>
  );
};

export default CategoryRecipes;
