const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
   
    const recipe_tags = "SELECT * FROM recipe_tags";
    
    db.query(recipe_tags).then(data => {
     
      res.json(data.rows);
    })
  
  });

  return router;
}