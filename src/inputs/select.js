(function ($) {
    "use strict";
    
    var Select = function (options) {
        this.init('select', options, Select.defaults);
    };

    $.fn.editableutils.inherit(Select, $.fn.editabletypes.list);

    $.extend(Select.prototype, {
        renderList: function() {
            this.$input.empty();

            var fillItems = function($el, data) {
                var html = '<input type="hidden"> <div class="default text">Select a category</div> <i class="dropdown icon"></i> <div class="menu">';
                if($.isArray(data)) {
                    for(var i=0; i<data.length; i++) {
                        var text = data[i].text;
                        var value = data[i].value;
                        var str = '<div class="item" data-value="'+value+'">'+text+'</div>';
                        html += str;
                    }
                }
                html += '</div>';

                $el.html(html);
                $el.dropdown();
                return $el;
            };        

            fillItems(this.$input, this.sourceData);
            
            this.setClass();
            this.$input.parent().removeClass("ui");
            this.$input.parent().removeClass("input");
            //enter submit
            this.$input.on('keydown.editable', function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });            
        },
        value2html: function(value, element) {
            $(element).html(value);
        },

        html2value: function(html) {
            return html;
        },
        input2value: function () {
            return $('input', this.$input).val();
        },
        value2input: function(value) {
            var val = $.fn.editableutils.itemsByValue(value, this.sourceData);
            $('.default.text', this.$input).html(val[0].text);
        },
       
        value2htmlFinal: function(value, element) {
            var text = '', 
                items = $.fn.editableutils.itemsByValue(value, this.sourceData);
            if(items.length) {
                text = items[0].text;
            }
            
            //$(element).text(text);
            $.fn.editabletypes.abstractinput.prototype.value2html.call(this, text, element);
        },
        
        autosubmit: function() {
            this.$input.off('keydown.editable').on('change.editable', function(){
                $(this).closest('form').submit();
            });
        }
    });      

    Select.defaults = $.extend({}, $.fn.editabletypes.list.defaults, {
        /**
        @property tpl 
        @default <select></select>
        **/         
        tpl:'<div class="ui compact selection dropdown"> </div>'
    });

    $.fn.editabletypes.select = Select;      

}(window.jQuery));
