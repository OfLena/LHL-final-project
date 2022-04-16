import "./styles/nav.scss";



import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <div class="navbar">
      <div class="home-link">
      <Link to="/">Home</Link>
      </div>
      <p class="project-name">PotLuck</p>
      <div class="dropdown">
        <button class="dropbtn">Dropdown
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <Link to="/profile">Profile</Link>
          <Link to="/recipe_form">Recipe Form</Link>
        </div>
      </div>
    </div>
  );
}
