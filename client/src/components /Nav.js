import "./styles/nav.scss";

import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/recipes">Recipes</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/recipe_list_item">RecipeListItem</Link>
        </li>
      </ul>
    </nav>
  );
}
