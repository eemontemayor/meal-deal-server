const requireAuth = require('../middleware/jwt-auth')
const jsonBodyParser= express.json()
const express = require('express')
const shoppingListRouter= express.Router()
const ShoppingListService = require('./shopping-list-service')

shoppingListRouter
.get('/', requireAuth, jsonBodyParser,(req,res, next)=>{


    ShoppingListService.getAllItems
    .then(res => {
        console.log(res)
    })

 })