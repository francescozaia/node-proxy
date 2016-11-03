module.exports = (app) => {
  const routesController = require('./routes-controller');
  app.get('/', routesController.homepage);
  app.get('/street', routesController.getStreets);
  app.get('/street/:id', routesController.getStreet);
}
