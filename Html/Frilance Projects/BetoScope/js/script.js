
var global = {
    stavki: false
}
$(document).ready(function () {
    //$(".datepicker").datepicker($.datepicker.regional["ru"]);
    $('#datepickerbtn').click(function (e) {
        e.preventDefault()
        $("#datepicker").datepicker({
            //dateFormat: 'DD, d MM, yy',
            dateFormat: 'd MM, D',
            changeMonth: false
        }).datepicker("show");;
    });
});

$(function () {
    Browser.Init();

    $('.baseDatePicker .datepickerbtn').click(function (e) {
        e.preventDefault()
        var base = $(this).closest(".baseDatePicker");

        base.find(".datepickerst").datepicker({
            dateFormat: 'd MM, D',
            changeMonth: false
        }).datepicker("show");;
    });

    $(".js_logo_bets").owlCarousel({
        items: 10,
        itemsDesktop: [1000, 7],
        itemsDesktopSmall: [900, 6],
        itemsTablet: [600, 5],
        itemsMobile: [479, 5],
        pagination: false
    });

    $(".js_logo_bets2").owlCarousel({
        items: 10,
        itemsDesktop: [1000, 7],
        itemsDesktopSmall: [900, 6],
        itemsTablet: [600, 5],
        itemsMobile: [479, 5],
        pagination: false
    });
    
    $(".arrow_right, .arright").click(function () {
        owl1.trigger('owl.next');
    })
    $(".arrow_left, .arleft").click(function () {
        owl1.trigger('owl.prev');
    })

    var owl1 = $("#default_slider");
    if (!Browser.IsiPad()) {
        owl1.owlCarousel({
            items: 1,
            itemsDesktop: [1000, 1], //5 items between 1000px and 901px
            itemsDesktopSmall: [900, 1], // betweem 900px and 601px
            itemsTablet: 1, //2 items between 600 and 0
            itemsMobile: 1// itemsMobile disabled - inherit from itemsTablet option
        });
    } else {
        //owl1.owlCarousel({
        //    items: 3,
        //    itemsDesktop: [3000, 4],
        //    itemsTablet: [2000, 4],
        //    itemsTabletSmall: [2000, 3],
        //    itemsMobile: 300,
        //    lazyLoad: true,
        //    pagination: false
        //});
        owl1.owlCarousel({
            /*
			items: 3,
            itemsDesktop: [1000, 1], //5 items between 1000px and 901px
            itemsDesktopSmall: [900, 1], // betweem 900px and 601px
            itemsTablet: [400, 2], //2 items between 600 and 0
            itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
			*/
            items: 1,
            itemsDesktop: [1000, 1], //5 items between 1000px and 901px
            itemsDesktopSmall: [900, 1], // betweem 900px and 601px
            itemsTablet: 1, //2 items between 600 and 0
            itemsMobile: 1// itemsMobile disabled - inherit from itemsTablet option
        });

    }

    ScrollStart();
    Stock();

    $('.js_btn_tab').click(function (event) {
        if (!($(this).hasClass('btn_tab--active'))) {
            $('.js_btn_tab').removeClass('btn_tab--active').addClass('boxsh_tab');
            $(this).toggleClass('btn_tab--active').removeClass('class boxsh_tab');

            $('.js_table_get, .js_table_add').toggleClass('hide');
        }
        resizeme();
    });
    $('.menu_icon').click(function (event) {

        $(this).toggleClass('active_slide')
        speed_s = 350;
        if ($(this).hasClass('active_slide')) {

            $('#sidebar').animate({
                left: "0px"
            }, speed_s);
        } else {

            $("#sidebar").animate({
                left: "-240px"
            }, speed_s);
            $('.main_container').animate({
                marginLeft: "0px"
            }, speed_s);
        }
    });

    $(".stavki .line-tab a").bind("click", function () {
        var t = $(this);
        var a = "active";
        var stavki = $(".stavki");
        t.closest("ul").find("li").removeClass(a);
        t.parent("li").addClass(a);
        stavki.find(".inner-block").removeClass(a);
        $("#" + t.data("id")).addClass(a);
        if (stavki.hasClass(a)) {

            var calc = ($(window).height() - $(".calculate").height() - $(".stavki h2").offset().top) + "px";
            stavki.find(".space").attr("style", "height:" + calc);

            razmerMyStavki(stavki);
        }
    });

    $(".navigation td").bind("click", function () {
        var t = $(this);
        var a = "active";
        var stavki = $(".stavki");
        var guide = $(".guide");
        var cabinet = $(".cabinet");
        var panelgame = $(".panel-game");
        if (t.hasClass(a)) {
            t.removeClass(a);
        } else {
            t.closest("table").find("td").removeClass(a);
            t.addClass(a);            
        }
        $("#defaultPanel").removeClass(a);
        stavki.removeClass(a);
        guide.removeClass(a);
        cabinet.removeClass(a);
        panelgame.removeClass(a);

        $("#" + t.data("id")).addClass(a);

        if (stavki.hasClass(a) && !global.stavki && !Browser.IsiPad()) {
            //var calc = ($(window).height() - $(".calculate").height() - $(".stavki h2").offset().top) + "px";
            //stavki.find(".space").attr("style", "height:" + calc);

            var scroll = stavki.find(".div_scrollb");
            var h = (parseInt(scroll.height()) - 174) + "px";
            scroll.css("height", h);
            global.stavki = true;

            razmerMyStavki(stavki);
        }
        if (guide.hasClass(a)) {
            var calc = ($(window).height() - $(".guide h2").offset().top) + "px";
            guide.find(".space").attr("style", "height:" + calc);
        }

        if (cabinet.hasClass(a)) {
            var calc = ($(window).height() - $(".cabinet h2").offset().top) + "px";
            cabinet.find(".space").attr("style", "height:" + calc);
        }
        //if (palelgame.hasClass(a)) {
        //    var calc = ($(window).height() - $(".palelgame h2").offset().top) + "px";
        //    palelgame.find(".space").attr("style", "height:" + calc);
        //}
        if (!$(".navigation td").hasClass("active")) {
            $("#defaultPanel").addClass(a);
        }


    });
    CalculateAutoHeight();
    $(".chempionat").addClass("active");

    AutoHeight();

});


