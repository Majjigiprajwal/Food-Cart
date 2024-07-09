import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

function Profile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const token = JSON.parse(localStorage.getItem('token'));

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };
  const handleChange = (e) => setEditedUser({ ...editedUser, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:4000/user/profile', editedUser, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center text-purple-600 hover:text-purple-800 transition duration-150 ease-in-out"
                >
                  <FiEdit2 className="mr-2" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
                  >
                    <FiX className="mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex items-center text-green-600 hover:text-green-800 transition duration-150 ease-in-out"
                  >
                    <FiSave className="mr-1" />
                    Save
                  </button>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <img 
                className="h-32 w-32 rounded-full object-cover mx-auto" 
                src={user.avatar || 'https://via.placeholder.com/150'} 
                alt="User avatar" 
              />
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{user.name}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{user.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{user.address}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block lg:text-xl font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="mt-1 block w-full lg:text-xl border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm lg:text-xl font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    className="mt-1 block w-full lg:text-xl border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm lg:text-xl font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full lg:text-xl border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm lg:text-xl font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={editedUser.address}
                    onChange={handleChange}
                    className="mt-1 block w-full lg:text-xl border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <p className="block text-sm lg:text-xl font-medium text-gray-700">Member Since</p>
                  <p className="mt-1 text-sm lg:text-xl text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
