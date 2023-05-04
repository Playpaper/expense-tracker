const Handlebars = require('handlebars')

Handlebars.registerHelper("category", function (selectedValue, valueName) {
  return (String(selectedValue) === String(valueName)) ? "selected" : ""
})