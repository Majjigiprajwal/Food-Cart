import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from '../components/cards/CategoryCard';
import RecipeCard from '../components/cards/RecipeCard';

const Home = ()=> {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoriesResponse, recipesResponse] = await Promise.all([
          axios.get('http://localhost:4000/menu/categories', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }),
          axios.get('http://localhost:4000/menu/recipes', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        ]);

        setCategories(categoriesResponse.data.categories);
        setRecipes(recipesResponse.data.recipes);
        console.log(categoriesResponse.data.categories)
        console.log(recipesResponse.data.recipes)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-400"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-10">
       <div className="bg-red-300 text-white py-20 px-4 text-center font-serif rounded-md">
        <h1 className="text-4xl  font-bold mb-4 ">Welcome to FoodieHub</h1>
        <p className="text-2xl">Discover and order delicious meals</p>
      </div>
      <h1 className="text-3xl text-gray-800 font-bold mb-6 font-sans text-center  ">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories?.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
      </div>

  <section className="py-12 bg-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Recipes</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
    </div>
  </div>
</section>

    </div>
  );
}

export default Home;


