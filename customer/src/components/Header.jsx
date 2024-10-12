import { useState, useEffect } from 'react';
import { FaSearch, FaBars, FaTimes, FaRecycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null); // State to store the username

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // On component mount, check if the user is logged in by checking localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Set the username if available
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#38EF7D] to-[#11998E] shadow-lg"> 
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Left Side: SmartBIN Logo */}
        <nav className="p-2">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-white flex items-center hover:text-yellow-300 transition duration-300">
              <FaRecycle className="mr-2 text-yellow-300 animate-bounce" />
              SmartBIN
            </Link>
          </div>
        </nav>

        {/* Center: Search Bar */}
        <div className="flex-1 mx-4 hidden sm:flex justify-center">
          <form className="bg-white p-1 rounded-full flex items-center shadow-lg w-full max-w-xl transition duration-300 ease-in-out transform hover:scale-105">
            <input
              type="text"
              placeholder="Search for items, services, or more..."
              className="bg-transparent focus:outline-none w-full px-4 text-gray-700 text-lg placeholder-gray-400 rounded-l-full"
            />
            <button className="bg-gradient-to-r from-[#38EF7D] to-[#11998E] p-3 rounded-full hover:scale-105 transition duration-300">
              <FaSearch className="text-white" />
            </button>
          </form>
        </div>

        {/* Right Side: Mobile Menu Icon */}
        <div className="block sm:hidden">
          <button onClick={toggleMenu} className="text-white hover:text-yellow-300 transition duration-300 text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Right Side: Desktop Menu */}
        <div className="hidden sm:flex sm:items-center sm:space-x-8">
          {username ? (
            <span className="text-white font-semibold transition duration-300 text-lg">
              Welcome, {username}
            </span>
          ) : null}
          <Link to="/register" className="text-white hover:text-yellow-300 font-semibold transition duration-300 text-lg">
            Register
          </Link>
          <Link to="/signin" className="text-white hover:text-yellow-300 font-semibold transition duration-300 text-lg">
            Sign In
          </Link>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      <ul className={`fixed inset-0 bg-gradient-to-r from-[#11998E] to-[#38EF7D] z-50 flex flex-col items-center pt-12 space-y-6 sm:hidden transition-transform transform ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link to="/register" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-300 font-semibold text-lg transition duration-300 transform hover:scale-105">
          Register
        </Link>
        <Link to="/signin" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-300 font-semibold text-lg transition duration-300 transform hover:scale-105">
          Sign In
        </Link>
      </ul>
    </header>
  );
}
