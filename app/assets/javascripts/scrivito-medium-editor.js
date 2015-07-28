//= require medium-editor
//= require_self

;(function() {

var ScrivitoAnchor = MediumEditor.extensions.anchor.extend({
  name: 'scrivito_anchor',
  contentDefault: '<i class="scrivito_customer_icon sci_link"></i>',

  handleClick: function (event) {
    var selectedParentElement = MediumEditor.selection.getSelectedParentElement(
      MediumEditor.selection.getSelectionRange(this.document)),
    firstTextNode = MediumEditor.util.getFirstTextNode(selectedParentElement);
    var linkValue = $(MediumEditor.util.getClosestTag(firstTextNode, 'a')).attr('href');
    if (!this.isDisplayed()) { this.showForm(linkValue); }
    return false;
  },

  getTemplate: function() {
    var template = [
      '<i class="medium-editor-toolbar-browse scrivito_customer_icon sci_collection"></i>',
      '<input type="text" value="'+this.currentLinkTarget+'" class="medium-editor-toolbar-input" placeholder="'+this.placeholderText+'">'
    ];

    template.push('<i class="medium-editor-toolbar-save scrivito_customer_icon sci_check"></i>');
    template.push('<i class="medium-editor-toolbar-close scrivito_customer_icon sci_cross"></i>');

    if (this.targetCheckbox) {
      template.push(
        '<div class="medium-editor-toolbar-form-row">',
        '<input type="checkbox" class="medium-editor-toolbar-anchor-target">',
        '<label>',
        this.targetCheckboxText,
        '</label>',
        '</div>'
      );
    }

    if (this.customClassOption) {
      template.push(
        '<div class="medium-editor-toolbar-form-row">',
        '<input type="checkbox" class="medium-editor-toolbar-anchor-button">',
        '<label>',
        this.customClassOptionText,
        '</label>',
        '</div>'
      );
    }

    return template.join('');
  },

  attachFormEvents: function(form) {
    MediumEditor.extensions.anchor.prototype.attachFormEvents.call(this, form);

    form = $(form);
    var input = form.find('.medium-editor-toolbar-input');
    form.find('.medium-editor-toolbar-browse').on('click', function() {
      scrivito.content_browser
        .open({selection: input.val(), selection_mode: 'single'})
        .done(function(selection) {
          if (selection) { input.val(selection); }
        });
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

scrivito.editors.html_editor.medium = {options: {
  // Alle Buttons: https://github.com/yabwe/medium-editor/blob/f28ce4c3f82a293c6b61411a07cadd4df50ebe86/src/js/defaults/buttons.js
  // Defaults: https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md#buttons
  toolbar: {
    buttons: [
      'h1',
      'h2',
      'h3',
      /*
      'h4',
      'h5',
      'h6',
      */
      'bold',
      'italic',
      'underline',
      'orderedlist',
      'unorderedlist',
      'scrivito_anchor',
      'pre',
      'quote',
      'strikethrough',
      'superscript',
      'subscript',
      'indent',
      'outdent',
      'justifyCenter',
      'justifyFull',
      'justifyLeft',
      'justifyRight'
    ]
  },
  extensions: {scrivito_anchor: ScrivitoAnchor}
}};

var medium_options = function() {
  var options = $.extend(true, {}, scrivito.editors.html_editor.medium.options);
  if (options.extensions) {
    _.each(options.extensions, function(constructor, name) {
      options.extensions[name] = new constructor();
    });
  }
  return options;
};

scrivito.on('content', function(content) {
  if (!scrivito.in_editable_view()) { return; }

  $(content).find('[data-editor=medium]').each(function() {
    var dom_element = $(this);
    new MediumEditor(dom_element, medium_options());
    dom_element.on('input', function() {
      dom_element.scrivito('save', dom_element.html());
    });
  });
});

}());
