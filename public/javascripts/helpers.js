const Handlebars = require('handlebars')

Handlebars.registerHelper("category", function (selectedValue, valueName) {
  return (selectedValue === valueName) ? "selected" : ""
})