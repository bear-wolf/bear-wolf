jQuery(document).ready(function() {
    Site.SetToggleInputs();
    slider();
    $('.gallery a').lightBox();
    //$('.TopGallery a.fridays').lightBox();    
    //$("div.QueryDialog").hide();
});

var Site = new function() {
    this.Clouse = function(IdElement) {
        $("#" + IdElement).hide(1000);        
    }

    this.SetToggleInputs = function() {
        jQuery("[class*='toggle-inputs']").each(function(i) {

            var defaultValue = jQuery(this).val();

            jQuery(this).bind("click", function() {
                if (jQuery(this).val() == defaultValue) {
                    jQuery(this).val('');
                }
            });

            jQuery(this).bind("focus", function() {
                if (jQuery(this).val() == defaultValue) {
                    jQuery(this).val('');
                }
            });

            jQuery(this).bind("blur", function() {
                if (jQuery(this).val() == '') {
                    jQuery(this).val(defaultValue);
                }
            });

        });

        return true;
    }

    this.ShowBlock = function(element) {
        //Показуємо блок
        $(element).show();
    }
    this.HideBlock = function(element) {
        //Ховаємо блок
        $(element).hide();
    }

    this.QueryDialog = function(element, clas) {
        $("." + clas + " input").val($(element).attr("idelement"));
    }

    this.onchangeFile = function(element) {
        //AlexBaranov
        $(element).parent().find("span").addClass("ok");
        $(element).parent().find("span").addClass("not");
        //alert("ol=" + $(element).parent().find("span").html());
    }

}

// Горизонтальний слайдер фотографій
function slider() {
    //Set Default State of each portfolio piece    
    //$(".paging").show();
    
    Pager = function(){
		var NewPager = "<div style='display: none;' class='paging'>";
		var count = $(".Relative .absolute li").size();		
		for(i=1; i<=count; i++)
		{
			NewPager = NewPager + "<a href='#' rel='"+i+"'>"+(i+1)+"</a>"
		}		
		NewPager = NewPager + "</div>";
		$(".Slider .Navigation").append(NewPager);				
    };
    
    Pager();
    $(".paging a:first").addClass("active");    
    $(".Slider .Navigation a.ArrowLeft").addClass("last");
    
    var imageWidth = $(".Relative").width();
    var imageSum = $(".Relative li").size();
    imageSum = 164;
    var imageReelWidth = imageWidth * imageSum;

    //Adjust the image reel to its new size
    $(".Relative .absolute").css({ 'width': imageReelWidth });
    
    //Paging + Slider Function
    rotate = function() {
        var triggerID = $active.attr("rel") - 1; //Get number of times to slide
        var image_reelPosition = triggerID * imageSum; //Determines the distance the image reel needs to slide

        $(".paging a").removeClass('active'); //Remove all active class
        $active.addClass('active'); //Add active class (the $active is declared in the rotateSwitch function)
		
		var i = $(".paging a.active").index();
		$(".Relative .absolute li").removeClass("active");
		$(".Relative .absolute li").eq(i).addClass("active");
		
        //Slider Animation
        $(".Relative .absolute").animate({
            left: -image_reelPosition
        }, 1000);

    };

    //Rotation + Timing Event
    rotateSwitch = function() {
        play = setInterval(function() { //Set timer - this will repeat itself every 3 seconds
            $active = $('.paging a.active').next();
            if ($active.length === 0) { //If paging reaches the end...
                $active = $('.paging a:first'); //go back to first
            }
            rotate(); //Trigger the paging and slider function
        }, 7000); //Timer speed in milliseconds (3 seconds)
    };

    rotateSwitch(); //Run function on launch

    //On Hover
    $(".absolute li").hover(function() {
        clearInterval(play); //Stop the rotation
    }, function() { rotateSwitch(); }); //Resume rotation

    //On Click
    $(".ArrowLeft").click(function() {				
        $active = $(".paging a.active").prev();
        if ($(".Slider .Navigation a.ArrowLeft").hasClass("last")) {return false;}
        
        if ($($active).attr("rel") == 1) { $(".Slider .Navigation a.ArrowLeft").addClass("last");}        
        $(".Slider .Navigation a.ArrowRight").removeClass("last");
        
        //Reset Timer
        clearInterval(play); //Stop the rotation
        rotate(); //Trigger rotation immediately
        rotateSwitch(); // Resume rotation
        return false; //Prevent browser jump to link anchor
    });

    $(".ArrowRight").click(function() {        
        $active = $('.paging a.active').next();
        var Sum = $(".paging a").size();        
        if ($(".Slider .Navigation a.ArrowRight").hasClass("last")) {return false;}
        if ($($active).attr("rel") == Sum) {$(".Slider .Navigation a.ArrowRight").addClass("last");}
        $(".Slider .Navigation a.ArrowLeft").removeClass("last");

        //Reset Timer
        clearInterval(play); //Stop the rotation
        rotate(); //Trigger rotation immediately
        rotateSwitch(); // Resume rotation
        return false; //Prevent browser jump to link anchor
    });    		    
    
    /*$(".Relative .absolute li").click(function() {
		//var act = $(".Relative .absolute li.active").index();
		//alert('int ='+act);		
		return false;
	});*/
}