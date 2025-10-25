import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import ConfirmModal from "../components/ConfirmModal";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  setSearchTerm,
  selectFilteredUsers,
} from "../features/users/usersSlice";

const Home = () => {
  const dispatch = useDispatch();
  const filteredUsers = useSelector(selectFilteredUsers);
  const { loading, error, searchTerm } = useSelector((state) => state.users);

  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (data) => {
    try {
      await dispatch(
        updateUser({ id: editingUser._id, userData: data })
      ).unwrap();
      toast.success("User updated successfully!");
      setEditingUser(null);
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const handleDelete = (user) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteUser(deletingUser._id)).unwrap();
      toast.success("User deleted successfully!");
      setDeletingUser(null);
    } catch (err) {
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  if (loading && filteredUsers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          User Management
        </h1>
        <p className="text-gray-600">Manage your users efficiently</p>
      </div>

      {/* Search and Add */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <Link
          to="/add"
          className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FaUserPlus />
          <span className="font-medium">Add New User</span>
        </Link>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit User</h2>
            <UserForm
              initialData={editingUser}
              onSubmit={handleUpdate}
              onCancel={() => setEditingUser(null)}
              isLoading={loading}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingUser}
        title="Delete User"
        message={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingUser(null)}
        isLoading={isDeleting}
      />

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👤</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Try adjusting your search"
              : "Get started by adding your first user"}
          </p>
          {!searchTerm && (
            <Link
              to="/add"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaUserPlus />
              <span>Add Your First User</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
