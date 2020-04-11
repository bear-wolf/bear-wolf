$(function () {
    Site.Init();
    Site.DynamicEvent();
});


var Site = new function () {
    var data = {
        fullHeight: null,
        win: $(window),
        bxSliderMain: null,
        init: function () {
            this.fullHeight = $('.fullHeight');
            this.win = $(window);
        }
    };

    this.DynamicEvent = function () {
        var func = this;
        data.init();

        this.AutoHeight();

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

        data.win.keydown(function (event) {
            //console.log(event.keyCode)
            if (event.keyCode == 38) data.bxSliderMain.goToPrevSlide();
            else if (event.keyCode == 40) data.bxSliderMain.goToNextSlide();
        });

        $("body").on('mousewheel', function (e) {            
            (e.deltaY > 0) ? data.bxSliderMain.goToPrevSlide() : data.bxSliderMain.goToNextSlide(); // true - колесо вниз; false - вверх
        });

        $("input[type=file]").nicefileinput();

        $(".checkboxLabel").bind("click", function () {
            debugger;
            var t = $(this);
            var icon = t.find(".icon");
            var nameClass = "active";

            if (t.attr("id") == "LocationVerify") {
                var obj = $("#LocationChecked");

                if (icon.hasClass(nameClass)) { icon.removeClass(nameClass); obj.removeClass(nameClass).hide("slow"); }
                else { icon.addClass(nameClass); obj.addClass(nameClass).show("slow"); }
            }
            else {
                if (icon.hasClass(nameClass)) { icon.removeClass(nameClass); }
                else icon.addClass(nameClass);
            }
        });


        $("section").mCustomScrollbar({
            advanced: { updateOnContentResize: true },
            callbacks: {
                onScrollStart: function (e) {
                    if (e.top == 0) {
                        var numberPage = data.bxSliderMain.getCurrentSlide();
                        $("nav a[data-slide-index='" + numberPage + "']").each(function () {
                            var a = "active";
                            $(this).closest("nav").find("a").removeClass(a);
                            $(this).addClass(a);
                        });
                    }
                },
                whileScrolling: function (e) {

                    //if (e.top != 0) {
                    //    var slide = [null, $("#Slide1"), $("#Slide2")];
                    //    switch (data.bxSliderMain.getCurrentSlide()) {
                    //        case 1: {
                    //            var img = [".slideTwo .float-left", ".slideTwo .figure-center", ".slideEleven .side-full"];
                    //            $(img[0]).css('background-position', 'center ' + e.top + 'px');
                    //            var max = parseInt($(img[1]).css("max-height")) - Math.abs(e.top);
                    //            $(img[1]).css('background-position', '50% -' + max + 'px');
                    //        }
                    //        default: break;
                    //    }
                    //}
                },
                onUpdate: function (e) {
                }
            }
        });
    };
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
                $("#Slide" + (newIndex + 1)).mCustomScrollbar("scrollTo", "top");
            },
            onSlideAfter: function () {
                //$('#mask').hide();
            }
        });


        $('.bxslider').bxSlider();
        /*{
            startSlide: 7,
            minSlides: 7,
            maxSlides: 15,
            moveSlides:7
        })*/
    };
    this.AutoHeight = function () {        
        data.fullHeight.outerHeight(data.win.height());
    }
}