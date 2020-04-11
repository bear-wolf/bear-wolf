var b = null;

$(document).ready(function () {

    jQuery("#Slider3").slider({ from: 100, to: 1000, heterogeneity: ['160/1540'], limits: false, step: 10, dimension: ' грн', skin: "round_plastic" });


    b = $("body");
    var Slider3 = ".Tabs1";
    Slider31 = ".Tabs2";
    //var Slider2 = ".SmallPhoto";
    var Slider1 = ".big_slider";
    var Slider4 = ".MainSliderSmallArrow";

    IsBrowser();
    DDL.Init();
    $(Slider1 + ' .topmainslider').navigation_slider({ _current: Slider1, _speed: 800, _rotate_speed: 8000, _pager: "#bs_pager", _item_base: "#bs_absolute", _item: "li.bsslide1", _is_pager: true, _slide: 1, _border: true, _item_length: 1200, _play: true });
    $(Slider3 + ' .MainSlider').navigation_slider({ _current: Slider3, _speed: 800, _pager: ".msba_pager", _slide: 4, _group: 4, _item_length: 216 });
    $(Slider31 + ' .MainSlider').navigation_slider({ _current: Slider31, _speed: 800, _pager: ".msba_pager", _slide: 4, _group: 4, _item_length: 216 });

    $(Slider4 + ' .MainSliderSmall').navigation_slider({ _current: Slider4, _speed: 800, _pager: ".mssa_pager", _small_images: "img.smallim", _big_images: "img.kartimg", _slide: 3, _border: true, _item_length: 138 });
    $("#tabs").tabs();
    setToggleInputs();


    window.Lightbox = new jQuery().visualLightbox({ autoPlay: true, borderSize: 16, classNames: 'vlightbox1', descSliding: true, enableRightClick: false, enableSlideshow: true, resizeSpeed: 7, slideTime: 4, startZoom: true })

    //$("input[data-dialog='true']").click(function () { $('.dialog').show(); });
    $('.dialog a.exit').click(function (e) { e.preventDefault(); $('.dialog').hide(); $('.enterdialog').hide(); $('.regdialog').hide(); });
    $('a.enter').click(function (e) { e.preventDefault(); $('.dialog').show(); $('.enterdialog').show(); $('.regdialog').hide(); });
    $('a.reg').click(function (e) { e.preventDefault(); $('.dialog').show(); $('.enterdialog').hide(); $('.regdialog').show(); });

    $(".item_add_minus a").bind("click", function () {
        var t = $(this);
        var i = t.parent().find("input");
        var r = 0;
        var c = t.attr("class");

        if (c == "add") { r = parseInt(i.val()) + 1; } else r = parseInt(i.val()) - 1;
        i.val(r);
    });

    $(".leftmen li").bind("click", function () {
        var t = $(this);
        var a = "active";
        if (!t.hasClass(a)) { $(".leftmen li").removeClass(a); t.addClass(a); } else t.removeClass(a);
    });


    $(".colorblock span").bind("click", function () {
        var t = $(this);
        var a = "active";
        if (!t.hasClass(a)) {
            $(".colorblock span").removeClass(a); t.addClass(a);
            var rel = $(this).attr("rel");
            $(".title5 b").html(rel);
            //$(".colorblock input").val(rel);

            var rel2 = $(this).find("i").attr("rel");
            $(".colorblock input").val(rel2);

        }
    });
    $(".razmerblock span").bind("click", function () {
        var t = $(this);
        var a = "active";
        if (!t.hasClass(a)) {
            $(".razmerblock span").removeClass(a); t.addClass(a);
            var rel = $(this).html();
            $(".title7 b").html(rel);
            $(".razmerblock input").val(rel);

        }
    });

    $(".hidedblock").animate({ height: "toggle", opacity: "toggle" }, "slow").toggleClass('visible');

    $(".banbut").bind("click", function () {
        var t = $(this)
        var ot = t.find("a");
        var bl = $(".hidedblock");
        var v = "visible";
        var text = t.data("text").split(";");

        if (!bl.hasClass(v)) {
            t.addClass(v);
            ot.text(text[0]);
        } else {
            t.removeClass(v);
            ot.text(text[1]);
        }
        bl.animate({ height: "toggle", opacity: "toggle" }, "slow").toggleClass(v);
    });

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
                to: 1000,
                step: 100,
                skin: 'blue',
                limits: false,
                value: bed1 + ";" + bed2,
                calculate: function (value) {
                    return value > 1000 ? "грн" : Math.round(isNaN(value) ? "0" : value) + "грн";
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

function clearfilters(ev) {
    //ev.preventDefault();
    jQuery("input").each(function (i) {
        $(this).removeAttr("value").removeAttr("checked")
    })

}


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
