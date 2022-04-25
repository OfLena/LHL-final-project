import { useState, useEffect } from "react";

export default function Profile(props) {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <form>
      <h3>Sign in</h3>
      <div>
        <input type="text" placeholder="Enter username" />
      </div>
      <div>
        <input type="text" placeholder="Enter password" />
      </div>
      <div>
        <input type="button" value="Login" />{" "}
      </div>
    </form>
  );
}
