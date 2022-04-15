const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const command_0 = "SELECT * FROM users";
    const command_1 = "SELECT * FROM recipes";
    const command_2 = "SELECT * FROM tags";
    const command_3 = "SELECT * FROM categories";
    const command_4 = "SELECT * FROM favs";
    const command_5 = "SELECT * FROM recipe_tags";
    db.query(command_1).then(data => {
     
      res.json(data.rows);
    })
    // db.query(command_1).then(data => {
    //   console.log('RECIPES-->');
    //   res.json(data.rows);
    // })
    // db.query(command_2).then(data => {
    //   console.log('TAGS-->');
    //   res.json(data.rows);
    // })
    // db.query(command_3).then(data => {
    //   console.log('CATEGORIES-->');
    //   res.json(data.rows);
    // })
    // db.query(command_4).then(data => {
    //   console.log('FAVS-->');
    //   res.json(data.rows);
    // })
    // db.query(command_5).then(data => {
    //   console.log('RECIPE_TAGS-->');
    //   res.json(data.rows);
    // })
  });

  return router;
}