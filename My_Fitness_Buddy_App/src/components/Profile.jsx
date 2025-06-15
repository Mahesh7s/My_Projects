import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProfile, saveProfile } from "../firebase/profileSlice";

import { toast } from "react-toastify";


function Profile() {

	let dispatch =useDispatch()
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);

  const [tempProfile, setTempProfile] = useState({ name: "", location: "", preferredWorkouts: [], goals: '' });
  const [errors, setErrors] = useState({});

// Validation
  const validate = () => {
    let newErrors = {};

    if (!tempProfile.name.trim()) newErrors.name = "Name is required.";
    if (!tempProfile.location.trim()) newErrors.location = "Location is required.";
    if (!tempProfile.goals.trim()) newErrors.goals = "Fitness goals are required.";
    if (tempProfile.preferredWorkouts.length === 0) newErrors.preferredWorkouts = "Preferred workouts are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (user) {
      try {
        await dispatch(saveProfile({ uid: user.uid, profile: tempProfile })).unwrap();

        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update profile!");
      }
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile(user.uid));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (profile) {
      setTempProfile(profile);
    }
  }, [profile]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-md m-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Edit Your Profile</h2>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div>
          <label htmlFor="profile-name" className="block font-semibold text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="profile-name"
            className="p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition transform hover:shadow-md hover:bg-gray-100 text-gray-900"
            type="text"
            value={tempProfile.name}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, name: e.target.value })
            }
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="profile-location" className="block font-semibold text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="profile-location"
            className="p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition transform hover:shadow-md hover:bg-gray-100 text-gray-900"
            type="text"
            value={tempProfile.location}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, location: e.target.value })
            }
            placeholder="Enter your location"
          />
          {errors.location && <p className="text-red-500 mt-1 text-sm">{errors.location}</p>}
        </div>

        <div>
          <label htmlFor="profile-goals" className="block font-semibold text-gray-700 mb-1">
            Fitness Goals <span className="text-red-500">*</span>
          </label>
          <input
            id="profile-goals"
            className="p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition transform hover:shadow-md hover:bg-gray-100 text-gray-900"
            type="text"
            value={tempProfile.goals}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, goals: e.target.value })
            }
            placeholder='Weightloss, muscle gaining, or other goals'
          />
          {errors.goals && <p className="text-red-500 mt-1 text-sm">{errors.goals}</p>}
        </div>

        <div>
          <label htmlFor="profile-preferredWorkouts" className="block font-semibold text-gray-700 mb-1">
            Preferred Workouts <span className="text-red-500">*</span>
          </label>
          <input
            id="profile-preferredWorkouts"
            className="p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition transform hover:shadow-md hover:bg-gray-100 text-gray-900"
            type="text"
            value={(tempProfile.preferredWorkouts || []).join(", ")}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, preferredWorkouts: e.target.value.split(",") })
            }
            placeholder='E.g.: Yoga, Cardio, Swimming'
          />
          {errors.preferredWorkouts && <p className="text-red-500 mt-1 text-sm">{errors.preferredWorkouts}</p>}
        </div>

        <button
          disabled={Object.keys(errors).length > 0}
          type="submit"
          className="bg-orange-500 disabled:bg-gray-500 hover:bg-orange-600 disabled:cursor-auto text-gray-50 font-semibold p-2 rounded-md mt-6 w-full transform transition transform hover:scale-105">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;

