/*
Login Flow:

1. App should check local storage 
- If user object exists, then set value of current user state to local storage user  
- If state is empty, we assume no user is logged in 
2. If user is logged in, we can 

Profile Page
- If user is logged in, show the right info
- If not logged in, rediret to login? (conditional rendering)

Login Page
- User inputs username and password
- Send request to server (to verify info is correct)
- If correct, return valid user object (user id, email, username etc.)
- Store in local storage
- Set user state to that user object
*/

import { useState, useEffect } from 'react';

export default function Profile (props) {

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  return (
    <form>
      <h3>Sign in</h3>
      <div><input type="text" placeholder="Enter username"/></div>
      <div><input type="text" placeholder="Enter password"/></div>
      <div><input type="button" value="Login"/> </div>
    </form>  
  )
}