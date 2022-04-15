const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const morgan = require('morgan');
const app = express();

// db connection
const db = require('./configs/db.config');
app.use(cors())
app.use(morgan('dev'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ------- Routes required -------

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const favsRouter = require('./routes/favs');
const commentsRouter = require('./routes/comments');
const recipeTagsRouter = require('./routes/recipe_tags');
const categoriesRouter = require('./routes/categories');
const tagsRouter = require('./routes/tags')




// ------- Routes Mounted -------

app.use('/', indexRouter);
app.use('/users', usersRouter(db));
app.use('/recipes', recipesRouter(db));
app.use('/recipe_tags', recipeTagsRouter(db));
app.use('/favs', favsRouter(db));
app.use('/comments', commentsRouter(db));
app.use('/categories', categoriesRouter(db));
app.use('/tags', tagsRouter(db));

module.exports = app;
