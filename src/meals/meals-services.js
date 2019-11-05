const mealService = {
    
    insertMeal(db, newMeal){
        return db
        .insert(newMeal)
        .into('meal')
        .returning('*')
        .then(meal=> {
            return meal  
        })
    },

    deleteMeal(db, id){
        return db('meal')
        // .where({user_id})
        .where({id})
        .delete() 
    },   


        
    getMeals(db, user_id){
        return db.select('*').from('meal').where({user_id});
    }, 

    getMealsByDate(db, user_id, on_day){
        return db.select('*').from('meal').where({user_id}).where({on_day});
    }, 
    getMealById(db, user_id, id){
        return db.select('*').from('meal').where({user_id}).where({id});
    }, 




    //============BOOKMARK CRUD OPS===========

    getBookmarks(db,user_id){
        return db.select('*').from('bookmark').where({user_id})
    },
    getBookmarkById(db, user_id, id){
        return db.select('*').from('bookmark').where({user_id}).where({id});
    }, 

    insertBookmark(db, newMeal){
        return db
        .insert(newMeal)
        .into('bookmark')
        .returning('*')
        .then(meal=> {
            return meal  
        })
    },

  
    deleteBookmark(db, id){
        return db('bookmark')
        .where({id})
        .delete() 
    },  
    updateMeal(db, id, newMealFields){
        return db('meal')
        .where({id})
        .update(newMealFields)
    },
    updateBookMark(db, id, newMealFields){
        return db('bookmark')
        .where({id})
        .update(newMealFields,returning=true)
        .returning('*')
    },
    serializeMeal(meal){
        return {
            id: meal.id,
            meal_name: meal.meal_name,
            ingredients: meal.ingredients,
            instructions:meal.instructions,
            image:meal.image,
            on_day: meal.on_day,
            user_id: meal.user_id
        }
    },

}
module.exports = mealService