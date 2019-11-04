const express = require('express')
const bookMarksRouter= express.Router()
const jsonBodyParser= express.json()
const mealService = require('./meals-services')
const requireAuth = require('../middleware/jwt-auth')
const path = require('path')


bookMarksRouter
.get('/', requireAuth, jsonBodyParser,(req,res, next)=>{ 
  
    const user_id = req.user.id
    mealService.getBookmarks(
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



.post('/', requireAuth, jsonBodyParser, (req,res,next)=>{
    const newMeal = req.body;
    
    newMeal.user_id = req.user.id;

    mealService.insertBookmark(
        req.app.get('db'),
        newMeal
    )
    .then((bm) => { 
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${bm.id}`))
            .json(mealService.serializeMeal(bm))
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
    .then(bm =>{
        res
            .status(204)
            .end()
    })
    .catch(next)
    
})

bookMarksRouter
.get('/:bookmark_id', requireAuth, jsonBodyParser , (req,res,next)=>{
    console.log('get bookmark by id <=++++====++++')
    const id=req.params.bookmark_id
    const user_id = req.user.id
    mealService.getBookmarkById(
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
//TODO = RESTFUL
// bookMarksRouter
// .delete('/:bookmark_id', jsonBodyParser,(req,res,next)=>{
//     const id = req.params.bookmark_id
//     mealService.deleteMeal(
//         req.app.get('db'),
//         id
//     )
//     .then(bm =>{
//         res.status(204).end()
//     })
//     .catch(next)
// })
module.exports=bookMarksRouter