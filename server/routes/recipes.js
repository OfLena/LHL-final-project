const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
   
    const command_1 = "SELECT * FROM recipes";
    
    db.query(command_1).then(data => {
     
      res.json(data.rows);
    })
  
  });

  return router;
}