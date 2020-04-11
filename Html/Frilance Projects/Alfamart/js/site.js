$(document).ready(function() {

/*------------simple menu-------------*/						   
	$("#menu_top > li > a").wrapInner('<span><span></span></span>');
	/*$("#menu_top > li > a > span > span").each(function(){
			$(this).width($(this).width()+20);
		});*/
	$("#menu_top li").hover(function(){
		$(this).addClass('hover');
		$(this).find("ul:first").fadeIn("fast");
	},function(){
		$(this).removeClass('hover');
		$(this).find("ul:first").fadeOut("fast");
	});
	
	$('.online_cons').click(function(){
			$('.callback_form').fadeToggle(300);
			return false;
		});
	
	$(".cat_menu_wr").hover(function(){
		$('.cat_menu').stop( true, true ).slideDown(300);
	},function(){
		$('.cat_menu').stop( true, true ).slideUp(300);
	});	
	
	$(".cat_menu > li > ul > li:first-child").append('<span class="arw"></span>');
	$(".cat_menu > li > ul > li").children('ul').parent().addClass('nxt_lvl');
	
	$(".cat_menu > li").hover(function(){
		$(this).addClass('hover');
		$(this).find("ul:first").fadeIn("fast");
	},function(){
		$(this).removeClass('hover');
		$(this).find("ul:first").fadeOut("fast");
	});	
	
	$(".cat_menu > li > ul > li").hover(function(){
		$(this).addClass('hover');
		var ul1 = $(this).find("ul:first");
		$(ul1).fadeIn("fast");		
		$(this).parent().css('height',$(ul1).outerHeight(true));
	},function(){
		$(this).removeClass('hover');
		$(this).parent().css('height','auto');
		$(this).find("ul:first").fadeOut("fast");
	});		
	
	$('.btns_list a').each(function(){
			var hh1 = $(this).children('.inf_pad').height();
			var hh2 = $(this).height();
			$(this).children('.inf_pad').css('padding-top', parseInt((hh2-hh1)/2) );
		});
		
	$('.banner_img').each(function(){
			$(this).css('margin-left',parseInt(-($(this).width())/2));
		});

/*-------------accordion menu-----------*/
	$(".side_menu li").children("ul").parent("li").addClass("nxt_lvl");
	$(".side_menu li.active").children("ul").slideDown("fast");
	$('.side_menu li.nxt_lvl').append('<span class="dropdown"></span>');
	var currentListItem = $("#side_menu").find("li.active");
	$('.side_menu li > span.dropdown, .side_menu li > a ').click(function(){
		var newCurrentListItem = $(this).parent();																		  
		var currentDropDown = newCurrentListItem.children("ul");
		if (newCurrentListItem.is(currentListItem)) {
			$(currentListItem).removeClass("active");
			$(currentDropDown).slideUp("fast");
			currentListItem = null;
		} else {
			if ($(newCurrentListItem).hasClass('active')) 
				{
					$(currentDropDown).slideUp("fast");
					$(newCurrentListItem).removeClass("active");
				} 
				else 
				{
					currentDropDown.slideDown("fast");
					$(newCurrentListItem).siblings('li').add($(newCurrentListItem).find('li')).removeClass("active");
					currentListItem = newCurrentListItem;
					currentListItem.closest('ul').find('ul').not(currentDropDown).slideUp("fast");
					currentListItem.addClass("active");					
				}
		}
		if ($(newCurrentListItem).is('.nxt_lvl')) {return false;}
		});

/*-----------static-------------*/
	$("div.text").append("<div class='clear'></div>");
	$('div.text tbody tr:odd').addClass('even');

/*----------check box----------*/	
	function changeCheck(el){
	     var el = el,
		    input = el.find("input").eq(0);		
		if(!input.attr("checked")) {
			el.css({backgroundPosition:'0 -18px'});
			input.attr("checked", true)
			} else {
			el.css({backgroundPosition:'0 0'});	
			input.attr("checked", false)
			}
	return true;};
	
	function changeCheckStart(el)
	{var el = el,
			input = el.find("input").eq(0);
		 el.find('span').prepend(el.find("input").attr('value'));			
		if(input.attr("checked")) {
			el.css({backgroundPosition:'0 -18px'});
			}
		if(input.attr("disabled"))
			{el.fadeTo(100,0.6);};			
	     return true;};		 
	
	jQuery(".niceCheck").click(	function() { changeCheck(jQuery(this));	});
	jQuery(".niceCheck").each(	function() { changeCheckStart(jQuery(this));});	
	
/*----end-------checkbox------------------*/

/*--------radiobutton-------------*/
	function rCheck(obj) {
		if (!(obj.attr("change"))) {
			obj.closest('form').find('input[name='+ obj.attr('name') +']').removeAttr("change").parent().removeClass('r-chd');
			obj.parent().addClass('r-chd');
			obj.attr("change","change");	
		}
	}	
  	$("input[type=radio]").each(function() {
		var obj = $(this);
		if ((obj.attr("change"))) {
			obj.closest('form').find('input[name='+ obj.attr('name') +']').removeAttr("change").parent().removeClass('r-chd');
			obj.parent().addClass('r-chd');
			obj.attr("change","change");	
		}
		obj.click(function() {rCheck(obj)}).parent().addClass("radio");
	});
/*---------------------------------*/

	$('.item_tab .ui-tabs-nav a span , .buy_btn > span , .btn , .big_btn > span').each(function(){
			if ( (($(this).outerWidth(true))%2) == 1 ) {
					var ww = $(this).width();
					ww++;$(this).width(ww);
				}
		});
		
	$('.ft_pad .wr2').each(function(){
			if ( (($(this).outerHeight(true))%2) == 1 ) {
					var ww = $(this).height();
					ww++;$(this).height(ww);
				}
		});	
		
	$('.item_list4 .item').each(function(){
			$(this).find('.buy_btn span').each(function(){
					if ( (($(this).outerWidth(true))%2) == 1 ) {
							var ww = $(this).width();
							ww++;$(this).width(ww);
						}
				});
			$(this).find('.btm_pad').width( $(this).find('.buy_btn').outerWidth(true) + $(this).find('.det').width() + 10 );				
			$(this).find('.hidden_pad').hide(0);
		});

	$('.item_list4 .item').hover(function(){
			$(this).addClass('hover');
			$(this).find('.hidden_pad').slideDown(200);
		},function(){
			$(this).removeClass('hover');
			$(this).find('.hidden_pad').slideUp(200);
		});		
		
	$('.item_tab').tabs();
	$('.spinner').spinner({min:0});

	$('#slider').cycle({ 
	    speed:  '300', 
	    timeout: 3000, 
	    pager:  '#nav' ,
		timeout: 0, 
		slideResize:   0
	});
	
	$('.img_slider').cycle({ 
	    speed:  '500',
		timeout: 0,  
		slideResize:   0
	});	
	
	$('.slider_lbtn').click(function(){
		$(this).closest('.img_pad').find('.img_slider').cycle('prev');
		return false;
		});
	$('.slider_rbtn').click(function(){
		$(this).closest('.img_pad').find('.img_slider').cycle('next');
		return false;
		});
		

	$('.rate1').rating({
		fx: 'full',
        image: 'images/stars.png',
        width: 15,
		url: 'rating.php'
	});	
	
/*----jcarousel----------*/
	$('.jcarousel').jcarousel({
		'wrap':'circular'
	}).jcarouselAutoscroll({
		'interval': 4000
	});
	
	$('.item_det .img_list a').click(function(){
			var img_src = $(this).attr('href');
			var gal_src = $(this).attr('rel');
			var img_title = $(this).attr('title');
			$(this).closest('.img_pad').find('.big_img img').attr('src',img_src);
			$(this).closest('.img_pad').find('.big_img').attr('href',gal_src);
			$(this).closest('.img_pad').find('.big_img').attr('title',img_title);
			return false;
		});	
	

		$("a[rel^='prettyPhoto']").prettyPhoto({
			animation_speed: 'fast', /* fast/slow/normal */
			slideshow: 5000, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: true, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			default_width: 500,
			default_height: 344,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			horizontal_padding: 90, /* The padding on each side of the picture */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
			overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
			callback: function(){}, /* Called when prettyPhoto is closed */
			ie6_fallback: true,
			markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_content_container"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<div class="pp_details"> \
											<p class="pp_description"></p> \
											{pp_social} \
										</div> \
										<a class="pp_close" href="#">Close</a> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
									</div> \
								</div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
			gallery_markup: '<div class="pp_gallery"> \
								<a href="#" class="pp_arrow_previous">Previous</a> \
								<div> \
									<ul> \
										{gallery} \
									</ul> \
								</div> \
								<a href="#" class="pp_arrow_next">Next</a> \
							</div>',
			image_markup: '<img id="fullResImage" src="{path}" />',
			flash_markup: '',
			quicktime_markup: '',
			iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
			inline_markup: '<div class="pp_inline">{content}</div>',
			custom_markup: '',
			social_tools: false /* html or false to disable */
		});
		
		$(".item_det a[rel^='prettyPhoto']").prettyPhoto({
			animation_speed: 'fast', /* fast/slow/normal */
			slideshow: 5000, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: true, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			default_width: 500,
			default_height: 344,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default prod_theme', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			horizontal_padding: 90, /* The padding on each side of the picture */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
			overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
			callback: function(){}, /* Called when prettyPhoto is closed */
			ie6_fallback: true,
			markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_content_container"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<div class="pp_details"> \
											<p class="pp_description"></p> \
											{pp_social} \
										</div> \
										<a class="pp_close" href="#">Close</a> \
										<div class="btn_pad"><a href="#" class="big_btn basket_btn"><span><span>В корзину</span></span></a></div>\
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
									</div> \
								</div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
			gallery_markup: '<div class="pp_gallery"> \
								<a href="#" class="pp_arrow_previous">Previous</a> \
								<div> \
									<ul> \
										{gallery} \
									</ul> \
								</div> \
								<a href="#" class="pp_arrow_next">Next</a> \
							</div>',
			image_markup: '<img id="fullResImage" src="{path}" />',
			flash_markup: '',
			quicktime_markup: '',
			iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
			inline_markup: '<div class="pp_inline">{content}</div>',
			custom_markup: '',
			social_tools: false /* html or false to disable */
		});		
		
		$(window).resize(function() {
			$('.rc3 .rc_grad').each(function(){
					$(this).css('height','auto');
					$(this).height( $('.col2').height() );
				});
		/*	$("#menu_top > li > a > span > span").each(function(){
					$(this).css('width','auto');
					$(this).width($(this).width()+20);
				});				*/
		});

	$('.rc3 .rc_grad').each(function(){
			$(this).height( $('.col2').height() );
		});


/*---simple-tooltip-------*/
var tooltip_structure='<div id="tooltip"><span class="tooltip_wr"> <span class="arw">&nbsp;</span> <span class="txt">&nbsp;</span> </span></div>';
/*$('body').append(tooltip_structure);*/

function show_ttip() {
var titl = $(this).attr('title');
$(this).removeAttr('title'); 
$(this).append(tooltip_structure);
$("#tooltip").fadeIn(100).find('.txt').html(titl); 
}
/*function move_ttip(kmouse) {
$("#tooltip").css({left:kmouse.pageX+30, top:kmouse.pageY-35});
}*/
function hide_ttip() {
$(this).attr('title',$('#tooltip .txt').html()).find('#tooltip').remove();
$("#tooltip").fadeOut('fast');
}
$(".tooltip").mouseenter(show_ttip);
/*$(".tooltip").mousemove(move_ttip); */
$(".tooltip").mouseleave(hide_ttip); 
/*--end--tooltip-------*/

/*-------simple modal--------------*/
	$('.basket').click(function(){
		$("#window1").modal({
			overlayClose:true,
			closeClass:'modalClose',
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {dialog.data.hide();dialog.container.fadeIn('fast', function () {dialog.data.fadeIn('fast');});});
				},
			onClose: function (dialog) {
				dialog.data.fadeOut('fast', function () {dialog.container.hide('fast', function () {dialog.overlay.fadeOut('fast', function () {$.modal.close();});});})
				}
		});	
		return false;
    });


