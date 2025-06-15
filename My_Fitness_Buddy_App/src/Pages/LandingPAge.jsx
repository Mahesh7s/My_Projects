// src/components/LandingPage.jsx

import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="bg-gray-900 text-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 shadow-md">
        <h1 className="text-3xl font-semibold">FitnessBuddy</h1>
        <ul className="flex gap-6">
          <li>
            <a href="#about" className="hover:text-green-500">
              About
            </a>
          </li>
          <li>
            <Link to="/login" className="hover:text-green-500">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-green-500">
              Signup
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="p-20 text-center">
        <h2 className="text-5xl font-semibold mb-4">
          Find Your Workout Buddy & Get Fitter Together
        </h2>
        <p className="text-gray-400 max-w-2xl m-auto">
          Connect with fitness buddies, track progress, and reach your goals together in a supportive community.
        </p>
        <Link to="/signup">
          <button className="bg-green-500 px-4 py-2 mt-6 rounded-md font-semibold hover:bg-green-600">
            Get Started
          </button>
        </Link>
      </header>

      {/* About Section */}
      <section id="about" className="p-20">
        <h3 className="text-4xl font-semibold mb-4">About</h3>
        <p className="text-gray-400 max-w-2xl">
          Our platform helps you connect with people who share your fitness goals, track progress together, 
          and celebrate every step forward in your health and lifestyle.
        </p>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="p-20">
        <h3 className="text-4xl font-semibold mb-4">FAQs</h3>
        <ul className="bg-gray-800 p-4 rounded-md space-y-4">
          <li>
            <h4>How does matching work?</h4>
            <p>We match you with buddies who have similar goals and preferences.</p>
          </li>
          <li>
            <h4>Is it free to use?</h4>
            <p>Yes, it's completely free with optional premium badges.</p>
          </li>
          <li>
            <h4>Where can I track my progress?</h4>
            <p>Inside your profile, you can view charts, progress, and much more.</p>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p>FitnessBuddy &copy; 2025</p>
      </footer>
    </div>
  );
}

export default LandingPage;
