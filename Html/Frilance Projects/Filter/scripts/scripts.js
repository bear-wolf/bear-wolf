var b = null;

$(document).ready(function () {
    b = $("body");

    Menu.Init($("nav.topmenu ul.level0"));
    Menu.Level($("nav.topmenu ul.level0"), 5);

    Menu.Left();
    $("#tabs").tabs();

    Background.Init();
    Background.Resize();
    Background.UnsliderDots();

    IsBrowser();
    DDL.Init();

    Site.Dynamic();

    setToggleInputs();
    $('#rayting1').raty({
        start: 3
    });

    $('#rayting2').raty({
        start: 3
    });
 

    Site.Dialog();





});

$(window).resize(function () {
    Background.Resize();
    Background.UnsliderDots();

});

Menu = {
    active: "active",

    Level: function (_, count) {
        var t = this;
        var Level = [$(_).find(".level1"), $(_).find(".level2"), $(_).find(".level3"), $(_).find(".level4"), $(_).find(".level5")];
        var w;
        var minwidth;
        for (var i = 0; i < count - 1; i++) {
            if (Level[i + 1] == undefined) return;
            Level[i + 1].css("width", Level[i].width());
            Level[i + 1].css("left", Level[i].width());
        }
    },
    Init: function (_) {
        _.find("> li").hover(function () {
            var t = $(this);
            var h = "hover";
            if (!t.hasClass(h) || !t.hasClass("Active")) {
                _.find("> li").removeClass(h);
                t.addClass(h);
            }
        },
     function () {
         _.find("> li").removeClass("hover");
     });
    },
    Left: function () {
        var th = this;
        var o = [$(".leftmenu li a.top0"), $(".leftmenu li a.top1"), $(".leftmenu li a.top2")];

        o[0].bind("click", function (e) {
            e.preventDefault();
            var t = $(this);
            var b = "leftmenu";
            if (!t.parent().hasClass(th.active)) { t.parent().parent().find(">li").removeClass(th.active); t.parent().addClass(th.active); } else t.parent().removeClass(th.active);
        });

        o[1].bind("click", function (e) {
            var t = $(this).parent();
            if (!t.hasClass(th.active)) { t.parent().find(">li").removeClass(th.active); t.addClass(th.active); } else t.removeClass(th.active);
        });

        o[2].bind("click", function (e) {
            var t = $(this).parent();
            if (!t.hasClass(th.active)) {
                t.parent().find(">li").removeClass(th.active); t.addClass(th.active);
            } else t.removeClass(th.active);
        });
    }

}


