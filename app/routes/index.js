// routes/index.js

const formRoutes = require('./form_routes');
module.exports = function(app, db) {
  formRoutes(app, db);

  //Add any extra routes in this folder and put them here after requiring
};
