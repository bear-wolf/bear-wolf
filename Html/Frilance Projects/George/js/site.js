$(function () {
    Default.Init();
    Site.Init();
    Site.DynamicEvent();

    $(".main_page").css("height", 1380);
});

var Default = new function () {
    this.Init = function () {
        this.setToggleInputs();
        this.Dynamic();
    },
    this.Dynamic = function () {
        $("a[href='']").each(function () {
            $(this).attr("href", "javascript:void(0)");
        })
    },
    this.setToggleInputs = function () {
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
    };
};


var Site = new function () {
    var data = {
        fullHeight: null,
        win: $(window),
        bxSliderMain: null,
        percent: {
            sto: null,
            Calculate: function (h) {
                var r = (this.sto / 100) * h;
                return r;
            }
        },
        init: function () {
            this.fullHeight = $('.fullHeight');
            this.win = $(window);
            this.percent.sto = $(window).height();
        }
    };

    this.DynamicEvent = function () {
        var func = this;
        data.init();

        data.win.on('beforeunload', function () {
            $(window).scrollTop(0);
        });
        data.win.bind("resize", function () {
        });
        data.win.scroll(function () {
            //if (data.bxSliderMain.getCurrentSlide() == 0 || $("body").scrollTop() == 0) {
            //    $('header').addClass('top');
            //}            
        });
        data.win.resize(function () {
            func.AutoHeight();
            //this.CheckHeightUnits();

        });

        /* Preloader */
        data.win.load(function () {
            setTimeout(function () {
                $('.loader .cont').fadeOut(200);
                $('.loader').delay(100).fadeOut(800);
            });
        });

        $('body').on('mousewheel', function (e) {
            (e.deltaY > 0) ? data.bxSliderMain.goToPrevSlide() : data.bxSliderMain.goToNextSlide(); // true - колесо вниз; false - вверх
        });

      
        //$('section[id^="Slide"]').mCustomScrollbar({
        //    scrollInertia: 200,
        //    mouseWheel: true,
        //    mouseWheel: { enable: true, scrollAmount: 100, normalizeDelta: true, deltaFactor: 30 },
        //    advanced: {
        //        updateOnBrowserResize: true,
        //        updateOnContentResize: true
        //    },
        //    callbacks: {
        //        onScrollStart: function () {
        //            if (mcs.topPct == 0 && wheel == false) pages.goToPrevSlide();
        //            if (mcs.topPct == 100 && wheel == true) pages.goToNextSlide();
        //        },
        //        whileScrolling: function () {
        //            var pNum = this.index(),
        //				 pxTop = 0 - mcs.top;
        //            console.log(pxTop);
        //            switch (pNum) {
        //                case 0:  // Главная
        //                    page1.css('background-position', '50% ' + mcs.topPct / 2 + '%');
        //                    break
        //                case 1: // История
        //                    $('#hist-top .left').css('background-position', '50% ' + (5 + (mcs.topPct / 2)) + '%');
        //                    $('#hist-top .right').css('background-position', '100% ' + (100 - mcs.topPct) + '%');
        //                    $('#hist-bottom').css('background-position', '50% ' + (80 - (mcs.topPct / 5)) + '%');
        //                    break
        //                case 2: // Технологии
        //                    $('#barrel1').css('background-position', '0 ' + mcs.topPct * 10 + 'px');
        //                    $('#barrel2').css('background-position', '0 ' + mcs.topPct * 3 + '%');
        //                    if (pxTop < $('#grape').position().top) {
        //                        $('#grape-plx').css('right', 0 - (300 + (mcs.top / $('#grape').position().top * 300)));
        //                        $('#grape-plx').css('opacity', 0 - (mcs.top / $('#grape').position().top * 1));
        //                    }
        //                    if (pxTop < $('#forest').position().top) {
        //                        $('#forest-plx-left').css('top', 0 - (655 + (mcs.top / $('#forest').position().top * 655)));
        //                        $('#forest-plx-right').css('right', 0 - (422 + (mcs.top / $('#forest').position().top * 422)));
        //                    }
        //                    if (mcs.topPct == 100) $('#tech-middle .text').addClass('animated');
        //                    else $('#tech-middle .text').removeClass('animated');
        //                    if (pxTop > $('#tech-bottom').position().top - wheight + 350) {
        //                        /*$('#glass').css('background-position',(660-mcs.topPct*6.6)+'px 0');
        //			    		$('#deg').text(parseInt(((pxTop+wheight)-($('#tech-bottom').position().top+334))/(wheight-75)*48));
        //			    		if ($('#deg').text() < 0 ) $('#deg').text(0)
        //			    		if ($('#deg').text() > 21 ) $('#deg').text(24)*/
        //                        if (!$('#deg').hasClass('animate') && !$('#glass').hasClass('animate')) {
        //                            $('#deg').addClass('animate').trigger('animateIn');
        //                            $('#glass').addClass('animate');
        //                        }
        //                    }
        //                    break
        //                case 5: // Контакты
        //                    $('#cont-parallax').css('bottom', 0 - (mcs.topPct * 575 / 575));
        //                    break
        //                default:
        //                    return false;
        //            }
        //        }
        //    }
        //});


        $('.bxslider').bxSlider({
            minSlides: 3,
            maxSlides: 3,
            slideWidth: 280,
            slideMargin: 30
        });

        $(document).on('click', '#feedback input.btn', function (e) {
            if ($('#feedback').parsley('validate')) {
                var thxmessage = '<p>' + $('#thxmessage').text() + '</p>';
            }
            return false;
        });

        $("section").mCustomScrollbar({
            advanced: { updateOnContentResize: true },
            callbacks: {
                onScrollStart: function (e) {
                    if (e.top==0) {
                        var numberPage = data.bxSliderMain.getCurrentSlide();
                        $("nav a[data-slide-index='" + numberPage + "']").each(function () {
                            var a = "active";
                            $(this).closest("nav").find("a").removeClass(a);
                            $(this).addClass(a);
                        });
                    }
                },
                whileScrolling: function (e) {

                    if (e.top != 0) {
                        var slide = [null, $("#Slide1"), $("#Slide2")];
                        switch (data.bxSliderMain.getCurrentSlide()) {
                            case 1: {
                                var img = [".slideTwo .float-left", ".slideTwo .figure-center", ".slideEleven .side-full"];
                                $(img[0]).css('background-position', 'center ' + e.top + 'px');
                                var max = parseInt($(img[1]).css("max-height")) - Math.abs(e.top);
                                $(img[1]).css('background-position', '50% -' + max + 'px');
                            }
                            default: break;
                        }
                    }
                },
                onUpdate: function (e) {                    
                }
            }
        });

        this.AutoHeight();
    },
this.Init = function () {
    data.bxSliderMain = $('#Wrapper').bxSlider({
        useCSS: false,
        preloadImages: 'all',
        mode: 'vertical',
        infiniteLoop: false,
        speed: 800,
        pagerCustom: 'nav',
        controls: false,
        onSlideBefore: function ($slideElement, oldIndex, newIndex) {            
            $('#mask').show();
            if (newIndex != 0) $('header').removeClass('top');
            else $('header').addClass('top');

            $("#Slide" + (newIndex + 1)).mCustomScrollbar("scrollTo", "top");
        },
        onSlideAfter: function () {
            $('#mask').hide();
        }
    });
}
    this.AutoHeight = function () {
        data.fullHeight.outerHeight(data.win.height());
    }    
}

jQuery(function ($) {

    var _oldShow = $.fn.show;

    $.fn.show = function (speed, oldCallback) {
        return $(this).each(function () {
            var obj = $(this),
                newCallback = function () {
                    if ($.isFunction(oldCallback)) {
                        oldCallback.apply(obj);
                    }
                    obj.trigger('afterShow');
                };

            // you can trigger a before show if you want
            obj.trigger('beforeShow');

            // now use the old function to show the element passing the new callback
            _oldShow.apply(obj, [speed, newCallback]);
        });
    }
});