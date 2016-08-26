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
    $.each(this.elemArray, $.proxy(function(_, elements) {
        this.setInput(elements);
    }, this));
};



/**
* Listen input function
*/
MulForm.prototype.setInput = function(element)
{        
    var $inputVal = $(element)[0].value;
    var $checked  = false;

    if ($(element).prop("checked") != undefined)
        $checked  = $(element).prop("checked");

    // Create element Obj
    this.element = {
        tag: element,
        type: null,
        data: null,
        required: false,
        val: $inputVal,
        checked: $checked
    };

    // Push {data} value
    for (var i in $(element).data()) {
        this.element.data     = $(element).data();
    };

    // Check required field
    if (!!$(this.element.tag).attr('required')) {
        this.element.required = true;
    };

    // Get type
    if ($(this.element.tag).attr('type') != undefined)
        this.element.type     = $(this.element.tag).attr('type');
    else
        this.element.type     = 'select';
    
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
        this.setInput(element);
        clearInterval(this.inputOnChange);
    }
    

    this.router();
};


/**
* Router
*/
MulForm.prototype.router = function()
{
    console.log(this.element.val);

};









/**
* Get form elements
* 
* Creates array with elements
* @return {Bool} | Array
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
};