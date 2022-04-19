const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const favs = `SELECT users.id AS favs_user_id, recipes.id AS recipe_id, recipes.title AS title
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
    const insertFav = `INSERT INTO favs (${favKey}) VALUES (${favValue})`
    // console.log("IN POST ROUTE", req.body)
    // console.log("KEYS", favKey)
    // console.log("VALUES", favValue)
    // console.log("insertFav", insertFav)

    db.query(insertFav).then(data => {
      res.json(data.rows);
    })
  });

  router.post('/delete', (req, res) => {
    const favValue = Object.values(req.body)
    const deleteFav = `DELETE FROM favs WHERE recipe_id = (${favValue[0]}) AND user_id = (${favValue[1]})`
    // console.log("IN POST ROUTE", req.body)
    // console.log("KEYS", favKey)
    // console.log("VALUES", favValue)
    // console.log("insertFav", insertFav)

    db.query(deleteFav).then(data => {
      res.json(data.rows);
    })
  });

  return router;
}