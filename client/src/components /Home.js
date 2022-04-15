import "./styles/recipe.scss";

export default function Home(props) {
  
  const { recipes } = props;
  
  return (
    
    <div class="recipe-container">
      <ul class="recipe-card-list">
        {recipes}
      </ul>
    </div>
    
  );
}
