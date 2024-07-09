import React, { useState, useEffect } from 'react';
import { FiPackage, FiCheck, FiTruck, FiX } from 'react-icons/fi';
import axios from 'axios';

const statusIcons = {
  pending: <FiPackage className="text-yellow-500" />,
  confirmed: <FiCheck className="text-green-500" />,
  shipped: <FiTruck className="text-blue-500" />,
  cancelled: <FiX className="text-red-500" />
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        
        const response = await axios.get('http://localhost:4000/order', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data.orders);
        setOrders(response.data.orders);
      } 
      catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = activeTab === 'all' ? orders : orders.filter(order => order.status === activeTab);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Your Orders</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {['all', 'pending', 'confirmed', 'shipped', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex-1 text-center`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <li key={order._id} className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {statusIcons[order.status]}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Order #{order._id.substr(0,5)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()} • ₹{order.totalPrice}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {order.status}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500 overflow-hidden">
                    {order.items.map(item => item.recipe.name).join(', ')}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders;
