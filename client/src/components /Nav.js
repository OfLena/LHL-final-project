import "./styles/nav.scss";



import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/recipe_list_item">RecipeListItem</Link>
        </li>
        <li>
          <Link to="/recipe_form">Recipe Form</Link>
        </li>
      </ul>
    </nav>
    
  );
}
