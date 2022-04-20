const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {

    const recipes = "SELECT * FROM recipes";
    
    db.query(recipes).then(data => {
     
      res.json(data.rows);
    })
  
  });

  router.get('/:id', (req, res) => {

    const recipes = "SELECT * FROM recipes WHERE user_id = $1";
    
    db.query(recipes, [req.params.id]).then(data => {
     
      res.json(data.rows);
    })
  
  });

  router.post('/', (req, res) => {

    const recipeKeys = Object.keys(req.body)
    const recipeValues = Object.values(req.body)
    const wrappedValues = recipeValues.map((elem) => `'${elem}'`)

    const insertRecipes = `INSERT INTO recipes (${recipeKeys}) VALUES (${wrappedValues})`  

    db.query(insertRecipes).then(data => {
     
      res.json(data.rows);
    })
  
  });

  router.post('/delete', (req,res) => {
    
    const recipeValue = Object.values(req.body)
    const wrappedValues = recipeValue.map((elem) => `'${elem}'`)
    const deleteRecipe = `DELETE FROM recipes WHERE id = (${wrappedValues[0]}) AND user_id = (${wrappedValues[1]})`

    db.query(deleteRecipe).then(data => {
      res.json(data.rows);
    })

  })

  return router;
}