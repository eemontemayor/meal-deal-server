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


        
    getMeals(db, user_id){
        return db.select('*').from('meal').where({user_id});
        }, 

    getMealsByDate(db, user_id, on_day){
        console.log('^^^^^^^^^^^^^HERE^^^^^^^^^^^^^^^')
        return db.select('*').from('meal').where({user_id}).where({on_day});
        }, 



    deleteMeal(db, id){
        
        
        return db('meal')
        .where({id})
        .delete() 
    },   




    serializeMeal(meal){
        return {
            id: meal.id,
            meal_name: meal.meal_name,
            ingredients: meal.ingredients,
            on_day: meal.on_day,
            user_id: meal.user_id
        }
    },

}
module.exports = mealService