const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
 
const routes = express.Router();

//route to login
routes.post('/sessions', SessionController.create);
//route to get ong names
routes.get('/ongs', OngController.index);
//route to create a ONG (create account)
routes.post('/ongs', OngController.create);
//route to get profile info
routes.get('/profile', ProfileController.index);
//route to get a incidents
routes.get('/incidents', IncidentController.index);
//route to create a new incident
routes.post('/incidents', IncidentController.create);
//route to delete a incident
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;