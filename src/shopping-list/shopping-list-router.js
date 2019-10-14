const requireAuth = require('../middleware/jwt-auth')
const jsonBodyParser= express.json()
const express = require('express')
const shoppingListRouter= express.Router()
const ShoppingListService = require('./shopping-list-service')

shoppingListRouter
.get('/', requireAuth, jsonBodyParser,(req,res, next)=>{
    const user_id = req.user.id

    ShoppingListService.getAllItems(
        req.app.get('db'),
        user_id
    )
    .then(res => {
        console.log(res)
    })
    .catch(next);
})    


.post('/', requireAuth, jsonBodyParser,(req,res, next)=>{

    const item = req.body
    item.user_id=req.user.id

    ShoppingListService.insertItem(
        req.app.get('db'),
        item
    )
    .then(res=>{
        console.log(res)
    })
    .catch(next);
} )
module.exports = shoppingListRouter



