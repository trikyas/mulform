(function() {
    'use strict';
    
    $(function() {
        $('form').mulform({
            test: 'test-options'
        });
    });
    
})(window, jQuery);


/**
* Bootstrap multy form handler
* @vers: 1.0.0
*/
(function() {
    'use strict';
    
    /**
    * Init plugin
    */
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
        this.elem                                   = $(form);
        this.options                                = options;
        if (this.getElements())
            this.init();
    };
    
    
    /**
    * Init processing fields
    */
    MulForm.prototype.init = function()
    {
        this.createOptions();
        this.treatField();
        
        //console.log(this.elemArray);
        
    };
    
    
    
    /**
    * Treat existing field
    */
    MulForm.prototype.treatField = function()
    {
        $.each(this.elemArray, $.proxy(arrayHundler, this));
        
        // Array proxy hundler
        function arrayHundler(key, elem) {
            var element                             = $(elem);
            var elemType                            = null;
            
            if (element.is('input')) {
                elemType                            = element.attr('type');
                
                switch (elemType) {
                    case 'text':
                        console.log(elemType);
                        break;
                        
                    case 'email':
                        console.log(elemType);
                        break;
                        
                    case 'password':
                        console.log(elemType);
                        break;
                        
                    case 'file':
                        console.log(elemType);
                        break;
                        
                    case 'checkbox':
                        console.log(elemType);
                        break;
                        
                    case 'radio':
                        console.log(elemType);
                        break;
                }
                
            } else {
                console.log('DEV | this select')
            }
            
            
            //console.log(elemType)
            
        };
        
        
    };
    

    /**
    * Get form elements
    * 
    * Creates array with elements
    * @return {Bool}
    */
    MulForm.prototype.getElements = function()
    {
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
    
    
    
    
    /**
    * Create plugin options
    *
    * @create {Obj}
    */
    MulForm.prototype.createOptions = function()
    {
        var options = {
            test1: 'test'
        };
        this.options                                = $.extend(true, options, this.options, this.elem.data());
    }
    
    
    
})(jQuery);
