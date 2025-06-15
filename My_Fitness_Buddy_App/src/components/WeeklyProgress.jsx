// src/components/dashboard/WeeklyProgress.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeeklyProgress, saveWeeklyProgress } from "../firebase/weeklyProgressSlice"

function WeeklyProgress() {
  const dispatch = useDispatch();
  const { progress, loading, error } = useSelector((state) => state.weeklyProgress);
  const { user } = useSelector((state) => state.auth);
  
  const [workouts, setWorkouts] = useState('');
  const [calories, setCalories] = useState('');
  const [goals, setGoals] = useState('');
  
  useEffect(() => {
    if (user) {
      dispatch(fetchWeeklyProgress(user.uid)); 
    }
  }, [user, dispatch]);

  const handleSave = () => {
    if (user) {
      dispatch(saveWeeklyProgress({ 
        uid: user.uid, 
        workouts, 
        calories, 
        goals 
      }));

      setWorkouts('');
      setCalories('');
      setGoals('');
    }
  }

  return (
    <div className="bg-orange-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-green-900">Weekly Progress</h2>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      {progress ? (
        <div className="bg-green-100 p-4 rounded-md mt-4">
          <h3>Your progress this week</h3>
          <p>Workouts: {progress.workouts}</p>
          <p>Calories burned: {progress.calories}</p>
          <p>Goals: {progress.goals}</p>
        </div>
      ) : (
        <p>No progress yet</p>
      )}

      {/* Update progress form */}
      <div className="bg-orange-50 p-4 rounded-md mt-4">
        <h4>Add or Update Your Weekly Progress</h4>
        <input
          className="p-2 border rounded mr-2"
          value={workouts}
          onChange={(e) => setWorkouts(e.target.value)}
          placeholder="Workouts"
        />
        <input
          className="p-2 border rounded mr-2"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories"
        />
        <input
          className="p-2 border rounded mr-2"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="Goals"
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

export default WeeklyProgress;
