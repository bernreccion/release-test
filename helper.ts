import Handlebars from 'handlebars'

// Define the signature for the equality helper
type EqualityHelper = (v1: any, v2: any, options: Handlebars.HelperOptions) => any;

// Register the equality helper globally
Handlebars.registerHelper('eq', function(v1: any, v2: any, options: Handlebars.HelperOptions) {
  if (v1 === v2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
} as EqualityHelper); // Type assertion to ensure the function matches the helper signature

export default Handlebars;