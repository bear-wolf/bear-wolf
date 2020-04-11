var b = null;

$(document).ready(function () {
    b = $("body");
    Menu.Init($("ul.level0"));
    Menu.Level($("ul.level0"), 5);

    setToggleInputs();
    var Slider1 = ".BigPhotoSlider";
    var Slider2 = ".ObjectSlider";
    var Slider3 = ".SpaceSlider";
    var Slider4 = ".Pokoje";
    var Slider5 = ".Exterier";
    var Slider6 = ".Okoli";

    var Slider7 = ".FOTOGALERIE";
    var Slider8 = ".BigDetail";
    var Slider9 = ".TwoSlider";

    var Slider11 = ".DetailService";
    var Slider12 = ".MainSmallSlider";    
        
    $("img.inBigImages").each(function () {
        var t = $(this);
        t.wrap("<a></a>");
        t.parent().attr("href", t.attr("src"));        
        t.parent().attr("title", t.attr("title"));
        t.parent().addClass("inBigImages");        
        t.parent().unbind("click");

        $('a.inBigImages').lightBox(); // start
    });

    $(".datepicker").datepicker($.datepicker.regional["cs"]);
    
    $(Slider1 + ' .BaseSlider').slider({ Current: Slider1, navigation: Slider1 + " .Navigation", speed: 800, placePager: "#PlacePager1", slide: 5, border: true, elements_one: 136 });
    $(Slider2 + ' .BaseSlider').slider({ Current: Slider2, navigation: Slider2 + " .Navigation", speed: 800, placePager: "#PlacePager2", slide: 6, border: true, elements_one: 131 });
    $(Slider3 + ' .BaseSlider').slider({ Current: Slider3, navigation: Slider3 + " .Navigation", speed: 800, placePager: "#PlacePager3", slide: 6, border: true, elements_one: 131 });
    $(Slider4 + ' .BaseSlider').slider({ Current: Slider4, navigation: Slider4 + " .Navigation", speed: 800, placePager: "#PlacePager4", slide: 6, border: true, elements_one: 131 });
    $(Slider5 + ' .BaseSlider').slider({ Current: Slider5, navigation: Slider5 + " .Navigation", speed: 800, placePager: "#PlacePager5", slide: 6, border: true, elements_one: 131 });
    $(Slider6 + ' .BaseSlider').slider({ Current: Slider6, navigation: Slider6 + " .Navigation", speed: 800, placePager: "#PlacePager6", slide: 6, border: true, elements_one: 131 });
    $(Slider7 + ' .BaseSlider').slider({ Current: Slider7, navigation: Slider7 + " .Navigation", speed: 800, placePager: "#PlacePager2", elements_path: "li.FGItem1", absolute_path: Slider7 + " #PhotoGallery", slide: 5, border: true, elements_one: 158 });
    $(Slider8 + ' .BaseSlider').slider({ Current: Slider8, navigation: Slider8 + " .Navigation", elements_path: ".BaseList li.BDItem", speed: 800, absolute_path: Slider8+ " .absolute", placePager:"#PlacePagerPhoto", slide: 1, elements_one: 951 });
    $(Slider11 + ' .BaseSlider').slider({ Current: Slider11, navigation: Slider11 + " .Navigation", elements_path: "li.DSLItem", speed: 800, placePager: "#DetailServicePager", slide: 1, elements_one: 773 });    
    $(Slider9 + ' .BaseSlider.F1').slider({ Current: Slider9, navigation: Slider9 + " .Navigation", elements_path: "li.ItemSL1", speed: 800, placePager: "#TwoSliderPager", slide: 1, elements_one: 762, ItemClick: false, border: false });

    var MainSlider1 = ".MainItemSlider1";
    var MainSlider2 = ".MainItemSlider2";
    var MainSlider3 = ".MainItemSlider3";
    var MainSlider4 = ".MainItemSlider4";    
    $(MainSlider1).find('.BaseSlider').slider({ Current: MainSlider1, navigation: MainSlider1 + " .Navigation", elements_path: "li.ItemSlider1", speed: 800, placePager: ".Pager", slide: 6, elements_one: 128, border: true, BigImages: ".BaseImagesSlider1" });
    $(MainSlider2).find('.BaseSlider').slider({ Current: MainSlider2, navigation: MainSlider2 + " .Navigation", elements_path: "li.ItemSlider2", speed: 800, placePager: ".Pager", slide: 6, elements_one: 128, border: true, BigImages: ".BaseImagesSlider2" });
    $(MainSlider3).find('.BaseSlider').slider({ Current: MainSlider3, navigation: MainSlider3 + " .Navigation", elements_path: "li.ItemSlider3", speed: 800, placePager: ".Pager", slide: 6, elements_one: 128, border: true, BigImages: ".BaseImagesSlider3" });
    $(MainSlider4).find('.BaseSlider').slider({ Current: MainSlider4, navigation: MainSlider4 + " .Navigation", elements_path: "li.ItemSlider4", speed: 800, placePager: ".Pager", slide: 6, elements_one: 128, border: true, BigImages: ".BaseImagesSlider4" });
  
    IsBrowser();
    DDL.Init();    
        
    $(".Exit").bind("click", function () {
        var d = ".Dialog";
        var a = "Active";
        if ($(d).hasClass(a)) { $(d).removeClass(a); };
    });

    $(".Reset").bind("click", function () {
        var t = $(this);
        t.parent().find("textarea").val("");
        return false;
    });

    $("span.sCheckbox").bind("click", function () {
        var t = $(this);
        var a = "Active";
        if (!t.hasClass(a)) { t.addClass(a); } else t.removeClass(a);
    });

    $("span.sRadiobox").bind("click", function () {
        var t = $(this);
        var a = "Active";
        var group = t.data("group");
        if (!t.hasClass(a)) {
            $("span.sRadiobox[data-group='" + group + "']").removeClass(a);
            t.addClass(a);
        }
        else t.removeClass(a);
    });
        
    $(".table").hover(
        function () {
            $(this).addClass("Hover");
        },
        function () {
            $(this).addClass("OldHover");
            $(this).removeClass("Hover");
        }
    );

	$(".greenchkbox").bind("hover", function () {        
        var t=$(".greenchkbox:eq(0)").parent().find('.secondtd');
	    if (!t.hasClass('gray')) { t.addClass('gray'); } else t.removeClass('gray');
	});

	$(".greenchkbox span.sCheckbox").unbind("click");

	$(".greenchkbox span.sCheckbox").bind("click", function () {
	    var t = $(this);
	    var a = "Active";
	    var gr = "greenfon";
	    var g = t.parent().parent().parent().find('td.secondtd');
	    if (!t.hasClass(a)) {
	        t.addClass(a);
	        g.addClass(gr);
	    } else {
	        t.removeClass(a);
	        g.removeClass(gr);
	    }	            
	});	

	$(".Sorted ul li span").bind("click", function () {
	    var t = $(this);
	    var a = "Active";	    
	    if (t.hasClass(a)) { t.removeClass(a); }
	    else t.addClass(a);
	});
	
	$(".element b").bind("click", function (e) {
	    var t = $(this);
	    t.parent().hide();
	});
    
    $(".leftmenu > li > a").bind("click", function (e) {        
		e.preventDefault();
        var t = $(this).parent();
        var a = "Active";
        var b = "leftmenu";
        var l = $(".leftmenu > li");
        if (!t.hasClass(a)) { l.removeClass(a); t.addClass(a); } else t.removeClass(a);
    });

    $(".leftmenu .submen a").bind("click", function (e) {
        var t = $(this).parent();
        var a = "Active";
        if (!t.hasClass(a)) { t.addClass(a); } else t.removeClass(a);
    });    	
    
});


Menu = {
    Level: function (_, count) {
        var t = this;
        var Level = [$(_).find(".level1"), $(_).find(".level2"), $(_).find(".level3"), $(_).find(".level4"), $(_).find(".level5")];
        var w;
        var minwidth;
        for (var i = 0; i < count - 1; i++) {
            if (Level[i + 1] == undefined) return;
            Level[i + 1].css("width", Level[i].width());
            Level[i + 1].css("left", Level[i].width()-2);
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
    //iPad
    if (navigator.userAgent.match(/iPad/i) != null) { $("html").addClass(iClass); return; }

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
