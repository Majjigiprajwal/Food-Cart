import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => (
  <Link
    to={`/category/${category._id}`}
    className="bg-white rounded-lg shadow-md overflow-hidden hover:bg-red-300 hover:shadow-lg transition-shadow duration-300"
  >
    <img
      src={category.image}
      alt={category.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold">{category.name}</h2>
    </div>
  </Link>
);

export default CategoryCard;