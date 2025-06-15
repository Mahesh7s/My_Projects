// src/components/dashboard/GoalSetting.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoals, saveGoal } from "../firebase/goalSettingSlice";

function GoalSetting() {
  const dispatch = useDispatch();
  const { goals, loading, error } = useSelector((state) => state.goalSetting);
  const { user } = useSelector((state) => state.auth);

  const [newGoal, setNewGoal] = useState('');
  
  useEffect(() => {
    if (user) {
      dispatch(fetchGoals(user.uid)); 
    }
  }, [user, dispatch]);

  const handleSave = () => {
    if (user && newGoal.trim()) {
      dispatch(saveGoal({ 
        uid: user.uid, 
        goal: newGoal.trim()
      }));

      setNewGoal('');
    }
  }

  return (
    <div className="bg-orange-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-green-900">Goal Setting</h2>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="bg-green-100 p-4 rounded-md mt-4">
        {goals.length > 0 ? (
          goals.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))
        ) : (
          <p>You've not set any goals yet</p>
        )}

      </ul>

      {/* Update goals form */}
      <div className="bg-orange-50 p-4 rounded-md mt-4">
        <h4>Set a new Goal</h4>
        <input
          className="p-2 border rounded mr-2"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Write your new fitness goal"
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-green-500 text-gray-50 font-semibold p-2 rounded-md ml-2 disabled:bg-gray-500 disabled:cursor-not-allowed">
          Save
        </button>
      </div>
    </div>
  )
}

export default GoalSetting;
