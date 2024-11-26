import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { toast } from "react-toastify";
import api from "../config/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(`/api/user/login`, formData);

      if (response.status === 200) {
        // Handle successful login, e.g., save token, redirect, etc.
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("userId", response.data.user._id);
        sessionStorage.setItem("username", response.data.user.name);
        toast.success("Login successful");

        if (response.data.role === "employee") {
          // navigate("/admin");
          navigate("/employee");
        } else if (response.data.role === "account") {
          navigate("/account/dashboard");
        } else if (response.data.role === "admin") {
          navigate("/admin/dashboard");
        } else if (response.data.role === "hr") {
          navigate("/hr");
        } else {
          navigate("/");
        }
      } else {
        // Handle login failure
        console.error("Login failed", response.data.message);
        toast.error("Login failed: " + response.data.message);
      }
    } catch (error) {
      // Handle error during request
      toast.info(`Login failed due to ${error.response.data.message}`);
      console.error("Error during login request", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 lg:w-1/4 md:w-1/2 w-full sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-8 py-10  bg-white shadow-lg sm:rounded-3xl p-4">
          <div className="w-full">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome back
              </h1>
              <p className="mt-2 text-gray-600">
                Please sign in to your account
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 space-y-10">
                <div className="relative">
                  <input
                    className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0.5 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                </div>

                <div className="relative">
                  <input
                    className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0.5 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1 text-gray-500"
                  >
                    {showPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot password?
                  </a>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
