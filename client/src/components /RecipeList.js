



export default function RecipeList (props) {

  const { recipes } = props;
 
  return (
    <div>
      <ul>
      {recipes.map(recipe => <li>{recipe.title}</li>)}
       </ul>
    </div>
  )
}