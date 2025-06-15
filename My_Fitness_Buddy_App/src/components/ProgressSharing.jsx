// src/components/ProgressSharing.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProgressSharing,
  addProgressSharing,
} from "../firebase/progressSharingSlice";

function ProgressSharing() {
  const dispatch = useDispatch();

  const { messages, loading, error } = useSelector(
    (state) => state.progressSharing
  );

  const [newMessage, setNewMessage] = useState({ user: "", message: "" });

  useEffect(() => {
    if (messages.length === 0) {
      dispatch(fetchProgressSharing()); // Loading initial messages
    }
  }, [dispatch]);

  const handleAddMessage = (e) => {
    e.preventDefault();

    if (newMessage.message.trim()) {
      dispatch(addProgressSharing(newMessage));
      setNewMessage({ user: "", message: "" });
    }
  };

  return (
    <div className="bg-orange-100 p-6 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold text-green-900">
        Progress Sharing
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="list-inside list-decimal mt-4">
        {messages.map((item, index) => (
          <li key={index} className="mb-2 p-2 border rounded-md">
            <strong className="text-green-900 font-semibold">
              {item.user}:
            </strong>{" "}
            {item.message}
          </li>
        ))}
      </ul>

      {/* Add new message form */}
      <form
        onSubmit={handleAddMessage}
        className="bg-orange-50 p-4 mt-4 rounded-md shadow-md"
      >
        <h3 className="text-2xl font-semibold text-green-900">
          Share your progress
        </h3>

        <input
          type="text"
          value={newMessage.user}
          onChange={(e) =>
            setNewMessage({ ...newMessage, user: e.target.value })
          }
          placeholder="Your Name"
          className="p-2 border rounded-md mr-2"
        />

        <input
          type="text"
          value={newMessage.message}
          onChange={(e) =>
            setNewMessage({ ...newMessage, message: e.target.value })
          }
          placeholder="Your Progress"
          className="p-2 border rounded-md mr-2"
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-green-900 text-gray-50 px-4 py-2 rounded-md font-semibold shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Share
        </button>
      </form>
    </div>
  );
}

export default ProgressSharing;
