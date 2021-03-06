'use strict';

const express = require('express')
const mealsRouter= express.Router()
const jsonBodyParser= express.json()
const mealService = require('./meals-services')
const requireAuth = require('../middleware/jwt-auth')
const path = require('path')
const cookie = require('cookie');
const axios = require('axios');
const config = require('../config');
mealsRouter
  .get('/', requireAuth, jsonBodyParser,(req,res, next)=>{ 
  
    const user_id = req.user.id
  
    mealService.getMeals(
      req.app.get('db'),
      user_id
    )
      .then((meals) => {
        return res
          .status(200)
          .json(meals.map(i => mealService.serializeMeal(i)))
      })
      .catch(next);
  })


  .delete('/', jsonBodyParser,(req,res,next)=>{
    let id = req.body.id
    console.log(id,'--------')
    mealService.deleteMeal(
      req.app.get('db'),
      id
    )
      .then(meal =>{
        res
          .status(204)
          .end()
      })
      .catch(next)
    
  
  })

mealsRouter
  .get('/explore/:meal', requireAuth, jsonBodyParser,(req,res, next)=>{ 
    console.log(req.params.meal,'<------------')
    const user_id = req.user.id

    axios.get(`https://api.edamam.com/search?q=${req.params.meal}&app_id=${config.APP_ID}&app_key=${config.API_KEY}`, {
      headers: {
        'Accept-Encoding': 'gzip',
        // 'Set-Cookie':  'SameSite=None',
      }
    
    })
   
      .then((meals) => {
        // console.log(meals.data.hits)
        // res.cookie('cross-site-cookie', 'bar', { sameSite: 'none', secure: true })
        return res
          .cookie('cross-site-cookie', 'bar', { 'SameSite': 'none', secure: true })
        
          .status(200)
        // .json(meals.map(i => mealService.serializeMeal(i)))
          .json(meals.data.hits)
      })
      .catch(next);
  })
//=====================================================

mealsRouter
  .get('/:date', requireAuth, jsonBodyParser,(req,res, next)=>{ 
  
    const on_day=req.params.date
    const user_id = req.user.id

    mealService.getMealsByDate(
      req.app.get('db'),
      user_id,
      on_day
    )
      .then((meals) => {
        
        return res
          .status(200)
          .json(meals.map(i => mealService.serializeMeal(i)))
      })
      .catch(next);
  })

mealsRouter
  .get('/:date/:meal_id', requireAuth, jsonBodyParser , (req,res,next)=>{
    
    const id=req.params.meal_id
    const user_id = req.user.id
    mealService.getMealById(
      req.app.get('db'),
      user_id,
      id
    )
      .then((meals) => {
        
        return res
          .status(200)
          .json(meals.map(i => mealService.serializeMeal(i)))
      })
      .catch(next);
  })

  .patch('/:meal_id', requireAuth, jsonBodyParser, (req,res,next)=>{
    const user_id = req.user.id
    const {meal}= req.body
    const id= req.body.id
    const updatedMeal = { meal }

    const numberOfValues = Object.values(updatedMeal).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'title', 'style' or 'content'`
        }
      })
    }

    mealService.updateMeal(
      req.app.get('db'),
      id,
      updatedMeal
    )
    then(meal => {
      res.status(200).json(serializeTodo(meal[0]))
    })

      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)

  })


mealsRouter
  .post('/:date', requireAuth, jsonBodyParser, (req,res,next)=>{
   
    const newMeal = req.body;
    newMeal.on_day=req.params.date
    newMeal.user_id = req.user.id;
    const user_id = req.user.id

    console.log(newMeal)
    mealService.insertMeal(
      req.app.get('db'),
      newMeal,
      user_id
     
    )
      .then((meal) => { 
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${meal.id}`))
          .json(mealService.serializeMeal(meal))
      }) 
  
      .catch(next);
  })


module.exports = mealsRouter
