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

    window.Lightbox = new jQuery().visualLightbox({ autoPlay: true, borderSize: 16, classNames: 'vlightbox1', descSliding: true, enableRightClick: false, enableSlideshow: true, resizeSpeed: 7, slideTime: 4, startZoom: true })
});

$(window).scroll(function () {    
});

$(window).resize(function () {    
});

$(window).load(function () {    
});

$(window).bind('orientationchange', function (event) {
    Mobile.Orientation();
});

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
            var title = $('<div class="select-title"></div>').text($('option:selected', sel).text())
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

                $('<div class="select-option ' + current_class + '"></div>').appendTo(drop).text(opt.text()).click(function (event) {
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