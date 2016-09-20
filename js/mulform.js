'use strict';


(function() {
    
    
    $(function() {
        $('form').mulform({
            test: 'test-options'
        });
        
        
        $('.btn.one').on('click', function(e) {
            e.preventDefault();
            $("#text").val('Message!');
            
            setTimeout(function() {
                $("#text").val('')
            }, 5000)
        });
        
        $('.btn.two').on('click', function(e) {
            e.preventDefault();
            $("#text").val('');
            
            setTimeout(function() {
                $("#text").val('New message!');
            }, 5000)
        });
        
    });
    
    
    
})(window, jQuery);


/**
* Bootstrap multy form handler
* @vers: 1.0.0
*/
$.fn.mulform = function(options)
{
    this.each(function() {
        $.data(this, 'docform', new MulForm(this, options));
    });
    return this;
};


/**
* Plugin constructor
*/
function MulForm(form, options)
{
    this.form    = $(form);
    this.options = options;
    if (this.getElements())
        this.init();
    
    $(this.form).submit(function() {
        return false;
    });

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
* Create plugin options
*
* @create {Obj}
/^[-a-zа-яё\s]{2,}$/i,
*/
MulForm.prototype.createOptions = function()
{
    var options = {
        patterns: {
            errors: {
                default: '<span class="error text-danger">Error!</span>'
            }
        },
        validator: {
            alphabet: {
                regexp: /^[-a-zа-яё\s]{2,}$/i
            },
            email: {
                regexp: /^[-\._a-z0-9]+\@[-\._a-z0-9]+\.[a-z]{2,}$/i,
            },
            phone: {
                regexp: /^\([\d]{3}\)\s[\d]{3}-[\d]{2}-[\d]{2}$/i,
            },
//            promo: {
//                regexp: /^(PROMO)$/i
//            },
        },
        test1: 'test',
        expression: {
            noneEmpty: /^$/,
        }
    };
    this.options    = $.extend(true, options, this.options, this.form.data());
};



/**
* Router
*/
MulForm.prototype.router = function()
{
    
    
//    if(this.element.data != null) {
//        if(this.element.data.readError != undefined ? this.element.data.readError : 0) {
//            //console.log('Srazu ' + this.element.type);
//            //console.log($(this.form));
//            
//            this.errorPattern();
//            
//        } else {
////            console.log('Posle ' + this.element.type);
//        }
//    } else {
////        console.log('Posle ' + this.element.type);
//        this.errorPattern();
//    }
    
//    if(this.element.data.readError != null ? 0 : this.element.data.readError) {
//        console.log('GO');
//    } else {
//        console.log('Posle');
//    }
//    console.log(this.element.type);
    
    switch(this.element.type) {
        case 'text':
            this.createElementSettings('validator', 'required', 'mask'); break;
//        case 'tel':
//            console.log('switch: tel'); break;
//        case 'email':
//            console.log('switch: email'); break;
//        case 'password':
//            console.log('switch: password'); break;
//        case 'file':
//            console.log('switch: file'); break;
//        case 'checkbox':
//            console.log('switch: checkbox'); break;
//        case 'radio':
//            console.log('switch: radio'); break;
//        case 'select':
//            console.log('switch: select'); break;
//        case 'textarea':
//            console.log('switch: textarea'); break;
    }
    
};


/**
* Collector element settings
*/
MulForm.prototype.createElementSettings = function()
{
    
    this.arrayHandler = function(option, value) {
        var $array = $.inArray(value, this.errorArray);
        if(option)
            this.errorArray.push(value);
        else
            if (!$array) this.errorArray.splice($array, 1);
    };
    
    // Handler required field
    this.requiredField = function() {
        this.arrayHandler(!this.element.tag.value.length, 'required');
    };
    
    // Validator
    this.validator = function() {
        if(this.element.data.validator == undefined) return;
        var $array = this.element.data.validator.replace(/[' ']/g, '').split(',');
        for(var i = 0; i < $array.length; i++)
            this.arrayHandler(this.element.val.search(this.options.validator[$array[i]].regexp), $array[i]);
    };
    
    for (var i = 0; i < arguments.length; i++) {
        switch(arguments[i]) {
            case 'required':
                if (this.element.required)
                    this.requiredField(); break;
            case 'validator':
                this.validator(); break;
//            case 'mask':
//                if (this.element.data.mask != undefined)
//                    this.mask(this.element.data.mask); break;
        }
    };
    
//    console.log(!(this.element.data.validator == undefined));
    console.log();
    
    // Clear error on validator
    if (!(this.element.data.validator == undefined)) {
        var $array = this.element.data.validator.replace(/[' ']/g, '').split(',');
        
        if(!($.inArray('required', this.errorArray) >= 0)) {
            for(var i = 0; i < this.errorArray.length; i++) {
                if ($array.length != this.errorArray.length) {
                    return this.errorArray.splice($.inArray(this.errorArray[i], this.errorArray), 1);
                }
            }
        }
    }
                    
                
                    console.log(this.errorArray);
    
}


//
///**
//* Error pattern
//*/
//MulForm.prototype.errorPattern = function()
//{
//    console.log($(this.element.tag).parent())
//    console.log(this.options.patterns.errors.default)
//    
//}







/**
* Mask field
*/
MulForm.prototype.mask = function(option)
{
    console.log(option)
}


/**
* Regexp pattern field
*/
MulForm.prototype.regexp = function(option)
{
    console.log(option);
}







/**
* Get form elements
* 
* Creates array with elements
* @return {Bool} | Array
*/
MulForm.prototype.getElements = function()
{
    // Input
    this.inputs      = this.form.find('input');
    this.inputSum    = this.inputs.length;

    // Select
    this.selects     = this.form.find('select');
    this.selectSum   = this.selects.length;

    // Textarea
    this.textareas   = this.form.find('textarea');
    this.textareaSum = this.textareas.length;

    // Create an array with elements
    this.elemArray   = [];

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

    // Adding textarea elements to array
    if (this.textareaSum) {
        for (var i = 0; i < this.textareaSum; i++) {
            this.elemArray.push(this.textareas[i])
        }
    };

    if (this.inputSum || this.selectSum || this.textareaSum)
        return true;
    else
        return false;
};


/**
* Treat existing field
*/
MulForm.prototype.treatField = function()
{
    $.each(this.elemArray, $.proxy(function(_, elements) {
        this.getInputSettings(elements);
    }, this));
};



/**
* Listen input function
*/
MulForm.prototype.getInputSettings = function(element)
{        
    var $inputVal = $(element)[0].value;
    var $checked  = false;
    
    if ($(element).prop("checked") != undefined)
        $checked  = $(element).prop("checked");

    // Create element Obj
    this.element = {
        tag: element,
        type: null,
        data: {
            validator: null
        },
        required: false,
        val: $inputVal,
        checked: $checked,
    };
    
    // Greate error array
    this.errorArray = [];

    // Push {data} value
    for (var i in $(element).data()) {
        this.element.data     = $(element).data();
    };

    // Check required field
    if (!!$(this.element.tag).attr('required')) {
        this.element.required = true;
    };
    
    // Get emelent type
    // Inputs
    if ($(this.element.tag).attr('type') != undefined)
        this.element.type     = $(this.element.tag).attr('type');
    // Select
    if ($(this.element.tag).is('select'))
        this.element.type     = 'select';
    // Textarea
    if ($(this.element.tag).is('textarea'))
        this.element.type     = 'textarea';
    
    // Throw error on none supported elements
    if (!$(this.element.tag).is('input') && !$(this.element.tag).is('textarea') && !$(this.element.tag).is('select') && $(this.element.tag).attr('type') == undefined)
        throw 'Unsupported element tagname:' + $(this.element.tag).get(0).tagName;
    
    // Input event
    this.inputOnChange = setInterval($.proxy(function () {
        
        if ($inputVal != $(element)[0].value) {
            this.inputOffChange(element);
            return $inputVal = $(element)[0].value;
        };

        if ($(element).prop("checked") != $checked && $(element).prop("checked") != undefined) {
            this.inputOffChange(element);
            return $checked = $(element).prop("checked");
        };

    }, this), 50);
    
    this.inputOffChange = function(element) {
        this.getInputSettings(element);
        clearInterval(this.inputOnChange);
    };
    
    this.router();
};