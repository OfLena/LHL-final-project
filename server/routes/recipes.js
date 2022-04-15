const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
   
    const recipes = "SELECT * FROM recipes";
    
    db.query(recipes).then(data => {
     
      res.json(data.rows);
    })
  
  });

  return router;
}