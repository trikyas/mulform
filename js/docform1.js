(function() {
  'use strict';
  $(function() {
    $('form').docform();
  });
})(window, jQuery);


/**
* DocForm Handler plugin
* version: 1.0.0
 */

(function() {
  var DocForm;
  $.fn.docform = function(options) {
    this.each(function() {
      $.data(this, 'docform', new DocForm(this, options));
    });
    return this;
  };

  /**
  * DocForm constructor
   */
  DocForm = function(form, options) {
    this.elem = $(form);
    this.elements();
  };

  /**
  * Get form elements
   */
  return DocForm.prototype.elements = function() {
    this.inputs = this.elem.find('input');
    this.inputSum = this.inputs.length;
    this.selects = this.elem.find('select');
    this.selectSum = this.inputs.length;
    this.elemArray = [];
    if (this.inputSum) {
      while (i < this.inputSum) {
        console.log(this.elem.find('input').length);
        i++;
      }
    }
    return console.log(this.elem.find('input').length);
  };
})(jQuery);
