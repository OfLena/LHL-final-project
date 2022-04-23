const router = require('express').Router();
const fileUpload = require('express-fileupload');

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {

    const recipes = "SELECT recipes.*, users.avatar AS avatar, users.user_name AS recipe_user_name FROM recipes JOIN users ON recipes.user_id = users.id";
    
    db.query(recipes).then(data => {
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

  router.post('/images', function(req, res) {
    let imgFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    imgFile = req.files.img;
   
    uploadPath = __dirname + '/../public/images/' + imgFile.name;
  
    // Use the mv() method to place the file 
    imgFile.mv(uploadPath, function(err) {
      console.log('uploadPath', uploadPath);
      
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });

  return router;
}


