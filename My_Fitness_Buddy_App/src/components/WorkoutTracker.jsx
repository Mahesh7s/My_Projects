import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addWorkout, fetchWorkouts } from "../firebase/workoutSlice"

function WorkoutTracker() {
  const [workout, setWorkout] = useState({ 
    activity: '',
    duration: '',
    caloriesBurned: '' 
  });

  const { workouts, loading, error } = useSelector((state) => state.workout);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchWorkouts(user.uid));
    }
  }, [user, dispatch]);

  const handleAddWorkout = (e) => {
    e.preventDefault();

    if (workout.activity && workout.duration) {
      dispatch(addWorkout(workout));
      setWorkout({ activity: '', duration: '', caloriesBurned: '' });
    }
  };

  return (
    <div className="bg-orange-100 p-4 rounded-md shadow-md mt-4">
      <h2 className="text-2xl font-semibold">Workout Tracker</h2>

      <form onSubmit={handleAddWorkout} className="mb-4">
        <input
          className="p-2 mr-2 rounded-md border border-gray-300"
          type="text"
          value={workout.activity}
          onChange={(e) =>
            setWorkout((prev) => ({
              ...prev,
              activity: e.target.value,
            }))
          }
          placeholder="Activity"
        /><input
          className="p-2 mr-2 rounded-md border border-gray-300"
          type="number"
          value={workout.duration}
          onChange={(e) =>
            setWorkout((prev) => ({
              ...prev,
              duration: e.target.value,
            }))
          }
          placeholder="Duration (minutes)"
        /><input
          className="p-2 mr-2 rounded-md border border-gray-300"
          type="number"
          value={workout.caloriesBurned}
          onChange={(e) =>
            setWorkout((prev) => ({
              ...prev,
              caloriesBurned: e.target.value,
            }))
          }
          placeholder="Calories burned"
        /><button
          className="bg-green-500 text-gray-50 px-4 py-2 rounded-md font-semibold mr-2"
          disabled={loading}
        >
          {loading ? "Adding…" : "Add Workout"}
        </button>
      </form>

      {error && <p className="text-red-500">Error: {error}</p>}

      <ul>
        {workouts.map((item) => (
          <li key={item.id}>
            {item.activity} — {item.duration} minutes — {item.caloriesBurned} calories
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutTracker;