Site = {
    active: "active",
    Dynamic: function () {
        var th = this;
        $("input[data-dialog='true']").click(function () { $('.dialog').show(); });
//        $('.dialog a.exit').click(function (e) { e.preventDefault(); $('.dialog').hide(); });
$('.dialog a.exit').click(function (e) { e.preventDefault(); $('.dialog').toggleClass("active"); $('.enterdialog').toggleClass("active"); });

        $(".small-ico li a").bind("click", function () {
            debugger;
            var t = $(this).find("img");            
            var o = [$("#bigphoto"), $("#bigphoto").find("img"),t.attr("src")];

            o[0].attr("href",o[2]);
            o[1].attr("src",o[2]);
        });

        $("a.top").bind("click", function () {
            var t = $(this);
            var i = t.parent().find("input");
            var r = 0;
            var c = t.attr("class");
            r = parseInt(i.val()) + 1;

            i.val(r);
        });
        $("a.bottom").bind("click", function () {
            var t = $(this);
            var i = t.parent().find("input");
            var r = 0;
            var c = t.attr("class");

            r = parseInt(i.val()) - 1;
            i.val(r);
        });

        $("span.radio_box").bind("click", function () {
            var t = $(this);
            var group = t.data("group");
            var o = t.data("class");
            var obj = $(".add-adress");
            if (!t.hasClass(th.active)) {
                $("span.radio_box[data-group='" + group + "']").removeClass(th.active);
                t.addClass(th.active);
                if (o == undefined) { obj.removeClass(th.active); }
                else $("." + o).addClass(th.active);
            }
        });

        $("span.checkbox").bind("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var t = $(this);
            var a = "active";
            var group = t.data("group");
            if (!t.hasClass(a)) { t.addClass(a); }
            else t.removeClass(a);
        });


        $("div.radio").bind("click", function () {
            var t = $(this);
            var span = t.find("span");
            var group = span.data("group");
            var o = span.data("class");
            if (!span.hasClass(th.active)) {
                $("div.radio span[data-group='" + group + "']").removeClass(th.active);
                span.addClass(th.active);                
            }
        });



        $("div.product-list").bind("hover", function () {
            var t = $(this);
            var a = "active";
            var o = t.parent().find(".droopedblock");

            if (o.length) {
                var c = o.data("show").split(";");
                if (!o.hasClass(a)) {
                    o.addClass(a);
                    o.animate({ bottom: c[0] }, 500);
                }
                else {
                    o.animate({ bottom: c[1] }, 500, function () { o.removeClass(a); });
                }
            }
        });

        $(".level1 li").bind("hover", function () {
            var c = $(this).find("ul.level2").length;
            if (c) {
                $(this).find("i").show();
            }
            else { $(".level1 li i").hide(); }

        });


        $("div.check .scheckbox").bind("click", function () {
            var t = $(this);
            var i = t.parent().find(".address");
            var a = "active";
            if (!t.hasClass(a)) {
                t.addClass(a);
                i.prop('disabled', false);

            } else {
                t.removeClass(a);
                i.prop('disabled', true);

            }
        });

        $("#znacky-parametry").bind("click", function () {
            var t = $(this);
            var o = $("#tfi");
            var c = o.data("show").split(";");
            if (!o.hasClass(th.active)) {
                o.addClass(th.active);
                o.animate({ top: c[0] }, 500);
            }
            else {
                o.animate({ top: c[1] }, 500, function () { o.removeClass(th.active); });
            }
        });

        $(".title-filter-inner .hide a").bind("click", function () {
            var t = $(this);
            var o = $("#tfi");
            var c = o.data("show").split(";");
            o.animate({ top: c[1] }, 500, function () { o.removeClass(th.active); });

        });

        var Sl = [".product-slider", ".big_slider"];
        $(Sl[0] + ' .sl-inner').navigation_slider({ _current: Sl[0], _speed: 800, _pager: ".product-slider-pager", _slide: 4, _group: 4, _item_length: 200 });
        $(Sl[1] + ' .topmainslider').navigation_slider({ _current: Sl[1], _speed: 800, _rotate_speed: 8000, _pager: "#bs_pager", _item_base: "#bs_absolute", _item: "li.bsslide1", _is_pager: false, _slide: 4, _group: 4, _border: false, _item_length: 297 });

        jQuery("#Slider3").slider({ from: 100, to: 1000, heterogeneity: ['100/1000'], limits: false, step: 10, dimension: '', skin: "round_plastic" });
    },
    Dialog: function () {
        $("input[data-dialog='true']").click(function () { $('.dialog').show(); });
        $('.dialog a.exit').click(function (e) { e.preventDefault(); $('.dialog').hide(); });
        window.Lightbox = new jQuery().visualLightbox({ autoPlay: true, borderSize: 16, classNames: 'vlightbox1', descSliding: true, enableRightClick: false, enableSlideshow: false, resizeSpeed: 7, slideTime: 4, startZoom: true })
    }
}

var Background = {
    active: "active",
    old_height: 0,

    Init: function () {
        //$(".top_slider > li").css("height", "1698px");
        //$('.top_slider').unslider({ fluid: true, dots: true, speed: 500 },null);
        $('.top_slider').unslider({ fluid: true, dots: true, speed: 500 });
    },

    Resize: function () {
        Slide.Slide1();
        $('body,html').animate({ scrollTop: 0 }, 100);
    },
    UnsliderDots: function () {
        var b;
        var d;
        var w;
        var li;
        var margin = 8;

        $(".dots").each(function () {
            d = $(this);
            b = d.parent().width();
            li = d.find("li");
            w = (li.width() * li.length) + (((li.length - 2) * margin) + margin);
            b = ((b - w) / 2) + "px";
            d.animate({ "left": b }, 500);
        });
    }
}


var Slide = {
    slide: {
        top2: 0
    },
    Slide1: function () {
        var t = this;
        var $b = $("body");
        var h = $b.height() + "px";
        var s = $("#sl1");
        var bp = $(".base_page");
        var s2 = $("#sl2");
        var r = 0;
        s.css("height", h);
        bp.css("height", h);
        s.find(".preview").css("height", h)
        s2.css("top", h);
        $(".top_slider > li").css("height", h);

        t.slide.top2 = parseInt(h);

        /*
               //var $o = $("#panel-channels");
                var s = $o.data("top").split(";");
                s[1] = s[0] + ";-" + parseInt(h);
                h = parseInt(h) - 122 + "px";
                $o.css("height", h);
                $o.data("top", s[1]);
        */
    }
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
