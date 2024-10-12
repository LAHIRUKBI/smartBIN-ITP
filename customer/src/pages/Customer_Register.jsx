import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Customer_Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Customer', // Default role
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Component loaded");
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setLoading(false);

            if (!res.ok) {
                setError(data.message || 'Signup failed. Please try again.');
                return;
            }

            // Navigate to signin page on successful signup
            setError(null);
            navigate("/signin");
        } catch (error) {
            console.error("Error:", error.message);
            setLoading(false);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen justify-between">
            {/* Background color changed to white */}
            <div className="flex justify-center items-center flex-grow bg-white relative">
                <div className="relative z-10 flex w-full max-w-4xl bg-white shadow-lg rounded-lg p-9 backdrop-filter backdrop-blur-lg transition-all duration-800 hover:shadow-2xl">
                    {/* Left Side: Form Section */}
                    <div className="w-10dp p-4dp">
                        <h2 className="text-green-600 text-3xl font-extrabold text-center mb-4">Signup</h2>
                        {/* Introduction Section */}
                        <p className="text-green-700 text-base text-center mb-4">
                            Welcome! Please fill in the form below to create your account and join our community.
                            We are excited to have you on board!
                        </p>

                        <form onSubmit={handleSubmit}>
                            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                            {/* Email Field */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-green-600" htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition-all"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-green-600" htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition-all"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Role Selection */}
                            <div className="mb-5">
                                <label className="block text-teal-600 text-sm font-medium mb-2" htmlFor="role">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition-all"
                                    onChange={handleChange}
                                    defaultValue={formData.role}
                                >
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-md transition-all transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </form>

                        <div className="text-center mt-4 text-green-600 text-sm">
                            <Link to="/signin" className="underline hover:text-green-800">Already have an account? Sign in</Link>
                        </div>
                    </div>

                    {/* Right Side: Image Section */}
                    <div className="w-12dp p-4">
                        <img src="src/images/signup.jpeg" alt="Signup" className="w-full h-auto rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105" />
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-green-800 text-white text-center py-6">
                <div className="container mx-auto">
                    <h3 className="text-lg font-bold mb-2">Join Us in Making a Difference!</h3>
                    <p className="mb-4">Your journey towards a greener planet starts here.</p>
                    <div className="flex justify-center mb-4">
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
