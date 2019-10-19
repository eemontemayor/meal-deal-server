const express = require('express')
const mealsRouter= express.Router()
const jsonBodyParser= express.json()
const mealService = require('./meals-services')
const requireAuth = require('../middleware/jwt-auth')
const path = require('path')

mealsRouter
.post('/', requireAuth, jsonBodyParser, (req,res,next)=>{
   
    const newMeal = req.body;
    
    newMeal.user_id = req.user.id;
  

    console.log(newMeal)
    mealService.insertMeal(
        req.app.get('db'),
        newMeal
    )
    .then((meal) => { 
        res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${meal.id}`))
            .json(mealService.serializeMeal(i))
    }) 
  
    .catch(next);
})

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


//TODO = RESTFUL
// mealsRouter
// .delete('/:date/:meal_id', jsonBodyParser,(req,res,next)=>{
//     const id = req.params.meal_id
//     mealService.deleteMeal(
//         req.app.get('db'),
//         id
//     )
//     .then(meal =>{
//         res
//             .status(204)
//             .end()
//     })
//     .catch(next)
// })

// .post('/:date', requireAuth, jsonBodyParser, (req,res,next)=>{
   
//     const newMeal = req.body;
    
//     newMeal.user_id = req.user.id;
  

//     console.log(newMeal)
//     mealService.insertMeal(
//         req.app.get('db'),
//         newMeal
//     )
//     .then((meal) => { 
//         res
//             .status(201)
//             .location(path.posix.join(req.originalUrl, `/${meal.id}`))
//             .json(mealService.serializeMeal(i))
//     }) 
  
//     .catch(next);
// })

module.exports = mealsRouter
