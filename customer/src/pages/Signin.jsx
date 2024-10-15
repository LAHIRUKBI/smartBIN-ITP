import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!role) {
            setError('Please select a role');
            return;
        }

        try {
            const response = await axios.post('/api/auth/signin', { email, password, role });
            console.log('Login successful:', response.data);

            localStorage.setItem('access_token', response.data.token);

            const username = email.split('@')[0]; // Extract the part before '@' from email
            localStorage.setItem('username', username); // Save username in localStorage

            switch (role) {
                case 'Customer':
                    navigate('/customer_welcome');
                    break;
                case 'Stock Manager':
                    navigate('/stockwelcome');
                    break;
                case 'Staff Manager':
                    navigate('/staff_manager_dash');
                    break;
                case 'Packing Manager':
                    navigate('/packing_welcome');
                    break;
                case 'Vehicle Manager':
                    navigate('/vehicle_welcome');
                    break;
                case 'Product Manager':
                    navigate('/product_welcome');
                    break;
                case 'Notification Manager':
                    navigate('/notification_welcome');
                    break;
                case 'Order Manager':
                    navigate('/order_welcome');
                    break;
                default:
                    setError('Invalid role');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error);
            setError(error.response?.data.message || 'Login failed');
        }
    };

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <div className="flex justify-center items-center flex-grow bg-white relative">
                <div className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-60 shadow-lg rounded-2xl backdrop-blur-md border border-gray-200 transition-all duration-800 hover:shadow-xl">
                    <div className="text-center mb-8">
                        <div className="text-2xl font-bold text-green-800">SmartBIN</div>
                        <h2 className="text-lg text-gray-900 mt-1">Log in to your account</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-green-600">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-green-600">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-teal-600">Role:</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                required
                            >
                                <option value="">Select your role</option>
                                <option value="Customer">Customer</option>
                                <option value="Stock Manager">Stock Manager</option>
                                <option value="Staff Manager">Staff Manager</option>
                                <option value="Packing Manager">Packing Manager</option>
                                <option value="Vehicle Manager">Vehicle Manager</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="Notification Manager">Notification Manager</option>
                                <option value="Order Manager">Order Manager</option>
                            </select>
                        </div>
                        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-5 rounded-md shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all transform hover:scale-105"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center mt-5 text-green-600 text-sm">
                        <a href="#" className="underline">Can't log in?</a>
                        <p className="mt-2">Privacy policy | Terms of use</p>
                    </div>
                </div>
            </div>

            <footer className="bg-green-800 text-white text-center py-4">
                <div className="container mx-auto">
                    <h3 className="text-lg font-bold mb-2">Join Us in Making a Difference!</h3>
                    <p className="mb-2">Your journey towards a greener planet starts here.</p>
                    <div className="flex justify-center mb-2">
                        <a href="https://facebook.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
