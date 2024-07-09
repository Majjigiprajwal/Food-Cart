import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CategoryRecipes from './pages/CategoryRecipes';
import RecipeDetails from './pages/RecipeDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import SignIn from './components/auth/Signin';
import SignUp from './components/auth/Signup';
import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import { CartProvider } from './contexts/CartContext';

function App() {

  const cart = {
    user: "60d0fe4f5311236168a109ca",
    items: [
      {
        recipe: {
          _id: "60d0fe4f5311236168a109cb",
          name: "Butter Chicken",
          price: 10.00,
          image: "https://via.placeholder.com/150"
        },
        quantity: 2
      },
      {
        recipe: {
          _id: "60d0fe4f5311236168a109cc",
          name: "Paneer Tikka Masala",
          price: 9.00,
          image: "https://via.placeholder.com/150"
        },
        quantity: 1
      },
      {
        recipe: {
          _id: "60d0fe4f5311236168a109cd",
          name: "Fish Tikka",
          price: 13.00,
          image: "https://via.placeholder.com/150"
        },
        quantity: 3
      }
    ]
  };
  return (
    <AuthProvider>
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="category/:id" element={<CategoryRecipes />} />
          <Route path="recipe/:id" element={<RecipeDetails />} />
          <Route path="cart" element={<Cart cart={cart} />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;


