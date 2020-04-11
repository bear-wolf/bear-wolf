var b = null;
var FilterPrice = [0, 0];

$(document).ready(function () {
    b = $("body");
    
    IsBrowser();

    LoadDragTheSlider("#Sorting");
    DDL.Init();

    $(".SelectCheck span").bind("click", function () {
        var t = $(this);
        var a = "Active";
        if (!t.hasClass(a)) { t.addClass(a); } else t.removeClass(a);
    });

    $(".Filter .Type input").bind("change", function () {
        var t = $(this);
        var v = $("#VisualSorting");
        var id = "#Sorting";
        debugger;
        FilterPrice[0] = $(id + "_MinValue").val();
        FilterPrice[1] = $(id + "_MaxValue").val();

        switch (t.data("por"))
        {
            case 1: FilterPrice[0] = t.val(); break;
            case 2: FilterPrice[1] = t.val(); break;
            default: break;
        }        
        t = FilterPrice[0] + ";" + FilterPrice[1];
        v.val(t);
        
        $(id + "_MinValue").val(FilterPrice[0]);
        $(id + "_MaxValue").val(FilterPrice[1]);        
        LoadDragTheSlider("#Sorting");
    });

    $("#Sorting_MinValue").bind("change", function () {
        LoadDragTheSlider("#Sorting");
    });
    $("#Sorting_MaxValue").bind("change", function () {
        LoadDragTheSlider("#Sorting");
    });
    $("#VisualSorting").bind("change", function () {
        LoadDragTheSlider("#Sorting");
    });

});



function IsBrowser() {
    //iPad
    if (navigator.userAgent.match(/iPad/i) != null) { $("html").addClass(iClass); return; }

    if (navigator.userAgent.indexOf('MSIE 8.') > 0) { b.addClass("ie8"); }
    if (navigator.userAgent.indexOf('MSIE 9.') > 0) { b.addClass("ie9"); }
    if (navigator.userAgent.indexOf(' OPR/') > 0) { b.addClass("Opera"); }

    //IE10 -- IE 11
    if (navigator.userAgent.indexOf('MSIE 10.') > 0) { b.addClass("ie10"); }
    else if ((navigator.userAgent.indexOf('Trident') > 0) && (navigator.userAgent.indexOf('rv:11.') > 0)) b.addClass("ie11"); //IE11     
    
    if (navigator.userAgent.indexOf('Firefox') > 0) { b.addClass("Firefox"); }
}

var DDL = new function () {
    this.Init = function () {
        var empty = $();
        var open = empty;
        $('.ddl select').each(function () {
            var sel = $(this).hide();
            var drop = $('<div class="select-dropdown"></div>')
			.width(sel.width())
			.hide();
            var title = $('<div class="select-title"></div>')
			.text($('option:selected', sel).text())
            var wrap = $('<div class="select-wrap"></div>')
			.click(function (event) {
			    open.slideUp('fast');
			    open = (open[0] == drop[0]) ? empty : drop;
			    open.slideDown('fast');
			    event.stopPropagation();
			})
			.append($('<div class="select-button"></div>'))
			.append(title);
            $('option', sel).each(function () {
                var opt = $(this);
                $('<div class="select-option"></div>')
				.appendTo(drop)
				.text(opt.text())
				.click(function (event) {
				    opt.prop('selected', true);
				    title.text(opt.text());
				    drop.slideUp('fast');
				    open = empty;
				    sel.trigger('change');
				    event.stopPropagation();
				});
            });
            sel.after(drop).after(wrap);
        });
        $('html').click(function () {
            open.slideUp('fast');
            open = empty;
        });
    }
}

function LoadDragTheSlider(id) {
    if ($(id)[0] == undefined) return;

    var Text = $(Sorting).find("input");
    var bed1 = Number($(id + "_MinValue").val());
    var bed2 = Number($(id + "_MaxValue").val());

    bed1 = bed1 == bed2 ? Number(bed1) : bed1;


    Text.val(bed1 + ";" + bed2);
    jQuery(Text).slider({
        from: 0,
        to: 230,
        step: 1,
        skin: 'blue',
        limits: false,
        value: bed1 + ";" + bed2,
        calculate: function (value) {            
            return value > 230 ? "mln" : Math.round(value) + "mln";
        },
        onstatechange: function (value) {            
            var vs = value.split(";");
            var value1 = $.trim(vs[0]);
            var value2 = $.trim(vs[1]);
            $(id+"_MinValue").val(Math.round(Number(value1)));
            $(id + "_MaxValue").val(Math.round(Number(value2)));
        },
        callback: function (value) {            
            $("[data-por='1']").val($(id + "_MinValue").val());
            $("[data-por='2']").val($(id + "_MaxValue").val());
        }
    });
}