function Stock() {

    if (parseInt($("body").width()) > 1200) {

        var owl2 = $("#action_slider")
        owl2.owlCarousel({
            items: 3,
            itemsDesktop: [3000, 1],
            itemsDesktopSmall: [900, 1], // betweem 900px and 0px
            itemsTabletSmall: [300, 1],
            itemsMobile: true,
            lazyLoad: true,
            pagination: false
        });
        
        $(".action_arright").click(function () {
            owl2.trigger('owl.next');
        })
        $(".action_arleft").click(function () {
            owl2.trigger('owl.prev');
        })

        return;
    }

    var StockTop = $(".panel.action");
    var StockNew = $(".actinForSmall").addClass("action");
    var content = StockTop.html();
    StockTop.html("");    
    StockNew.html(content);
}

function ScrollStart() {
    if (!Browser.IsiPad()) {
        $(".div_scrollb").mCustomScrollbar({
            theme: "minimal",
            scrollInertia: 0
        });
    }
}


function AutoHeight() {

    if (Browser.IsiPad()) return;

    var calc = ($(window).height() - $(".fullHeight .div_scrollb").offset().top) + "px";
    $(".div_scrollb").attr("style", "height:" + calc);

    $(".list-container .fullHeight .div_scrollb").each(function () {
        var t = $(this);
        var h = parseInt(t.height());
        t.css("height", h + "px");
    });

    $(".guide .div_scrollb").each(function () {
        var t = $(this);
        var h = parseInt(t.height()) - 56;
        t.css("height", h + "px");
    });

    //if (parseInt($("body").width()) < 1250) {
        //$("body").css("overflow", "auto");
        //var w = $(".wrapper");
        //w.addClass("div_scrollb");
        //ScrollStart();
        //var h = parseInt($(".wrapper").height()) + 121;
        //w.css("height", h + "px");
    //} else $("body").css("overflow", "hidden");
}

