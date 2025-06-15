import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/authmethods";
import { handleRegister } from "../firebase/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonPos, setButtonPos] = useState("left-0");

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const validatePassword = (pwd) => {
    const length = pwd.length >= 8;
    const upper = /[A-Z]/.test(pwd);
    const lower = /[a-z]/.test(pwd);
    const number = /[0-9]/.test(pwd);
    const special = /[^A-Za-z0-9]/.test(pwd);
    return length && upper && lower && number && special;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confPassword) newErrors.confPassword = "Confirm password required";
    if (password !== confPassword) newErrors.match = "Passwords do not match";
    if (!validatePassword(password)) newErrors.weak = "Weak password";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(handleRegister({ email, password }));
    }
  };

  const handleMouseEnter = () => {
    const hasErrors =
      !email ||
      !password ||
      !confPassword ||
      password !== confPassword ||
      !validatePassword(password);
    if (hasErrors) {
      setButtonPos(buttonPos === "left-0" ? "right-0" : "left-0");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-100 to-green-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-800">
          Create Fitness Buddy Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-green-700 font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            {!validatePassword(password) && password && (
              <p className="text-yellow-600 text-sm">
                Password must be 8+ chars, include uppercase, lowercase, number & symbol
              </p>
            )}
          </div>

          <div>
            <label className="block text-green-700 font-semibold">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            {errors.confPassword && (
              <p className="text-red-500 text-sm">{errors.confPassword}</p>
            )}
            {errors.match && (
              <p className="text-red-500 text-sm">{errors.match}</p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div className="relative w-full h-12 mt-6">
            <button
              onMouseEnter={handleMouseEnter}
              type="submit"
              disabled={loading}
              className={`absolute ${buttonPos} transition-all duration-300 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded shadow ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
			<br/>
			</div>
			  <div className="mt-6 text-center">
          <p className="text-green-700">
            Already have an account?{"  "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-600 font-semibold text-lg cursor-pointer hover:underline"
              style={{ textDecoration: "none" }}
            >
              Login
            </span>
          </p>
        </div>


          
        </form>
      </div>
    </div>
  );
};

export default Signup;
