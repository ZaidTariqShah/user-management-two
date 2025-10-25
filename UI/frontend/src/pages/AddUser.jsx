import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import UserForm from "../components/UserForm";
import { createUser } from "../features/users/usersSlice";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

  const handleSubmit = async (data) => {
    try {
      await dispatch(createUser(data)).unwrap();
      toast.success("User created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors"
      >
        <FaArrowLeft />
        <span>Back to Users</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New User</h1>
        <p className="text-gray-600 mb-8">
          Fill in the details to create a new user
        </p>

        <UserForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
};

export default AddUser;
