import { useCart } from '../contexts/CartContext';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoTrashOutline } from 'react-icons/io5';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart} = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.recipe.price * item.quantity, 0);

  const token = JSON.parse(localStorage.getItem('token'))
  const naviagte = useNavigate()

  const placeOrder = async ()=> {
    try{
         await axios.post('http://localhost:4000/order',{totalPrice},{
          headers:{
            'Authorization':`Bearer ${token}`
          }
         })

         naviagte('/orders')

    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto  p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-4xl text-red-400">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-6 mb-8">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center bg-red-200 p-4 rounded-lg shadow">
                <img
                  src={item.recipe.images[0]}
                  alt={item.recipe.name}
                  className="w-24 h-24 object-cover rounded-md mr-6"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.recipe.name}</h2>
                  <p className="text-gray-600 text-xl">₹{item.recipe.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="text-black"
                    >
                      <IoRemoveCircleOutline size={24} />
                    </button>
                    <span className="mx-3 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="text-black"
                    >
                      <IoAddCircleOutline size={24} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-2xl">₹{item.recipe.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <IoTrashOutline size={30} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-semibold">Total:</span>
              <span className="text-2xl font-bold">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <button
                onClick={clearCart}
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Clear Cart
              </button>
              <button className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300" onClick={placeOrder}>
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

