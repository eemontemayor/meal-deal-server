const express = require('express')
const bookMarksRouter= express.Router()
const jsonBodyParser= express.json()
const mealService = require('./meals-services')
const requireAuth = require('../middleware/jwt-auth')


bookMarksRouter
.get('/', requireAuth, jsonBodyParser,(req,res, next)=>{ 
  
    const user_id = req.user.id
    mealService.getBookmarks(
        req.app.get('db'),
        user_id
    )
    .then((meals) => {
        return res.json(meals.map(i => mealService.serializeMeal(i)))
    })
    .catch(next);
})
.post('/', requireAuth, jsonBodyParser, (req,res,next)=>{
    const newMeal = req.body;
    
    newMeal.user_id = req.user.id;

    mealService.insertBookmark(
        req.app.get('db'),
        newMeal
    )
    .then((meal) => { 
        
        return res.json(mealService.serializeMeal(meal))
    }) 
  
    .catch(next);
})
.delete('/', jsonBodyParser,(req,res,next)=>{
    let id = req.body.id
   console.log(id)
    mealService.deleteBookmark(
        req.app.get('db'),
        id
    )
    .then(meal =>{
        console.log(meal,'+++++++++++++++++++')
        res.status(204).end()
    })
    .catch(next)
    
})
module.exports=bookMarksRouter