const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const favs = `SELECT users.id AS favs_user_id, recipes.*
    FROM recipes 
    JOIN favs ON recipes.id = favs.recipe_id 
    JOIN users ON users.id = favs.user_id 
    WHERE favs.user_id = 1;`;
    
    db.query(favs).then(data => {
      res.json(data.rows);
    })
  });

  return router;
}