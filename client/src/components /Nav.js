import "./styles/nav.scss";



import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <div class="navbar">
      <Link to="/recipes">Home</Link>
      <Link to="/profile">Profile</Link>
      <div class="dropdown">
        <button class="dropbtn">Dropdown
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <Link to="/recipe_form">Recipe Form</Link>
        </div>
      </div>
    </div>
  );
}
