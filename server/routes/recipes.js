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
    // Object.keys(obj)
     // Object.values(obj)
    // Object.entries(obj)

    // insert (...keys) into recipes VALUES (...values)

    console.log(Object.entries(req.body), )
    console.log('HERE');
    
  
  });

  return router;
}