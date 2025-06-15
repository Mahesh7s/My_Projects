import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";


import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Dashboard";
import LandingPage from "./Pages/LandingPAge";

function App() {
  return (
    <>
      {/* Toast notifications will appear here */}
      <ToastContainer position="bottom-right" />

      {/* Application routing */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
