//= require medium-editor
//= require_self

;(function() {

scrivito.editors.html_editor.medium = {options: {}};

scrivito.on('content', function(content) {
  if (!scrivito.in_editable_view()) { return; }

  $(content).find('[data-editor=medium]').each(function() {
    var dom_element = $(this);
    var options = dom_element.data('medium-editor') || scrivito.editors.html_editor.medium.options;
    new MediumEditor(dom_element, options);
    dom_element.on('input', function() {
      dom_element.scrivito('save', dom_element.html());
    });
  });
});

}());