function razmerMyStavki(stavki, scroll) {
    var scroll = stavki.find(".inner-block.active .div_scrollb");
    var h = parseInt(scroll.height());
    var list = parseInt(stavki.find(".inner-block.active .list-stavki").height());
    if (list < h) {
        scroll.css("height", list + "px");
        var calc = ($(window).height() - $(".calculate").height() - $(".stavki h2").offset().top) + "px";
        stavki.find(".space").attr("style", "height:" + calc);
    }
}

function CalculateAutoHeight() {
    var calc = ($(window).height()) + "px";
    $(".chempionat .space").attr("style", "height:" + calc);
}


function resizeme() {
    he = $('.table').not('.hide').height();
    console.log(he);
    if (he > (window.innerHeight - 210)) {
        $('.div_scrollb').height(window.innerHeight - 210 + 'px');
    }
    else
        $('.div_scrollb').height(he + 'px')
};

$(window).resize(function () {
    //resizeme();
    AutoHeight();
    Stock();
});


var Browser = new function () {
    var data = {
        onmap: false,
        body: null,
        is: {
            mobile: false,
            Andorid: false,
            iPod: false,
            iPhone: false,
            iPad: false
        }
    };
    this.Determine = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("ipad") > 0) { data.body.addClass("iPad"); data.is.mobile = true; data.is.iPad = true; }
        else if (ua.indexOf("android") > 0) { data.body.addClass("Android"); data.is.mobile = true; data.is.Andorid = true; }
        else if (ua.indexOf("ipod") > 0) { data.body.addClass("iPod"); data.is.mobile = true; data.is.iPod = true; }
        else if (ua.indexOf("iphone") > 0) { data.body.addClass("iPhone"); data.is.mobile = true; data.is.iPhone = true; }



        if (ua.indexOf('firefox') > 0) { data.body.addClass("Firefox"); }
        if (data.is.mobile) {
            this.Orientation();
            data.body.addClass("mobile");
        }


        if (ua.indexOf('MSIE 8.') > 0) { data.body.addClass("ie8"); }
        if (ua.indexOf('MSIE 9.') > 0) { data.body.addClass("ie9"); }
        if (ua.indexOf(' OPR/') > 0) { data.body.addClass("Opera"); }
        //IE10 -- IE 11
        if (ua.indexOf('MSIE 10.') > 0) { data.body.addClass("ie10"); }
        else if ((ua.indexOf('Trident') > 0) && (navigator.userAgent.indexOf('rv:11.') > 0)) data.body.addClass("ie11"); //IE11     
        //alert("class=" + data.body.attr("class")+" ua="+ua);
    };
    this.IsiPad = function () {
        return data.is.iPad ? true : false;
    };
    this.IsiPhone = function () {
        return data.is.iPhone ? true : false;
    };
    this.Init = function () {
        var t = this;
        data.body = $("body");

        this.Determine();

        //if (data.is.mobile) {
        //    this.DynamicOnMobile();
        //    this.ViewPort();
        //}
    };

    this.DynamicOnMobile = function () {

    }

    this.Orientation = function () {
        var t = this;
        var or = ["orX", "orY"];
        //if (typeof orientation !== 'undefined'
        var c = [data.body.innerHeight(), data.body.innerWidth()]
        if (c[0] > c[1]) {
            data.body.removeClass(or[0]).addClass(or[1]);
        } else data.body.removeClass(or[1]).addClass(or[0]);
    };

    this.ViewPort = function (def) {
        var t = this;
        var v = document.querySelector("meta[name=viewport]");
        if (def == null) {
            if (data.is.iPhone) {
                v.setAttribute('content', 'width=320px;');
            }
            else
                if (data.is.Andorid) {
                    v.setAttribute('content', 'width=320px;');
                }
                else if (data.is.iPad) {
                    v.setAttribute('content', 'width=1200px;');
                }
        }
        else v.setAttribute('content', def);

    }
}