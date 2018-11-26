var _ = require("lodash");
var Promise = require("bluebird");

enduro.templating_engine.registerHelper("inmueble", function(options) {
  // will store all the inmueble entries
  var inmueble_entries;

  // get_cms_list will return a structured list of all pages in a project
  return enduro.api.pagelist_generator
    .get_cms_list()
    .then(pagelist => {
      // will store the promises from reading all the inmueble entries
      var get_content_promises = [];

      inmueble_entries = _.chain(pagelist.structured.inmueble)
        .filter(o => {
          return typeof o === "object";
        })
        .value(); // filter pages only

      for (page_id in inmueble_entries) {
        var page = inmueble_entries[page_id];
        console.log(page.name);
        console.log(page_id);
        if (page.hidden) {
          // inmueble_entries.splice(page_id, 1);
          delete inmueble_entries[page_id];
        } else {
          function get_content(page) {
            get_content_promises.push(
              enduro.api.flat.load(page.fullpath).then(content => {
                page.inmueble_entry = content;
              })
            );
          }

          get_content(page);
        }
      }
      console.log(inmueble_entries);

      return Promise.all(get_content_promises);
    })
    .then(() => {
      // pass inmueble entries as context for the template
      return options.fn(inmueble_entries);
    });
});