/*--------------------------------------------------------------------*/
/*product color_rameters hover function*/
	$('.with_img').hover(function(){
		$(this).addClass('hover');
		$(this).find('input , .radio_bimg').filter(':not(:animated)').animate({width:100,height:100,left:-31},300,function(){});
		$(this).find('.bd').filter(':not(:animated)').animate({width:98,height:98,left:-31},300);
	},function(){
		$(this).find('input , .radio_bimg').animate({width:40,height:40,left:0},300,function(){
				$(this).closest('.with_img').removeClass('hover');
			});		
		$(this).find('.bd').animate({width:38,height:38,left:0},300);
	});

/*---simple-tooltip-------*/
var tooltip_structure='<div id="tooltip2"> <span class="arw">&nbsp;</span> <span class="txt">&nbsp;</span> </div>';
$('body').append(tooltip_structure);

function show_ttip() {
var titl = $(this).attr('title');
var posx = $(this).offset().left;
var posy = $(this).offset().top;
$(this).removeAttr('title'); 
$("#tooltip2").css({left:posx+32, top:posy-30});
$("#tooltip2").fadeIn(100).children('.txt').html(titl); 
}
function hide_ttip() {
$(this).attr('title',$('#tooltip .txt').html());
$("#tooltip2").fadeOut('fast');
}
$(".tooltip2").mouseenter(show_ttip);
$(".tooltip2").mouseout(hide_ttip); 
/*--end--tooltip-------*/	
	
});
