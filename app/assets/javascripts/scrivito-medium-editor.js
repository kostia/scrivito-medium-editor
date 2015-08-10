//= require medium-editor
//= require_self

;(function() {

var ScrivitoAnchor = MediumEditor.extensions.anchor.extend({
  name: 'scrivito_anchor',
  contentDefault: '<i class="scrivito_customer_icon sci_link"></i>',

  handleClick: function (event) {
    if (!this.isDisplayed()) {
      var selection_range = MediumEditor.selection.getSelectionRange(this.document);
      var selected_parent = MediumEditor.selection.getSelectedParentElement(selection_range);
      var first_text_element = MediumEditor.util.getFirstTextNode(selected_parent);
      var link_element = MediumEditor.util.getClosestTag(first_text_element, 'a');
      var link_value = $(link_element).attr('href');
      this.showForm(link_value);
    }
    return false;
  },

  getTemplate: function() {
    return '<i class="medium-editor-toolbar-browse scrivito_customer_icon sci_collection"></i>' +
      '<input type="text" class="medium-editor-toolbar-input" placeholder="'+this.placeholderText+'">' +
      '<i class="medium-editor-toolbar-save scrivito_customer_icon sci_check"></i>' +
      '<i class="medium-editor-toolbar-close scrivito_customer_icon sci_cross"></i>';
  },

  attachFormEvents: function(form) {
    MediumEditor.extensions.anchor.prototype.attachFormEvents.call(this, form);

    form = $(form);
    var input = form.find('.medium-editor-toolbar-input');
    form.find('.medium-editor-toolbar-browse').on('click', function() {
      scrivito.content_browser.open({selection: input.val(), selection_mode: 'single'})
        .done(function(selection) { if (selection) { input.val(selection); } });
      return false;
    });
  },

  completeFormSave: function (opts) {
    this.base.restoreSelection();
    if (opts.url) {
      this.execAction(this.action, opts);
    } else {
      this.execAction('unlink');
    }
    this.base.checkSelection();
  },
});

var editor_options = function(toolbar_options) {
  var options = {
    anchorPreview: false,
    extensions: {scrivito_anchor: new ScrivitoAnchor()},
    toolbar: {
      buttons: [
        'h1',
        'h2',
        'h3',
        'bold',
        'italic',
        'scrivito_anchor',
        'underline',
        'orderedlist',
        'unorderedlist',
        'indent',
        'outdent',
        'justifyLeft',
        'justifyCenter',
        'justifyFull'
      ]
    }
  };
  if (toolbar_options) { options.toolbar = toolbar_options; }
  options.toolbar.standardizeSelectionStart = true;
  return options;
};

scrivito.on('content', function(content) {
  if (!scrivito.in_editable_view()) { return; }

  $(content).find('[data-editor=medium]').each(function() {
    var dom_element = $(this);
    new MediumEditor(dom_element, editor_options(dom_element.data('medium-editor-toolbar')));
    dom_element.on('input', function() {
      dom_element.scrivito('save', dom_element.html());
    });
  });
});

}());
