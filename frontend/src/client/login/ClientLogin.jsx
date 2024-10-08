import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import api from "../../config/api";

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  // Function to check if the token is expired 
  const CheckTokenExpiration = () => {
    const token = sessionStorage.getItem("customerToken");

    if(token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;  // current time in seconds

      if(decodedToken.exp < currentTime) {
        sessionStorage.removeItem("customerToken");
        sessionStorage.removeItem("clientId");
        toast.info("Session expired. Please log in again.");
        navigate("/client_login");
      }
    }
  };

  useEffect(() => {
    // check token expiration on component mount and every minute
    const interval = setInterval(CheckTokenExpiration, 60000); // check every 60 seconds
    return () => clearInterval(interval);  // Cleanup on component unmount 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(`/api/customers/login`, formData);

      if (response.status === 200) {
        // Handle successful login, e.g., save token, redirect, etc.
        sessionStorage.setItem("customerToken", response.data.token);  // Save token as customerToken
        sessionStorage.setItem("clientId", response.data.client._id);
        toast.success("Login successful");
        navigate("/client/dashboard_client");

      } else {
        // Handle login failure
        console.error("Login failed", response.data.message);
        toast.error("Login failed: " + response.data.message);
      }
    } catch (error) {
      // Handle error during request
      console.error("Error during login request", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-8 text-center mt-6">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded shadow-md"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 shadow-md"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input
                className="mr-1"
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember Me</span>
            </label>
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/register"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientLogin;
