(->
    'use strict'
    $ ->
        # Повесим обработчик на форму
        $('form').docform()
        return
    
    return
) window, jQuery
    
    
###*
* DocForm Handler plugin
* version: 1.0.0
###
(->
    $.fn.docform = (options) ->
        this.each ->
            $.data this, 'docform',
                new DocForm this, options
            return

        return this

    ###*
    * DocForm constructor
    ###
    DocForm = (form, options) ->
        @.elem = $(form)

        @.elements()

        return

    ###*
    * Get form elements
    ###
    DocForm::elements =->
        @.inputs                  = @.elem.find('input')        # Finding input fields
        @.inputSum                = @.inputs.length             # Lengths input fields

        @.selects                 = @.elem.find('select')       # Finding selects fields
        @.selectSum               = @.inputs.length             # Lengths selects fields
        
        @.elemArray               = []                          # Create an array with elements

        if @.inputSum
            while i < @.inputSum
                console.log(@.elem.find('input').length)
                i++
            
        console.log(@.elem.find('input').length)
            
) jQuery