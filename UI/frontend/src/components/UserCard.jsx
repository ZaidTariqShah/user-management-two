import {
  FaEdit,
  FaTrash,
  FaUser,
  FaWeight,
  FaBirthdayCake,
  FaCalendar,
} from "react-icons/fa";

const UserCard = ({ user, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="bg-linear-to-r from-primary-500 to-primary-600 h-2"></div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 p-3 rounded-full">
              <FaUser className="text-primary-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(user)}
              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              aria-label="Edit user"
            >
              <FaEdit className="text-lg" />
            </button>
            <button
              onClick={() => onDelete(user)}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              aria-label="Delete user"
            >
              <FaTrash className="text-lg" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-gray-600">
            <FaBirthdayCake className="text-primary-500" />
            <span className="text-sm">
              <span className="font-medium">Age:</span> {user.age} years
            </span>
          </div>

          {user.weight && (
            <div className="flex items-center space-x-3 text-gray-600">
              <FaWeight className="text-primary-500" />
              <span className="text-sm">
                <span className="font-medium">Weight:</span> {user.weight} kg
              </span>
            </div>
          )}

          <div className="flex items-center space-x-3 text-gray-600">
            <FaCalendar className="text-primary-500" />
            <span className="text-sm">
              <span className="font-medium">Created:</span>{" "}
              {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
