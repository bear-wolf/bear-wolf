var Object = {
    body: {
        $tag: $("body"),
        height: $("body").height(),
        width: $("width").height()
    }
}

$(document).ready(function () {
    Browser.GetBrowser();
    Form.SetToggleInputs();
    DropDownList.Init();
    Menu.Init($("nav.topmenu ul.level0"));
    Menu.Level($("nav.topmenu ul.level0"), 5);

    //grayboxes();


    Site.Init();
    
    Slider.Init();
    SmallMenu.Init();       
    window.Lightbox = new jQuery().visualLightbox({ autoPlay: true, borderSize: 16, classNames: 'vlightbox1', descSliding: true, enableRightClick: false, enableSlideshow: true, resizeSpeed: 7, slideTime: 4, startZoom: true })
});

Slider = {
    Init: function () {
        var variant = [".object-slider", ".default-slider", ".other-slider",".slidersumary"];

        $(variant[0] + ' .baserelative').navigation_slider({ _current: variant[0], _speed: 800, _pager: ".pager-object-slider", _slide: 4, _border: true, _item_click: false, _item_length: 75, _play: true });
        $(variant[1] + ' .baserelative').navigation_slider({ _current: variant[1], _item: "li.bditem", _speed: 800, _pager: ".default-slider-pager", _slide: 1, _item_length: 951, _play:true });
        $(variant[2] + ' .baserelative').navigation_slider({ _current: variant[2], _speed: 800, _rotate_speed: 800, _pager: ".other-slider-pager", _slide: 4, _border: true, _item_length: 191, _play: true });
        $(variant[3] + ' .baserelative').navigation_slider({ _current: variant[3], _speed: 800, _rotate_speed: 800, _pager: ".slidersumary-pager", _slide: 6, _border: true, _item_length: 127, _play: true });
    }
}

var Site = {
    List: function () {
        $("ol li").each(function () {
            var th = $(this);            
            th.wrapInner("<div></div>");
        });
    },
    Init: function () {
        var t = this;
        t.List();

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


        
    }
}


$(window).scroll(function () {
});


$(window).on('resize', function () { grayboxes(); });


$(window).load(function () { grayboxes();
});



var SmallMenu = {
    active: "active",
    $menu: null,
    $content: null,
    Init: function () {
        var t = this;

        t.$menu = $("#panel-menu");
        t.$content = $(".grid-content div.item");

        t.$menu.find("a").bind("click", function () {
            var o = $(this);
            o.parent().parent().find("a").removeClass(t.active);
            o.addClass(t.active);

            var group = parseInt(o.data("group"));
            t.$content.removeClass(t.active).filter("[data-group='" + group + "']").addClass(t.active);
        });
    }
}

var Form = {
    SetToggleInputs: function () {
        jQuery(".toggle-inputs").each(function (i) {
            var $t = jQuery(this);
            var defaultValue = $t.val();

            $t.bind("click", function () {
                var o = $(this);
                if (o.val() == defaultValue) {
                    o.val('');
                }
            });

            $t.bind("focus", function () {
                var o = $(this);
                if (o.val() == defaultValue) {
                    o.val('');
                }
            });

            $t.bind("blur", function () {
                var o = $(this);
                if (o.val() == '') {
                    o.val(defaultValue);
                }
            });

        });
    }
}


var DropDownList = new function () {
    this.Init = function () {
        var empty = $();
        var open = empty;
        $('.ddl select').each(function () {
            var sel = $(this).hide();
            var drop = $('<div class="select-dropdown"></div>').width(sel.width()).hide();
            var title = $('<div class="select-title"></div>').html($('option:selected', sel).html())
            var wrap = $('<div class="select-wrap"></div>').click(function (event) {
                open.slideUp('fast');
                open = (open[0] == drop[0]) ? empty : drop;
                open.slideDown('fast');
                event.stopPropagation();
            }).append($('<div class="select-button"></div>')).append(title);

            $('option', sel).each(function () {
                var opt = $(this);
                var cl = ["first", "last"];
                var current_class = "";
                if (opt.index() == 0) { current_class = cl[0]; }
                else if (opt.index() == opt.parent().find('option').index()) { current_class = cl[1]; }

                $('<div class="select-option ' + current_class + '"></div>').appendTo(drop).html(opt.html()).click(function (event) {
                    opt.prop('selected', true);
                    title.html(opt.html());
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

var Browser = {
    $b: null,
    is: {
        mobile: false,
        Andorid: false,
        iPod: false
    },
    GetBrowser: function () {
        var t = this;
        t.$b = Object.body.$tag;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("ipad") > 0) { t.$b.addClass("iPad"); t.is.mobile = true; }
        else if (ua.indexOf("android") > 0) { t.$b.addClass("Android"); t.is.mobile = true; t.is.Andorid = true; }
        else if (ua.indexOf("ipod") > 0) { t.$b.addClass("iPod"); t.is.mobile = true; t.is.iPod = true; }

        if (ua.indexOf('firefox') > 0) { t.$b.addClass("Firefox"); }
        if (t.is.mobile) t.Orientation();

        if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) { t.$b.addClass("Safari"); }
        if (ua.indexOf('MSIE 8.') > 0) { t.$b.addClass("ie8"); }
        if (ua.indexOf('MSIE 9.') > 0) { t.$b.addClass("ie9"); }
        if (ua.indexOf(' OPR/') > 0) { t.$b.addClass("Opera"); }

        //IE10 -- IE 11
        if (ua.indexOf('MSIE 10.') > 0) { t.$b.addClass("ie10"); }
        else if ((ua.indexOf('Trident') > 0) && (navigator.userAgent.indexOf('rv:11.') > 0)) t.$b.addClass("ie11"); //IE11     
    },

    Orientation: function () {
        var t = this;
        var or = ["orX", "orY"];
        var c = [t.$b.innerHeight(), t.$b.innerWidth()]
        if (c[0] > c[1]) {
            t.$b.removeClass(or[0]);
            t.$b.addClass(or[1]);
        } else {
            t.$b.removeClass(or[1]);
            t.$b.addClass(or[0]);
        }

    },
    ViewPort: function (def) {
        var t = this;
        var v = document.querySelector("meta[name=viewport]");
        if (def == null) {
            if (t.is.Andorid) {
                v.setAttribute('content', 'width=1024, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
            }
            else
                if (t.is.iPod) {
                    v.setAttribute('content', 'width=900, user-scalable=1');
                }
        }
        else v.setAttribute('content', def);

    }
}
Menu = {
    active: "active",

    Level: function (_, count) {
        var t = this;
        var Level = [$(_).find(".level1"), $(_).find(".level2"), $(_).find(".level3"), $(_).find(".level4"), $(_).find(".level5")];
        var w;
        var minwidth;
        for (var i = 0; i < count - 1; i++) {
            if (Level[i + 1] == undefined) return;
            
            Level[i].css("width", $(_).find("a.top0").width()-25);
            Level[i + 1].css("width", Level[i].width()-25);
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

function grayboxes() {
    var height = ($(".main").height());
    var offset = $('.leftgrayblock').offset();
    $('.leftgrayblock,.rightgrayblock').css("height", parseFloat(height)- parseFloat(offset.top));


    /*
	var height2=($(".center_part").height());
	if($(window).height()>height2) $('.center_part').css("height",height);
	*/
}
