var b = null;

$(document).ready(function () {
    b = $("body");    
    IsBrowser();
    DDL.Init();
    var slider1 = ".small_slider",
        slider2 = ".mainsliderbigarrow";

    $(slider2 + ' .mainslider').navigation_slider({ _current: slider2, _speed: 800, _pager: ".mainsliderbigarrow_pager", _slide: 1, _border: true, _item_length: 1204, _play: true });
    $(slider1 + ' .baseslider').navigation_slider({ _current: slider1, _speed: 800, _pager: ".small_slider_pager", _big_images: "#bigphoto", _small_images: ".small_images", _border: true, _slide: 3, _item_length: 94 });
	
    setToggleInputs();
    $("#tabs").tabs();
    window.Lightbox = new jQuery().visualLightbox({ autoPlay: true, borderSize: 16, classNames: 'vlightbox1', descSliding: true, enableRightClick: false, enableSlideshow: true, resizeSpeed: 7, slideTime: 4, startZoom: true })


    FooterLine();
    $(window).on('resize', function () { FooterLine(); });


    $(".item_add_minus a").bind("click", function () {
        var t = $(this);
        var i = t.parent().find("input");
        var r = 0;
        var c = t.attr("class");

        if (c == "add") { r = parseInt(i.val()) + 1; } else r = parseInt(i.val()) - 1;
        i.val(r);
    });

    $(".leftmenu > li > a").bind("click", function (e) {        
		e.preventDefault();
        var t = $(this).parent();
        var a = "active";
        var b = "leftmenu";
        var l = $(".leftmenu > li");
        if (!t.hasClass(a)) { l.removeClass(a); t.addClass(a); } else t.removeClass(a);
    });

    $(".leftmenu >li > ul > li> a").bind("click", function (e) {
        var t = $(this).parent();
        var a = "active";
        var l = $(".leftmenu > li > ul > li");
       // if (!t.hasClass(a)) { t.addClass(a); } else t.removeClass(a);
       if (!t.hasClass(a)) { l.removeClass(a); t.addClass(a); } else t.removeClass(a);
    }); 





    $("footer .up a").bind("click", function () {
        $('body,html').animate({ scrollTop: 0 }, 600);
    });

    $("input[data-dialog='true']").click(function () { $('.dialog').show(); });
    $('.dialog a.exit').click(function (e) { e.preventDefault(); $('.dialog').hide(); });

    $("ul.radiobox li").bind("click", function () {
        var t = $(this);        
        var s = t.find("span.radio_box");
        var group = s.data("group");
        var a = "active";
        if (!s.hasClass(a)) {
            $("span.radio_box[data-group='" + group + "']").removeClass(a);
            s.addClass(a);
        } else {
            s.removeClass(a);
        }
    });

    $("ul.checkbox li").bind("click", function () {
        var t = $(this);        
        var s = t.find("span.checkbox");
        var a = "active";
        if (!s.hasClass(a)) {
            s.addClass(a);
        } else {
            s.removeClass(a);
        }
    });

    $("div.check").bind("click", function () {
        var t = $(this).find("span.scheckbox");
        var i = t.parent().find(".address");
        var a = "active";
        if (!t.hasClass(a)) {
            t.addClass(a);
            i.addClass(a);
        } else {
            t.removeClass(a);
            i.removeClass(a);
        }
    });
    
    function FooterLine() {
        var width = ($(window).width() - 1107) / 2;
        $('#jsline').css("width", width);
        width = width - (width * 2);
        $('#jsline').css("right", width);
    }


    var DragSlider = {
        id: null,
        obj: null,
        Init: function () {
            var t = this;
            var MinValue = "_MinValue",
                MaxValue = "_MaxValue";

            t.obj = "#visualsorting";
            
            $(".horizontale input.change").bind("change", function () {
                var t = $(this);
                var v = $(t.obj);

                FilterPrice[0] = $(id + t.MinValue).val();
                FilterPrice[1] = $(id + t.MaxValue).val();

                switch (t.data("por")) {
                    case 1: FilterPrice[0] = t.val(); break;
                    case 2: FilterPrice[1] = t.val(); break;
                    default: break;
                }
                t = FilterPrice[0] + ";" + FilterPrice[1];
                v.val(t);

                $(id + MinValue).val(FilterPrice[0]);
                $(id + MaxValue).val(FilterPrice[1]);
                t.LoadDragTheSlider(id);
            });

            $(t.id + MinValue).bind("change", function () {                
                t.LoadDragTheSlider(t.id);
            });
            $(t.id + MaxValue).bind("change", function () {
                t.LoadDragTheSlider(t.id);
            });
            $(t.obj).bind("change", function () {
                t.LoadDragTheSlider(t.id);
            });
        },
        
        LoadDragTheSlider: function () {
            var t = this;
            if ($(t.id)[0] == undefined) return;

            var Text = $(t.id).find("input");
            var bed1 = Number($(t.id + "_MinValue").val());
            var bed2 = Number($(t.id + "_MaxValue").val());

            bed1 = bed1 == bed2 ? Number(bed1) : bed1;
            
            Text.val(bed1 + ";" + bed2);
            jQuery(Text).slider({
                from: 0,
                to: 20000,
                step: 1000,
                skin: 'blue',
                limits: false,
                value: bed1 + ";" + bed2,
                calculate: function (value) {            
                    return value > 20000 ? "Kč" : Math.round(isNaN(value)? "0" :value) + "Kč";
                },
                onstatechange: function (value) {            
                    var vs = value.split(";");
                    var value1 = $.trim(vs[0]);
                    var value2 = $.trim(vs[1]);
                    $(t.id + "_MinValue").val(Math.round(Number(value1)));
                    $(t.id + "_MaxValue").val(Math.round(Number(value2)));
                },
                callback: function (value) {            
                    $("[data-por='1']").val($(t.id + "_MinValue").val());
                    $("[data-por='2']").val($(t.id + "_MaxValue").val());
                }
            });
        }

    }

    DragSlider.id = "#sorting";
    DragSlider.Init();
    DragSlider.LoadDragTheSlider();

});

function setToggleInputs() {
    jQuery(".toggle-inputs").each(function (i) {
        var defaultValue = jQuery(this).val();

        jQuery(this).bind("click", function () {
            if (jQuery(this).val() == defaultValue) {
                jQuery(this).val('');
            }
        });

        jQuery(this).bind("focus", function () {
            if (jQuery(this).val() == defaultValue) {
                jQuery(this).val('');
            }
        });

        jQuery(this).bind("blur", function () {
            if (jQuery(this).val() == '') {
                jQuery(this).val(defaultValue);
            }
        });

    });
}

function IsBrowser() {
    if (navigator.userAgent.match(/iPad/i) != null) { $("html").addClass(iClass); return; } //iPad    
    if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) { b.addClass("Safari"); }
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
