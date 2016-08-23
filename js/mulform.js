(function() {
    'use strict';
    
    $(function() {
        $('form').mulform({
            test: 'test-options'
        });
        
        
        $('.btn.one').on('click', function(e) {
            e.preventDefault();
            $("#text").val('Message!')
        });
        
        $('.btn.two').on('click', function(e) {
            e.preventDefault();
            $("#text").val('')
        })
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
        this.elem    = $(form);
        this.options = options;
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
        
        //this.textInput();
        //console.log(this.elemArray);
        
    };
    
    
    
    /**
    * Treat existing field
    */
    MulForm.prototype.treatField = function()
    {
        $.each(this.elemArray, $.proxy(function(key, elem) {
            var elemType = null;
            
            // Create element Obj
            this.element = {
                tag: elem,
                type: null,
                data: null,
                required: false,
            };
            
            // Push {data} value
            for (var i in $(elem).data()) {
                this.element.data     = $(elem).data();
            };
            
            // Check required field
            if (!!$(this.element.tag).attr('required')) {
                this.element.required = true;
            };
            
            if ($(this.element.tag).is('input')) {
                this.element.type     = $(this.element.tag).attr('type');
                
                switch ($(this.element.tag).attr('type')) {
                    case 'text':
                    case 'email':
                    case 'tel':
                    case 'password':
                        this.setInput(this.element.tag); break;
                        
                    case 'file':
                        //console.log(element);
                        break;
                        
                    case 'checkbox':
                        //console.log(element);
                        break;
                        
                    case 'radio':
                        //console.log(element);
                        break;
                }
                
            } else {
                console.log('DEV | this select')
            }
        }, this));
        
        
    };
    
    
    
    /**
    * Listen input function
    */
    MulForm.prototype.setInput = function(element)
    {
        var inputVal = $(element)[0].value;
        
        console.log(inputVal);

        this.inputOnChange = setInterval($.proxy(function () {
            if (inputVal != $(element)[0].value) {
                this.reInit(element);
                return inputVal = $(element)[0].value;
            }
        }, this), 50);

        this.reInit = function(element) {
            clearInterval(this.inputOnChange);
            this.setInput(element);
        }
    }
    

    /**
    * Get form elements
    * 
    * Creates array with elements
    * @return {Bool}
    */
    MulForm.prototype.getElements = function()
    {
        // Input
        this.inputs    = this.elem.find('input');
        this.inputSum  = this.inputs.length;
        
        // Select
        this.selects   = this.elem.find('select');
        this.selectSum = this.selects.length;
        
        // Create an array with elements
        this.elemArray = [];
        
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
            test1: 'test',
            expression: {
                noneEmpty: /^$/,
            }
        };
        this.options = $.extend(true, options, this.options, this.elem.data());
    }
    
    
    
})(jQuery);
