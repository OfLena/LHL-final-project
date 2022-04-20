const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const favs = `SELECT users.id AS favs_user_id, recipes.id AS recipe_id, recipes.title AS title, recipes.image_url, users.user_name
    FROM recipes 
    JOIN favs ON recipes.id = favs.recipe_id 
    JOIN users ON users.id = favs.user_id 
    WHERE favs.user_id = 1;`;
    
    db.query(favs).then(data => {
      res.json(data.rows);
    })
  });

  router.post('/', (req, res) => {
    const favKey = Object.keys(req.body)
    const favValue = Object.values(req.body)
    const wrappedValues = favValue.map((elem) => `'${elem}'`)
    const insertFav = `INSERT INTO favs (${favKey}) VALUES (${wrappedValues})`

    db.query(insertFav).then(data => {
      res.json(data.rows);
    })
  });

  router.post('/delete', (req, res) => {
    const favValue = Object.values(req.body)
    const wrappedValues = favValue.map((elem) => `'${elem}'`)
    const deleteFav = `DELETE FROM favs WHERE recipe_id = (${wrappedValues[0]}) AND user_id = (${wrappedValues[1]})`

    db.query(deleteFav).then(data => {
      res.json(data.rows);
    })
  });

  return router;
}