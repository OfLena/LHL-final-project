import "./styles/recipe.scss";

import RecipeListItem from "./RecipeListItem";


export default function RecipeList (props) {
  
const recipes = props.recipes.map(recipe => {
  return (
    <RecipeListItem
    key={recipe.id}
    title={recipe.title}
    />
  );
});

  return (
    <div class="recipe-container">
      <ul class="recipe-card-list">
        {recipes}
      </ul>
    </div>
  )
}

