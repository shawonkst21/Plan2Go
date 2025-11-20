import React from 'react'

async function trac(user_id, action, description) {
  await fetch("http://localhost:8080/users/activity/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: localStorage.getItem("user_id")|| null,
      action,
      description,
    }),
  });
}

export default trac