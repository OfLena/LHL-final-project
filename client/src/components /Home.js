import "./styles/recipe.scss";

import RecipeListItem from "./RecipeListItem";
import Footer from "./Footer";

export default function Home(props) {

  const {user, currentPage, setCurrentPage} = props;

  const recipes = props.recipes.map(recipe => {
    return (
      <RecipeListItem
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      key={recipe.id}
      recipe_id={recipe.id}
      title={recipe.title}
      user_id={user.id}
      image_url={recipe.image_url}
      prep_time={recipe.prep_time}
      ingredient_1={recipe.ingredient_1}
      ingredient_2={recipe.ingredient_2}
      ingredient_3={recipe.ingredient_3}
      ingredient_4={recipe.ingredient_4}
      ingredient_5={recipe.ingredient_5}
      ingredient_6={recipe.ingredient_6}
      ingredient_7={recipe.ingredient_7}
      ingredient_8={recipe.ingredient_8}
      ingredient_9={recipe.ingredient_9}
      ingredient_10={recipe.ingredient_10}
      ingredient_11={recipe.ingredient_11}
      ingredient_12={recipe.ingredient_12}
      ingredient_13={recipe.ingredient_13}
      ingredient_14={recipe.ingredient_14}
      ingredient_15={recipe.ingredient_15}
      ingredient_16={recipe.ingredient_16}
      ingredient_17={recipe.ingredient_17}
      ingredient_18={recipe.ingredient_18}
      ingredient_19={recipe.ingredient_19}
      ingredient_20={recipe.ingredient_20}
      measurement_1={recipe.measurement_1}
      measurement_2={recipe.measurement_2}
      measurement_3={recipe.measurement_3}
      measurement_4={recipe.measurement_4}
      measurement_5={recipe.measurement_5}
      measurement_6={recipe.measurement_6}
      measurement_7={recipe.measurement_7}
      measurement_8={recipe.measurement_8}
      measurement_9={recipe.measurement_9}
      measurement_10={recipe.measurement_10}
      measurement_11={recipe.measurement_11}
      measurement_12={recipe.measurement_12}
      measurement_13={recipe.measurement_13}
      measurement_14={recipe.measurement_14}
      measurement_15={recipe.measurement_15}
      measurement_16={recipe.measurement_16}
      measurement_17={recipe.measurement_17}
      measurement_18={recipe.measurement_18}
      measurement_19={recipe.measurement_19}
      measurement_20={recipe.measurement_20}
      instruction_1={recipe.instruction_1}
      instruction_2={recipe.instruction_2}
      instruction_3={recipe.instruction_3}
      instruction_4={recipe.instruction_4}
      instruction_5={recipe.instruction_5}
      link={recipe.link}
      serving_size={recipe.serving_size}
      />
    );
  });

  return (
    
    <div className="recipe-container">
      <img className="cover-img" src="https://cdn.stocksnap.io/img-thumbs/960w/pizza-wine_IJESKJTYB6.jpg"></img>
      <div className="centered">Bring Out Your Inner Chef</div>
      <div className="recipe-card-container">
        {recipes}
      </div>
      <Footer/>
    </div>
    
  );
}
