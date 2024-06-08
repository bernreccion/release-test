const Handlebars = require('handlebars')

// Define the eq helper
Handlebars.registerHelper('eq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });
  
module.exports = Handlebars;