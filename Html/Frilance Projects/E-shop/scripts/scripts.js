var b = null;

$(document).ready(function () {
    b = $("body");

    IsBrowser();
    DDL.Init();

    setToggleInputs();

 window.Lightbox = new jQuery().visualLightbox({autoPlay:false,borderSize:16,classNames:'vlightbox0',descSliding:true,enableRightClick:false,enableSlideshow:true,prefix:'vlb0',resizeSpeed:7,slideTime:4,startZoom:true}) 
	
    
 	$("input[data-dialog='true']").click(function () { $('.dialog').show(); });
	$('.dialog a.exit').click(function (e) { e.preventDefault(); $('.dialog').hide(); });
 
  

    $(".radiobox span.radio_box,.basket7 span.radio_box").bind("click", function () {
	
        var t = $(this);
        var a = "active";
        var group = t.data("group");
        if (!t.hasClass(a)) {
            $("span.radio_box[data-group='" + group + "']").removeClass(a);
            t.addClass(a);
        }
        else t.removeClass(a);
    });

    $(".contactblock2td2 a").bind("click", function () {

    var t = $(this).find("span");
        var a = "active";
        var group = t.data("group");
        if (!t.hasClass(a)) {
            $("span.radio_box[data-group='" + group + "']").removeClass(a);
            t.addClass(a);
        }
        else t.removeClass(a);
    });


    $("span.checkbox").bind("click", function () {
        var t = $(this);
        var a = "active";
        var group = t.data("group");
        if (!t.hasClass(a)) { t.addClass(a); }
        else t.removeClass(a);
    });
	
	 $(".leftmenu > li a").bind("click", function () {
        var t = $(this).parent();
        var a = "active";
        if (!t.hasClass(a)) { t.parent().find(">li").removeClass(a); t.addClass(a); } else t.removeClass(a);
    });
	
		 $(".smalfotos > a").bind("click", function (e) {
			 e.preventDefault();
        var href=$(this).attr("href");
		var src=$(this).find("img").attr("src");
		
		$(".oneprodfoto a").attr("href",href);
				$(".oneprodfoto img").attr("src",src);
    });
	
	
	
	
	
				$(window).load(function(){
				$("#content_1").mCustomScrollbar({
					scrollInertia:630,
					horizontalScroll:true,
					mouseWheelPixels:220,
					scrollButtons:{
						enable:true,
						scrollType:"pixels",
						scrollAmount:220
					}
				});

			});
	
	
	
	
	
	
	
				
});

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
    if(!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) { b.addClass("Safari"); }
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




