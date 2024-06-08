import Handlebars from 'handlebars'

// Register the eq helper globally
Handlebars.registerHelper('eq', function (v1: any, v2: any, options: Handlebars.HelperOptions) {
    if (v1 === v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

export default Handlebars;