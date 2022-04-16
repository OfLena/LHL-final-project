import "./styles/recipe.scss";

import RecipeListItem from "./RecipeListItem";

export default function Home(props) {
  
console.log('PROPS -->', props.recipes)

  const recipes = props.recipes.map(recipe => {
    return (
      <RecipeListItem
      key={recipe.id}
      title={recipe.title}
      image_url={recipe.image_url}
      prep_time={recipe.prep_time}
      />
    );
  });

  return (
    
    <div class="recipe-container">
      <img class="cover-img" src="https://cdn.stocksnap.io/img-thumbs/960w/pizza-wine_IJESKJTYB6.jpg"></img>
      <div class="search-bar"><input type="text" placeholder="Search.."></input></div>
      <div class="centered">Bring Out Your Inner Chef</div>
      <div class="recipe-card-list-item">
        {recipes}
      </div>
    </div>
    
  );
}
