import Handlebars from 'handlebars'

Handlebars.registerHelper('eq', function(a: any, b: any, options: Handlebars.HelperOptions) {
    return (a == b) ? options.fn(this) : options.inverse(this);
});
