const ShoppingListService = {
    getAllItems(knex) {
      return knex
        .select('*')
        .from('shopping_list')
    },
    getById(knex, id) {
      return knex
       .from('shopping_list')
       .select('*')
       .where('id', id)
       .first()
    },
    deleteItem(knex, id) {
      return knex('shopping_list')
        .where({ id })
        .delete()
    },
    updateItem(knex, id, newItemFields) {
      return knex('shopping_list')
        .where({ id })
        .update(newItemFields)
    },
    insertItem(knex, newItem) {
      return knex
        .insert(newItem)
        .into('shopping_list')
        .returning('*')
        .then(rows => rows[0])
    },

    serializeItem(item){
      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^')
        return{
            id:item.id,
            name:item.name,
            date_added:item.date_added,
            checked:item.checked,
            user_id:item.user_id,
        }
    }
  }
  
  module.exports = ShoppingListService