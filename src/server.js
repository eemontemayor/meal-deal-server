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

