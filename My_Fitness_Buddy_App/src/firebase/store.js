import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import profileReducer from "./profileSlice"
import buddyReducer from "./buddySlice"
import workoutReducer from "./workoutSlice"
import weeklyProgressReducer from "./weeklyProgressSlice";
import goalSettingReducer from "./goalSettingSlice";
import fitnessLibraryReducer from "./fitnessLibrary";
import progressSharingReducer from "./progressSharingSlice";


const store = configureStore({
	reducer:{
		auth:authReducer,
		profile:profileReducer,
		buddy:buddyReducer,
		workout:workoutReducer,
		weeklyProgress: weeklyProgressReducer,
    goalSetting: goalSettingReducer,
    fitnessLibrary: fitnessLibraryReducer,
    progressSharing: progressSharingReducer,

		
	}
})

export default store;
