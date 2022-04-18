import "./styles/recipe.scss";

import RecipeListItem from "./RecipeListItem";


export default function RecipeList (props) {
  console.log('FILTERED', props.filtered_recipes);
  
const recipes = props.filtered_recipes.map(recipe => {
  return (
    <RecipeListItem
    key={recipe.id}
    title={recipe.title}
    />
  );
});

  return (
    <div>hello</div>
  )
}

