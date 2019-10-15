const express = require('express')
const shoppingListRouter= express.Router()
const jsonBodyParser= express.json()
const ShoppingListService = require('./shopping-list-service')
const requireAuth = require('../middleware/jwt-auth')

shoppingListRouter
.get('/', requireAuth, jsonBodyParser,(req,res, next)=>{
    const user_id = req.user.id
   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%13')
    ShoppingListService.getAllItems(
        req.app.get('db'),
        user_id
    )
    .then((items) =>{
        console.log(items,'<<<<<<<<<<<<<')
        // return res.json(items)

        return res.json(items.map(i => ShoppingListService.serializeItem(i)))
    })  
    .catch(next);
})    


.post('/',requireAuth,jsonBodyParser,(req,res, next)=>{


    

    const item = req.body
    item.user_id=req.user.id

    ShoppingListService.insertItem(
        req.app.get('db'),
        item
    )
    .then((item) =>{
        return res.json(item)
            // .map(i => ShoppingListService.serializeItem(i)))
        
    })
    .catch(next);
})
.delete('/', jsonBodyParser,(req,res,next)=>{
    let id = req.body.id
   
    ShoppingListService.deleteItem(
        req.app.get('db'),
        id
    )
    .then(item =>{
        res.status(204).end()
    })
    .catch(next)
    
  
})
module.exports= shoppingListRouter
