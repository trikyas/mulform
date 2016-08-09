(function() {
    'use strict';
    
    $(function() {
        $('form').mulform();
    });
    
})(window, jQuery);


/**
* Bootstrap multy handler form
* version: 1.0.0
*/
(function() {
    'use strict';
    
    $.fn.mulform = function(options) {
        
        this.each(function() {
            $.data(this, 'docform', new MulForm(this, options));
        });
        
        return this;
    };

    /**
    * Plugin constructor
    */
    function MulForm(form, options) {
        this.elem = $(form);
        
        
        
        console.log(this.getElements());
        console.log(this.elemArray);
    };

    /**
    * Get form elements
    * 
    * Creates an array with elements
    * return Bool
    */
    MulForm.prototype.getElements = function() {
        // Input
        this.inputs                                 = this.elem.find('input');
        this.inputSum                               = this.inputs.length;
        
        // Select
        this.selects                                = this.elem.find('select');
        this.selectSum                              = this.selects.length;
        
        // Create an array with elements
        this.elemArray                              = [];
        
        // Adding input elements to array
        if (this.inputSum) {
            for (var i = 0; i < this.inputSum; i++) {
                this.elemArray.push(this.inputs[i])
            }
        };
        
        // Adding select elements to array
        if (this.selectSum) {
            for (var i = 0; i < this.selectSum; i++) {
                this.elemArray.push(this.selects[i])
            }
        };
 
        if (this.inputSum || this.selectSum)
            return true;
        else
            return false;
    };
    
    
    
})(jQuery);
