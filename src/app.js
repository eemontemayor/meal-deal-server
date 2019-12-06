require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {CLIENT_ORIGIN} = require('./config');
const { NODE_ENV } = require('./config')
const AuthRouter = require('./auth/auth-router');
const mealsRouter = require('./meals/meals-router')
const bookMarksRouter = require('./meals/bookmarks-router')
const shoppingListRouter =require('./shopping-list/shopping-list-router')
const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(
  cors({
    origin: CLIENT_ORIGIN
})
);
app.use(helmet())

app.use('/api/auth', AuthRouter);
app.use('/api/meals', mealsRouter);
app.use('/api/bookmarks', bookMarksRouter);
app.use('/api/shoppinglist', shoppingListRouter)

 app.get('/', (req, res) => {
       res.send('Hello, world!')
     })

 app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
     response = { error: { message: 'server error' } }
   } else {
     console.error(error)
     response = { message: error.message, error }
   }
   res.status(500).json(response)
 })
     

module.exports = app