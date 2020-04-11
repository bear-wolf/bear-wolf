var varTouchstart = false;
var ScrollPercentY = 0;
var MaxScroll = [163,399];

var iClass = "iPad";

var b = null;
var h = null;
//var hm = null;
//var sm = "SmallPage";
var ip = "InnerPage";
var i = null;
var w = null, Animation = null;


$(function () {
    
    b = $("body");
    h = $("header");
    //hm = $("header .Menu");
    //sm = "SmallPage";
    i = $(".Icon");
    w = $(".Word");
    Animation = $(".BlockBackground div");

    $(".Menu .First a").addClass("Active");
        
    if (navigator.userAgent.match(/iPad/i) != null) $("html").addClass(iClass);
    
    var animateContent = function (container, content, direction) {
        var contanerHeight = container.height();
        var contentHeight = content.height() - $(".Tweet .Base").height();
        var animationOffset = contanerHeight - contentHeight;

        if (direction == 'up') { animationOffset = 0; }
        var speed = 1000 * (contentHeight / 600);
        content.animate({ "margin-top": animationOffset + "px" }, speed);
    };

    $('.Tweet').each(function () {
        var content = $(this).find('table');
        var btnUp = $('#' + $(this).data('button-up'));
        var btnDown = $('#' + $(this).data('button-down'));

        btnUp.unbind('click').click(function () { return false; });
        btnDown.unbind('click').click(function () { return false; });

        if (content.height() > $(this).height()) {

            btnUp.unbind('hover').hover(function () {
                animateContent($(this), content, 'up');
            }, function () { content.stop(); });

            btnDown.unbind('hover').hover(function () {
                animateContent($(this), content, 'down');
            }, function () { content.stop(); });
        }
    });
});

var isfixedsupported = (function () {
    var issupported = null;
    if (document.createelement) {
        var el = document.createelement("div");
        if (el && el.style) {
            el.style.position = "fixed";
            el.style.top = "10px";
            var root = document.body;
            if (root && root.appendchild && root.removechild) {
                root.appendchild(el);
                issupported = (el.offsettop === 10);
                root.removechild(el);
            }
        }
    }
    return issupported;
})();

window.onload = function () {
    if (!isfixedsupported) {
        // добавляем контекст для "старичков"
        document.body.classname += ' no-fixed-supported';
        // имитируем position: fixed;                
        //var topbar = document.getelementbyid('LogoType');
        //var bottombar = document.getelementbyid('footer');

        //var bottombarheight = bottombar.offsetheight;
        //var windowheight = window.innerheight;

        //window.ontouchmove = function (e) {
        //    if (event.target !== topbar) {
        //        topbar.style = "";
        //    }
        //}
        //window.onscroll = function () {
        //    var scrolltop = window.scrolly;
        //    topbar.style.top = scrolltop + 'px';
        //    bottombar.style.bottom = (scrolltop + windowheight - bottombarheight) + 'px';
        //};
    }
    // первичный scroll
    //window.scrollby(0, 1);

}


function ScrollToElement(id) {
    var scrollpos;
    var off = 0;
    if (!$("html").hasClass(iClass)) {
        //scrollpos = $(this).scrollTop();
        //if (scrollpos < 399) scrollpos = 600;
        off = $(this).data("pc");
    }
    else {
        //scrollpos = getScrollingPosition();
        off = $(this).data("ipad");
    }
        

    var offset = $("#" + id).offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop + off + scrollpos;
    $('body,html').animate({ scrollTop: totalScroll }, 800);
};

function Current(el) {
    $(".Menu li a").removeClass("Active");
    $(el).addClass("Active");
    return false;
};


