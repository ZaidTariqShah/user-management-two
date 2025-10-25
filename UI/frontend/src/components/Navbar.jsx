import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaPlus } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - Now with better visibility */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all">
              <FaUsers className="text-white text-2xl" />
            </div>
            <span className="text-white text-xl font-bold hover:text-white/90 transition-colors">
              User Management
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                location.pathname === "/"
                  ? "bg-white text-primary-600 shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <FaUsers />
              <span>Users</span>
            </Link>
            <Link
              to="/add"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                location.pathname === "/add"
                  ? "bg-white text-primary-600 shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <FaPlus />
              <span>Add User</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
