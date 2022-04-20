const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
   
    const comments = "SELECT * FROM comments";

    db.query(comments).then(data => {
     
      res.json(data.rows);
    })
  });

  router.post('/', (req, res) => {
    const commentKey = Object.keys(req.body)
    console.log('COMMENT KEY---->', commentKey)
    const commentValue = Object.values(req.body)
    console.log('COMMENT VALUES--->', commentValue)
    const wrappedValues = commentValue.map((elem) => `'${elem}'`)
    const insertComment = `INSERT INTO comments (${commentKey}) VALUES (${wrappedValues})`
    
  
    db.query(insertComment).then(data => {
      res.json(data.rows);
  })
});

  return router;
}