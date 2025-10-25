import { useForm } from "react-hook-form";
import {
  FaUser,
  FaBirthdayCake,
  FaWeight,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const UserForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      name: "",
      age: "",
      weight: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"
        >
          <FaUser className="text-primary-500" />
          <span>Name *</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 50,
              message: "Name must be less than 50 characters",
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Age Field */}
      <div>
        <label
          htmlFor="age"
          className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"
        >
          <FaBirthdayCake className="text-primary-500" />
          <span>Age *</span>
        </label>
        <input
          id="age"
          type="number"
          {...register("age", {
            required: "Age is required",
            min: { value: 1, message: "Age must be at least 1" },
            max: { value: 150, message: "Age must be less than 150" },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
            errors.age ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter age"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      {/* Weight Field */}
      <div>
        <label
          htmlFor="weight"
          className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"
        >
          <FaWeight className="text-primary-500" />
          <span>Weight (kg)</span>
        </label>
        <input
          id="weight"
          type="number"
          step="0.1"
          {...register("weight", {
            min: { value: 1, message: "Weight must be at least 1" },
            max: { value: 500, message: "Weight must be less than 500" },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
            errors.weight ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter weight (optional)"
        />
        {errors.weight && (
          <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <>
              <FaSave />
              <span className="font-medium">Save</span>
            </>
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            <FaTimes />
            <span className="font-medium">Cancel</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
