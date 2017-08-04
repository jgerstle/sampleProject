function requireAll(r) { r.keys().forEach(r); }

//js files
require('../../node_modules/angular/angular.js');
require('../../node_modules/angular-ui-router/release/angular-ui-router.js');
require('../../node_modules/angular-animate/angular-animate.js');
require('../../node_modules/angular-aria/angular-aria.js');
require('../../node_modules/angular-material/angular-material.js');
require('../../node_modules/angular-ui-grid/ui-grid.js');
require('../../node_modules/angular-ui-grid/ui-grid.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css')
require('./extensions/bootstrap-ui-grid.css');
requireAll(require.context('./', true, /Module\.js$/));
requireAll(require.context('./', true, /\.js$/));


//css files
require('../../node_modules/angular-material/angular-material.css')
require('./app.css')