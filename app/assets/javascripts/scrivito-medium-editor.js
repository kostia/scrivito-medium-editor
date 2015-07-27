//= require medium-editor
//= require_self

;(function() {

scrivito.on('content', function(content) {
  if (!scrivito.in_editable_view()) { return; }

  $(content).find('[data-editor=medium]').each(function() {
    var dom_element = $(this);
    new MediumEditor(dom_element, dom_element.data('medium-editor'));
    dom_element.on('input', function() {
      dom_element.scrivito('save', dom_element.html());
    });
  });
});

}());
