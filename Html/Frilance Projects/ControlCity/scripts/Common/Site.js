$(function () {
    Browser.Init();
    Site.init();
    Site.initSlider();
    Site.DynamicEvent();
    listenUrl()
    $('#PhoneNumber').mask('+38(000)000-00-00');
    //$("button").attr("aria-expanded", "true");    
   
        $(document).ready(function () {
            $.srSmoothscroll({
                step: 150,
                speed: 900
            });
        });
    
});

function scrollTo(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function () {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}
function ScrollToElement(id, speed) {
    var offset = $(id).offset();
    var offsetTop = offset.top;
    if ($(id).attr("id") == "Slide2") {
        offsetTop = offsetTop - 90;
    }
    var totalScroll = offsetTop;
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    if (is_chrome)
    {
        $('body').animate({
            scrollTop: totalScroll
        }, speed);
    } else {
        $('html').animate({
            scrollTop: totalScroll
        }, speed);
    }
    
   
}
$(document).on('click', 'a[data-to]', function (e) {
    e.preventDefault()
    var el = $(e.target).attr("data-to");
    $('.nav li').removeClass('active')
    $("a[data-to='" + el + "']").closest('li').addClass('active')
    var target = $(el);
    var navbar = $("#navbar");
    navbar.animate({ "height": 0 }, 1000, function () {
        navbar.removeClass("in").css("height", "auto");
    })

    ScrollToElement(el, 1500)
    //if (Site.insideUrl()) {       
    //}
    //else {
    //    window.location.hash = el;
    //    window.location.href = "/" + el;
    //}
    return false;

})
$(document).scroll(function (e) {
    var scroll=$(window).scrollTop();
    if (scroll < 1600)
    {
        $('.nav li').removeClass('active')
        $("a[data-to='#main']").closest('li').addClass('active')
    }
    else if (scroll >= 1600 && scroll <= 2600)
    {
        $('.nav li').removeClass('active')
        $("a[data-to='#Slide2']").closest('li').addClass('active')
    } else {
        $('.nav li').removeClass('active')
        $("a[data-to='#Slide3']").closest('li').addClass('active')
    }
   
   
})
function listenUrl() {
    el = window.location.hash;
    if (el != "") {
        $(document).ready(function () {
            $('.nav li').removeClass('active')
            $("a[data-to='"+el+"']").closest('li').addClass('active')
            ScrollToElement(el, 1500);
        })
    }
   // setTimeout(function () { window.location.hash = "" }, 100000)
}
function isElementInViewport(el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
//init templating
_.templateSettings.variable = "model";
SiteAjaxSetup.init();
SiteValidators.init();

var statusAnimate = false;

var Admin = new function () {
    this.Init = function () {
        var active = "active";
        var win = $(window).height();
        var res = win - 150;
        $(".leftPanel").outerHeight(res);

        $(".pageComplaint .filters .arrow").bind("click", function () {
            var leftPanel = $(this).closest(".filters");
            if (leftPanel.hasClass(active)) { leftPanel.removeClass(active); }
            else leftPanel.addClass(active);
        });
    }
}

var ClientValidator = new function () {
    this.Init = function (idForm) {
        var targetForm = $(idForm);

        targetForm.removeData('validator');
        targetForm.removeData('unobtrusiveValidation');
        targetForm.removeAttr('novalidate');
        $.validator.unobtrusive.parse(targetForm);
    };

}

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
        if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) { data.body.addClass("Safari"); }
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
        if (data.is.mobile) {
            this.DynamicOnMobile();
            this.ViewPort();
        }
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

var Site = new function () {
    var data = {
        fullHeight: null,
        win: $(window),
        body: null,
        init: function () {
            this.fullHeight = $('.fullHeight');
            this.win = $(window);
            this.body = $("body");
        }
    };
    this.slideInLeft = function () {
        var scrTop = $("body").height() + $(window).scrollTop();

        if ($(".page").offset().top < scrTop && !statusAnimate) {
            statusAnimate = true;
            var o = $(".animated.slideInLeft");
            o.animate({ "margin-left": 0 }, 1000, function () { statusAnimate = false; });
        }
    };
    this.SetStyleFileInput = function () {
        $("input[type=file]").nicefileinput({ label: "Оберіть файли" });
    };
    this.DynamicEvent = function () {
        var func = this;
        data.init();

        this.AutoHeight();

        $(window).scroll(function () {
            func.slideInLeft();
            func.AnimateReflection();
        });

        $(window).bind("resize", function () {
            func.AutoHeight();            
        });

        $("body").on('click', '.img-thumbnail', function (e) {
            SiteDialog.showImage($(e.target).attr('src'))
        })

        $("body").on('click', '.remove-image', function (e) {
            var rem = $(e.target).closest('div');
            $.post("/Attachment/Delete", { id: $(e.target).attr("data-id") })
            .success(function () {
                rem.remove();
            })
        })
        
        this.SetStyleFileInput();
        function getUserAddress() {
            var a = {}
            $.post('/Adress/GetUserAddress').success(function (data) {
                a = data;
                $("#DistrictId option[value='" + a.DistrictId + "']").prop('selected', true);
                $("#DistrictId").siblings('div.select-wrap').children('div.select-title').text($("#DistrictId option[value='" + a.DistrictId + "']").text())
                $("#Street").attr('value', a.Street);
                $("#House").attr('value', a.House);
                $("#ApartmentNum").attr('value', a.AppartmentNum);
            })

        }

        function resetAddress() {
            $("#DistrictId option").each(function (item) {
                $(item).prop('selected', false);
            })
            $("#DistrictId").siblings('div.select-wrap').children('div.select-title').text("Оберіть район");
            $("#Street").attr("value", "");
            $("#House").attr("value", "");
            $("#ApartmentNum").attr("value", "");
        }
        $('body').on('change', '#territorry', function (e) {
            if (this.value == "true") {
                resetAddress();
                $("#LocationChecked").hide('slow')
                $("#LocationVerify").hide()
                $('#UserAddress').attr("value", false);
                $("#LocationVerify>i").removeClass('active')
            }
            else { $("#LocationChecked").show('slow'); $("#LocationVerify").show() }
        })
        $(".checkboxLabel").bind("click", function (e) {
            e.preventDefault();
            var t = $(this);
            var icon = t.find(".icon");
            var nameClass = "active";
            if (t.attr("id") == "LocationVerify") {
                var obj = $("#LocationChecked");
                if (icon.hasClass(nameClass)) {
                    icon.removeClass(nameClass);
                    $("#LocationVerify").find(':hidden').attr('value', false);
                    $("#LocationVerify").find(':hidden').trigger('change');
                    //obj.removeClass(nameClass).hide("slow");
                    resetAddress();
                }
                else {
                    icon.addClass(nameClass);
                    $("#LocationVerify").find(':hidden').attr('value', true);
                    $("#LocationVerify").find(':hidden').trigger('change')
                    obj.addClass(nameClass).show("slow");
                    getUserAddress();
                }
            }
            else {
                var o = $(e.target).parent().find(':hidden');
                if (icon.hasClass(nameClass)) {
                    icon.removeClass(nameClass);
                    $(e.target).parent().find(':hidden').attr('value', false);
                    $(e.target).parent().find(':hidden').trigger('change')
                }
                else { icon.addClass(nameClass); $(e.target).parent().find(':hidden').attr('value', true); $(e.target).parent().find(':hidden').trigger('change') }
            }
        });
    };
    this.insideUrl = function () {
        return (!(window.location.pathname != "/" && window.location.pathname != "/Home/Index")) ? true : false;
    };
    this.AnimateReflection = function () {        
        var scroll = $(window).scrollTop();
        var cood = (scroll == 0) ? 0 : scroll;
        if (cood < -450) {
            return;
        }
        var obj = [$(".animate-right"), $(".animate-left")];
        var result = (cood / 4);
        obj[0].css({ "transform": 'translate3d(0px,' + result + 'px, 0px)' });
        obj[1].css({ "transform": 'translate3d(0px,' + Math.abs(result) + 'px, 0px)' });

    };
    function findAndReplace(current, newlis) {
        var newids = [];
        var oldids = [];
        newids = $.map(newlis, function (element) {
            return $(element).attr("data-id");
        });
        oldids = $.map(current, function (element) {
            return $(element).attr("data-id");
        });
        var intersected = _.intersection(oldids, newids);
        $.each(current, function (item) {
            if ($.inArray($(current[item]).attr("data-id"), intersected) != -1) {
                current.splice(item, 1)
            }
        })

        return current;
    }
    this.initSlider = function () {
        data.init();
        
        if (this.insideUrl()) {
            $(document).on('click', 'a.bx-next', function (e) {
                $('.sliderLastAddresses').css("-webkit-transition-duration", "").css("transition-duration", "").css("-webkit-transform", "").css("transform", "");
                var page = parseInt($('.lastAddresses').attr('data-page'));
                if (page == 0) { page = 1; }
                if (page == 1) { page = 2; }
                $('.lastAddresses').attr('data-page', page + 1);
                $.post('/Complaint/GetSlides', { page: page }).success(function (data) {
                    if (data != "") {
                        var count = $("<div/>").html(data).find('li').length
                        if (count == 0) {

                            $('.lastAddresses').attr('data-page', 1); $(e.target).trigger('click')
                        }
                        if (count != 7) {
                            $('.sliderLastAddresses').css("-webkit-transition-duration", "").css("transition-duration", "").css("-webkit-transform", "").css("transform", "");
                            var newli = $("<div/>").html(data).find('li')
                            newli.css("display", "none")
                            var o = $('.bxslider li')//.slice(count - 7);
                            var ee = findAndReplace(o, newli)
                            var eee = findAndReplace(newli, o)
                            $('.bxslider li').remove()
                            o.css("display", "none");
                            var oo = ee.add(eee)
                            var k = oo.length - 7;
                            var res = oo.slice(k)
                            _.each(res, function (item) {
                                $(item).show()
                                $('.bxslider').prepend(item)
                                var w = $(item).width()
                                $(item).css("opacity", "0").css("display", "").css("width", "0");
                                $(item).animate({
                                    opacity: 1,
                                    width: w
                                }, 300, "linear", function () {

                                })
                            })
                        }
                        else if (count == 7) {
                            var newli = $("<div/>").html(data).find('li')
                            $('.bxslider').html("")
                            _.each(newli, function (item) {
                                $('.bxslider').prepend(item)
                                var w = $(item).width()
                                $(item).css("opacity", "0").css("display", "").css("width", "0");
                                $(item).animate({
                                    opacity: 1,
                                    width: w
                                }, 300, "linear", function () {

                                })
                            })
                            $('.sliderLastAddresses').css("-webkit-transition-duration", "").css("transition-duration", "").css("-webkit-transform", "").css("transform", "");
                        } else { }
                    }



                })
            })
            $(document).on('click', 'a.bx-prev', function (e) {
                $('.sliderLastAddresses').css("-webkit-transition-duration", "").css("transition-duration", "").css("-webkit-transform", "").css("transform", "");
                var page = parseInt($('.lastAddresses').attr('data-page'));
                if (page == 0) { page = -1 }
                if (page == 1) { page = -1 }
                $('.lastAddresses').attr('data-page', page - 1);
                $.post('/Complaint/GetSlides', { page: page }).success(function (data) {
                    if (data != "") {
                        var count = $("<div/>").html(data).find('li').length
                        if (count == 0) {
                            $('.lastAddresses').attr('data-page', 1); $(e.target).trigger('click')
                        }
                        else if (count != 7) {
                            var newli = $("<div/>").html(data).find('li')
                            newli.css("display", "none")
                            var o = $('.bxslider li')//.slice(count - 7);
                            var ee = findAndReplace(o, newli)
                            var eee = findAndReplace(newli, o)
                            $('.bxslider li').remove()
                            o.css("display", "none");
                            var oo = ee.add(eee)
                            var k = oo.length - 7;
                            var res = oo.slice(k)
                            _.each(res, function (item) {
                                $(item).show()
                                $('.bxslider').append(item)
                                var w = $(item).width()
                                $(item).css("opacity", "0").css("display", "").css("width", "0");
                                $(item).animate({
                                    opacity: 1,
                                    width: w
                                }, 300, "linear", function () {

                                })
                            })
                        }
                        else if (count == 7) {
                            var newli = $("<div/>").html(data).find('li')
                            $('.bxslider').html("")
                            _.each(newli, function (item) {
                                $('.bxslider').append(item)
                                var w = $(item).width()
                                $(item).css("opacity", "0").css("display", "").css("width", "0");
                                $(item).animate({
                                    opacity: 1,
                                    width: w
                                }, 300, "linear", function () {

                                })
                            })
                            $('.sliderLastAddresses').css("-webkit-transition-duration", "").css("transition-duration", "").css("-webkit-transform", "").css("transform", "");
                        }
                        else { }
                    }


                })
            })

           // if (parseInt(data.body.width()) > 800) {
                $('.responsiveGallery-wrapper').responsiveGallery({
                    animatDuration: 400,
                    $btn_prev: $('.responsiveGallery-btn_prev'),
                    $btn_next: $('.responsiveGallery-btn_next'),
                   // rgShowCount: 3
                });
           // }
        }
    };
    //this.StartBxSlider = new function () {
    //    var data = {
    //        config: null,
    //        obj: null,
    //        sliders: null,
    //        width_item: null
    //    };

    //    this.Data = function () {
    //        data.config = "";
    //        //data.obj = $(".bxslider");
    //        data.sliders = new Array();
    //        data.width_item = 217;
    //    };
    //    this.Init = function () {
    //        this.Data();
    //        //data.obj.bxSlider({
    //        //    startSlide: 7,
    //        //    minSlides: 1,
    //        //    maxSlides: 1,
    //        //    moveSlides: 5,
    //        //    slideWidth: data.width_item,
    //        //    touchEnabled: false,
    //        //    controls: true,
    //        //    infiniteLoop: false,
    //        //    onSliderLoad: function () {
    //        //        $('.sliderLastAddresses').css("-webkit-transition-duration", "").css("transition-duration", "").css("-webkit-transform", "").css("transform", "");
    //        //    },
    //        //    onSlideNext: function () { },
    //        //    onSlidePrev: function ($slideElement, oldIndex, newIndex) { }
    //        //});
    //        this.ByСondition();
    //    };

    //    this.ByСondition = function () {
    //        this.Data();

    //        var slide = parseInt($(".body").width()) / data.width_item;
    //        var width = (Math.floor(slide) * data.width_item) + "px";
    //        $(".bx-wrapper").css("width", width);
    //    };
    //    this.Reload = function () {
    //        data.obj.each(function (i, slider) {
    //            sliders[i] = $(slider).bxSlider();
    //        });

    //        $.each(sliders, function (i, slider) {
    //            slider.reloadSlider(config);
    //        });
    //    };
    //    //$('.bxslider').bxSlider({
    //    //    startSlide: 7,
    //    //    minSlides: 1,
    //    //    maxSlides: 1,
    //    //    moveSlides:5,
    //    //    slideWidth: 217,
    //    //    touchEnabled: false,
    //    //    controls: true,
    //    //    infiniteLoop: false,
    //    //    onSliderLoad: function () {
    //    //        $('.sliderLastAddresses').css("-webkit-transition-duration", "").css("transition-duration", "").css("-webkit-transform", "").css("transform", "");
    //    //    },
    //    //    onSlideNext: function () {

    //    //    },
    //    //    onSlidePrev: function ($slideElement, oldIndex, newIndex) {

    //    //    }
    //    //});
    //};

    //$(document).on('click', '.nav a', function (e) {
    //    // data.bxSliderMain.reloadSlider();
    //    var s=$(e.target).attr("data-slide-index")
    //    if (s != null && s!= "" && s!="undefined")
    //    {
    //        var item = $(e.target).attr('data-slide-index')
    //        $(e.target).removeAttr("data-slide-index").attr("slide", item)
    //        $("#Slide" + item).mCustomScrollbar("disable", true);
    //        $("#Slide" + item).mCustomScrollbar("update");
    //        data.bxSliderMain.goToSlide(item);
    //        e.preventDefault()
    //    }
    //    else {
    //        var item = $(e.target).attr('slide')
    //        $(e.target).removeAttr("data-slide-index").attr("slide", item)
    //        $("#Slide" + item).mCustomScrollbar("disable", true);
    //        $("#Slide" + item).mCustomScrollbar("update");
    //        data.bxSliderMain.goToSlide(item);
    //        e.preventDefault()
    //    }
    //   //$(".scroll-bar").mCustomScrollbar("scrollTo", 0);
    //     //$("#Slide" + item + " .mCSB_container").css("top", "");
    //})
    $(document).on('click', '#toTop', function (e) {
        data.bxSliderMain.goToSlide(0);
    })
    this.init = function () {
        SiteScriptMessage.evaluateScriptMessages();
        SiteAutocomplete.init();
        autofocus();

        var win = $(window).height();
        var res = win - 96;
        $(".fixHeight").outerHeight(res);

        res = win - 91;
        $(".mapHeight").outerHeight(res);
        //$(".scroll-bar").mCustomScrollbar({ mouseWheel: { enable: true } });


        /*  $(".toTop").bind("click", function () {            
              $(".scroll-bar-on-section").mCustomScrollbar("scrollTo", "snapOffset", 600);
          });*/
    };

    this.htmlEncode = function (value) {
        return $('<div/>').text(value).html();
    };

    this.htmlToText = function (value) {
        return $('<div/>').html(value).text();
    };

    this.readCookieRaw = function (name, options) {
        var raw = $.cookie.raw;
        var result = null;
        try {
            $.cookie.raw = true;
            result = $.cookie(name, undefined, options);
            $.cookie.raw = raw;
        } catch (e) {
            $.cookie.raw = raw;
            throw e;
        }
        return result;
    };

    function autofocus() {
        $(":not([data-setfocus])[data-focus='True']:first").each(function () {
            var $this = $(this);
            $this.attr("data-setfocus", true);
            $this.focus();
        });
    };
    this.AutoHeight = function () {
        var height = ($("body").hasClass("iPhone")) ? 367 : data.win.height();
        height = ($("body").hasClass("iPad")) ? 770 : height;
        data.fullHeight.outerHeight(height);
    }
};