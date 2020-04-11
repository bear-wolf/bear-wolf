
$(function(){
    
    Browser.Init();
    Site.Init();
    
  //Enable swiping...
    $(".carousel-inner").swipe( {
        //Generic swipe handler for all directions
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            $(this).parent().carousel('next'); 
        },
        swipeRight: function() {
            $(this).parent().carousel('prev'); 
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:0
    });    
    
  $(".call-back-form").each(function(){
		var it = $(this);
		it.validate({
			rules: {
				name: { required: true },
				phone: { required: true }
			},
			messages: {

			},
			errorPlacement: function(error, element) {

			},
			submitHandler: function(form) {
				var thisForm =$(form);

				$.ajax({
					type: "POST",
					url: "main.php",
					data: thisForm.serialize()
				}).done(function() {
					$(this).find("input").val("");
//                    alert("Письмо отправленно!");
					$.fancybox({
						href: '#thanks'
					});
					setTimeout(function() {
						$.fancybox.close();
					},3000);
					$(".call-back-form").trigger("reset");
				});
				return false;
                
                

			},
			success: function() {

			},
			highlight: function(element, errorClass) {
				$(element).addClass('error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass('error');
			}
		})
	});
    
})

var Site = new function(){
  this.Init = function(){
      var clazz = "small-extention";
      var obj = $(".flowers-top");
      if ($(window).width() != $("body").width()) {          
          obj.addClass(clazz);
      } else obj.removeClass(clazz);
      
      if (Browser.getData().is.mobile)
          {
              if ($(window).width() == $("body").width()) {          
                  obj.addClass(clazz);
              } else obj.removeClass(clazz);
          }      
  };      
};


var Browser = new function () {
    var data = {
        $b: null,
        is: {
            mobile: false,
            Andorid: false,
            iPod: false
        }
    }
    this.getData = function()
    {
        return data;
    };
    this.Init = function () {
        var t = this;
        data.$b = $("body");
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("ipad") > 0) { data.$b.addClass("iPad"); data.is.mobile = true; }
        else if (ua.indexOf("android") > 0) { data.$b.addClass("Android"); data.is.mobile = true; data.is.Andorid = true; }
        else if (ua.indexOf("ipod") > 0) { data.$b.addClass("iPod"); data.is.mobile = true; data.is.iPod = true; }

        if (ua.indexOf('firefox') > 0) { data.$b.addClass("Firefox"); }
        if (data.is.mobile) t.Orientation();

        if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) { data.$b.addClass("Safari"); }
        if (ua.indexOf('MSIE 8.') > 0) { data.$b.addClass("ie8"); }
        if (ua.indexOf('MSIE 9.') > 0) { data.$b.addClass("ie9"); }
        if (ua.indexOf(' OPR/') > 0) { data.$b.addClass("Opera"); }

        //IE10 -- IE 11
        if (ua.indexOf('MSIE 10.') > 0) { data.$b.addClass("ie10"); }
        else if ((ua.indexOf('Trident') > 0) && (navigator.userAgent.indexOf('rv:11.') > 0)) data.$b.addClass("ie11"); //IE11     
    };
    this.isIpad = function () {
        return (data.$b.hasClass("iPad"));
    };
    this.isIPhone = function () {
        return (data.$b.hasClass("iPhone"));
    };
    this.isAndroid = function () {
        return (data.$b.hasClass("Android"));
    };

    this.Orientation = function () {
        var or = ["orX", "orY"];
        var c = [data.$b.innerHeight(), data.$b.innerWidth()]
        if (c[0] > c[1]) {
            data.$b.removeClass(or[0]);
            data.$b.addClass(or[1]);
        } else {
            data.$b.removeClass(or[1]);
            data.$b.addClass(or[0]);
        }

    };
    this.ViewPort = function (def) {
        var v = document.querySelector("meta[name=viewport]");
        if (def == null) {
            if (data.is.Andorid) {
                v.setAttribute('content', 'width=1024, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
            }
            else
                if (data.is.iPod) {
                    v.setAttribute('content', 'width=900, user-scalable=1');
                }
        }
        else v.setAttribute('content', def);
    }
}
