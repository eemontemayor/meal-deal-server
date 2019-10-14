'use strict';

const app = require('./app');
const knex = require('knex');
const { PORT, DB_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DB_URL
  
});

app.set('db', db);

app.listen(PORT, () => {
  
  // console.log('Db URL: ', DB_URL);
  console.log('Database URL: ', DB_URL);
  console.log(`Server listening at http://localhost:${PORT}`);
});

function searchByItemName(searchTerm) {
  db
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log('SEARCH TERM', { searchTerm })
      console.log(result)
    })
}

// searchByItemName('urger')

function paginateItems(page) {
  const limit = 6
  const offset = limit * (page - 1)
  db
    .select('*')
    .from('shopping_list')
    .limit(limit)
    .offset(offset)
    .then(result => {
      console.log('PAGINATE ITEMS', { page })
      console.log(result)
    })
}

paginateItems(2)

function productsAddedDaysAgo(daysAgo) {
  db
    .select('id', 'name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      db.raw(`now() - '?? days':: INTERVAL`, daysAgo)
    )
    .then(results => {
      console.log('PRODUCTS ADDED DAYS AGO')
      console.log(results)
    })
}

// productsAddedDaysAgo(5)

function costPerCategory() {
  db
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log('COST PER CATEGORY')
      console.log(result)
    })
}
