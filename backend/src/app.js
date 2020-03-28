const express = require('express');

const routes = require('./routes');

const { errors } = require('celebrate');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);
app.use(errors());

/**
 * HTTP METHOS
 * 
 * GET : to get info from the back-end
 * POST: to create info in the back-end
 * PUT : to change info in the back-end
 * DELETE: to delete info in the back-end
 */

 /**
  * Prameter Types
  * 
  * Query Params: named Params sent on route after the "?" (Filters, pagination)
  * Route Params: utilized to identify resources
  * Request Body: the body of the quest, used to create or change resources
  */

  /**
   * SQL : MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
   * NoSQL: MongoDB, CouchDB
   */


 
module.exports = app;
