//= require medium-editor
//= require_self

;(function() {

scrivito.on('content', function(content) {
  if (!scrivito.in_editable_view()) { return; }

  $(content).find('[data-editor=medium]').each(function() {
    var contenteditable = $(this);

    var config;
    if (contenteditable.attr('data-medium-editor')) {
      config = JSON.parse(contenteditable.attr('data-medium-editor'));
    } else {
      config = {buttons: [
        'bold',
        'italic',
        'underline',
        'header1',
        'header2',
        'unorderedlist',
        'orderedlist'
      ]};
    }

    new MediumEditor(contenteditable, config);

    contenteditable.on('input', function() {
      contenteditable.scrivito('save', $(this).html());
    });
  });
});

}());
