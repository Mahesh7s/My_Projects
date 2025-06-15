import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { matchBuddies } from "../firebase/buddySlice"

function Buddies() {
  const { matchingBuddies, loading, error } = useSelector((state) => state.buddy);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(matchBuddies(user.uid));
    }
  }, [user, dispatch]);

  if (loading) return <p>Finding matching buddies...</p>;
  if (error) return <p>Error matching buddies: {error}</p>;
  
  return (
    <div className="bg-green-100 p-4 rounded-md shadow-md mt-4">
      <h2 className="text-2xl font-semibold">Buddy Matches</h2>
      <ul className="list-inside-list-item mt-2">
        {matchingBuddies.map((buddy) => (
          <li key={buddy.uid}>
            <strong>{buddy.name}</strong> — Location: {buddy.location} — Goals: {buddy.goals}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Buddies;

