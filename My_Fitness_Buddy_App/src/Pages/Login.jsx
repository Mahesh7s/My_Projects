import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleLogin, handleGoogleLogin } from "../firebase/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      setLoginLoading(true);
      try {
        await dispatch(handleLogin({ email, password })).unwrap();
        toast.success("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1200);
      } catch (err) {
        toast.error("Login failed. Check credentials.");
      } finally {
        setLoginLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await dispatch(handleGoogleLogin()).unwrap();
      toast.success("Google login successful!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      toast.error("Google login cancelled or failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-100 to-green-300 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={1000} />
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-800">Login to Fitness Buddy</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loginLoading || googleLoading}
            />
            {formError.email && <p className="text-red-500 text-sm">{formError.email}</p>}
          </div>

          <div>
            <label className="block text-green-700 font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loginLoading || googleLoading}
            />
            {formError.password && <p className="text-red-500 text-sm">{formError.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded shadow transition duration-300 cursor-pointer"
            disabled={loginLoading || googleLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full mt-2 bg-white border border-green-600 hover:bg-green-100 text-green-700 py-2 px-6 rounded shadow transition duration-300 flex items-center justify-center gap-3 cursor-pointer"
            disabled={googleLoading || loginLoading}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {googleLoading ? "Please wait..." : "Login with Google"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-green-700">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-orange-600 font-semibold text-lg cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

