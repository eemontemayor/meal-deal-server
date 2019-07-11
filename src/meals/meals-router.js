const express = require('express')
const mealsRouter= express.Router()
const jsonBodyParser= express.json()
const mealService = require('./meals-services')
const {requireAuth} = require('../middleware/jwt-auth')


mealsRouter
// .post('/',requireAuth, jsonBodyParser, (req,res,next)=>{
   
//     const newMeal = req.body;
//     newMeal.user_id = req.user.id;
    
//     mealService.insertMeal(
//         req.app.get('db'),
//         newMeal
//     )
//     .then((meal) => { 
//         return mealService.serializeMeal(meal[0])
//     }) 
//     .then(meal =>{
//           // HOW DO I SEND THIS ID BACK TO FRONT END????????????
//         return res.status(201).json(meal)              // .location(`/meals/${meal.id}`)
//     })
//     .catch(next);
// })

.get('/', jsonBodyParser,(req,res, next)=>{ 
  
    const user_id = req.user_id
    console.log(user_id)
    mealService.getMeals(
        req.app.get('db'),
        user_id
    )
    .then((meals) => {
        return res.json(meals.map(i => mealService.serializeMeal(i)))
    })
    .catch(next);
})



// .delete('/', jsonBodyParser,(req,res,next)=>{
//     let id = req.body.id
    
//     mealService.deleteMeal(
//         req.app.get('db'),
//         id
//     )
//     .then(meal =>{
//         res.status(204).end()
//     })
//     .catch(next)
    
  
// })


module.exports = mealsRouter