function PCScroll(s)
{
    $(Animation).stop(true, true);
    if (s > 450) { $(i).hide(); }
    else $(i).show();

    if (s > 496) { $(w).hide(); }
    else $(w).show();

    var temp = null;

    console.log("scroll="+s);
    // SmallPage - body.InnerPage
    if (s > 423) {        
        if (!$(b).hasClass(ip)) $(b).addClass(ip);        
        $(Animation).animate({ "background-position": "center 0" }, 700);
        //$(Animation).animate({ top: "-" + MaxScroll[1] + "px" }, 700);                                
    }
    else
    {
        if ($(b).hasClass(ip))
        {
            $(Animation).fadeIn(100);
        }
        $(b).removeClass(ip);        
        
        ScrollPercentY = s / (h.data("ps-max-height") / 100);
        temp = (MaxScroll[1] / 100) * ScrollPercentY;        
        if (temp > MaxScroll[1]) temp = MaxScroll[1];
        $(Animation).animate({ "background-position-y": "-" + parseInt(temp) + "px" }, 700);
        var r = $(".BlockBackground").data("result");
        var oldHeight = 0;
        if (r != 0) { oldHeight = r }
        else
        {
            oldHeight = $(".BlockBackground").data("pc-height")
        }
        oldHeight = oldHeight - temp;

        $(".BlockBackground").data("result", oldHeight);
        $(".BlockBackground").animate({ height: parseInt(oldHeight) + "px" }, 700);
        
    }

    console.log("head=" + $(Animation).css("background-position-y") + " temp=" + parseInt(temp));
    
    //console.log("PC - scrollpos=" + s);
    return false;
}

window.onscroll = function () {    
    
    var ip = "InnerPage";
    var b = $("body");
    var i = $(".Icon");
    var w = $(".Word");

    if (!$("html").hasClass(iClass)) { PCScroll($(this).scrollTop()); return false; }

    var temp;
    var scrollpos = getScrollingPosition();
    
    console.log("iPad");
    
    if (scrollpos[1] > 230) { $(i).hide(); }
    else $(i).show();

    if (scrollpos[1] > 280) { $(w).hide(); }
    else $(w).show();
    
    // SmallPage - body.InnerPage
    if (scrollpos[1] > 307)
    {
        //alert("scrollpos[1]=" + scrollpos[1]);
        //alert("a=" + $(".BlockBackground").css("top"));
        $(Animation).animate({ backgroundPosition: "-57px" }, 800);
        //$('body,html').animate({scrollTop: 307}, 800);
    }

    if (scrollpos[1] > 350)
    {
        $(b).addClass(ip);        
    }

    if (scrollpos[1] < 398) {        
        
        ScrollPercentY = scrollpos[1] / (h.data("ps-max-height") / 100);
        temp = (MaxScroll[0] / 100) * ScrollPercentY;        
        if (temp > 57) temp = 57;
        $(Animation).animate({ top: "-" + temp + "px" }, 800);
    }

    if (scrollpos[1] >= 566) {
        if (!b.hasClass(ip)) b.addClass(ip);
        //$(hm).hide();
        //$(b).addClass("SmallPage");
    }
    else {
        //$(hm).show();
        //$(b).removeClass("SmallPage");
    }      
};

//$(document).bind("touchmove", function (event) {
//    varTouchstart = true;
//    var scrollpos = getScrollingPosition();
//    //$(".Numbers").text("#=" + scrollpos);    
//    //$(".Numbers").text("=#=" + window.pageYOffset);
//});


//function IsScroll() {    
//    if ($(el).scrollTop() < 398) { $("header").css("background-position", "center -" + parseInt($(this).scrollTop() / 2.2) + "px"); }
//}

//function IsScroll(el) {
//    var c = "InnerPage";
//    var b = $("body");
//    if ($(el).scrollTop() > 569) { if (!b.hasClass(c)) b.addClass(c); }
//    else b.removeClass(c);

//    if ($(el).scrollTop() > 455) { $(".Icon").hide(); }
//    else $(".Icon").show();

//    if ($(el).scrollTop() < 398) { $("html").css("background-position", "center -" + parseInt($(this).scrollTop()/2.2) + "px"); }    
//};

function getScrollingPosition() {
    var position = [0, 0];
    if (typeof window.pageYOffset != 'undefined') {
        position = [
            window.pageXOffset,
            window.pageYOffset
        ];
    } else if (typeof document.documentElement.scrollTop
        != 'undefined' && document.documentElement.scrollTop > 0) {
        position = [
            document.documentElement.scrollLeft,
            document.documentElement.scrollTop
        ];
    } else if (typeof document.body.scrollTop != 'undefined') {
        position = [
            document.body.scrollLeft,
            document.body.scrollTop
        ];
    }
    return position;
}


//$(window).scroll(function (event) {
//    if (varTouchstart) {
//        varTouchstart = false;
//        return false;
//    }
//    IsScroll(this);
//});