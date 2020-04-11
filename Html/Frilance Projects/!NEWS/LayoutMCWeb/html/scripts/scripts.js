$(function(){
    Browser.Init();
    Site.Init();    
})

$(window).load( function(){      
//    if (!Browser.isIE9() || !Browser.isIpad()) $(window).bind("resize", function(){ window.location.reload();});
    $(window).bind("orientationchange", function(){ window.location.reload();});
});


var Site = new function(){
  this.Init = function(){
            
      $(".activity-list .name-of-game").bind("click", function(){          
          var sr = $(this).closest("li").find(".space-results");
          var expression =  sr.find("ul").height()+parseInt(sr.css("padding-top"));
          
          sr.animate({"height":(parseInt(sr.height())== 0) ? expression : 0},500);
      });    

      var label = true;
      
      if ($("body").width() < 992 || $(".my-grid").height() > $("html").height())
          {
            if (!Browser.isIpad()){
              $("#base-container").mCustomScrollbar({
                live:true,            
                theme:"inset-dark",				
                axis:"y",
                scrollInertia:550,
                mouseWheel:{ enable: true },
                scrollbarPosition:"outside"
            });
            label = false;
          }          
      }
      
      $(".activity").show();      
      if ($(".mCSB_1_scrollbar").css("display")=="none" || label)
          {                     
              if (!Browser.isIpad())
                $("#activity-scrollbar").mCustomScrollbar({
                    live:true,            
                    theme:"inset-dark",				
                    axis:"y",
                    scrollInertia:550,
                    mouseWheel:{ enable: true },
                    scrollbarPosition:"outside"
                });        
              
            this.AutoHeight();  
          }     
      else
          {
              
          }
            
      this.toScroll(0,1);
            
    $(".first-last").bind("click", function(){          
        Site.toScroll($(this).scrollTop(),null);            
    });     
      
  };  
    
 this.AutoHeight = function () {
         var obj=$(".activity-scrollbar");
         var r = $("body").height() - $(".activity-scrollbar").offset().top;
         obj.css("height",r+"px");
    }   
     
 this.toScroll = function(position, posText){
     
        var t = $(".first-last");
        var str = t.data("text").split(";");         
        var param = null;
     
        if (posText!=null)
            {
                t.text(str[posText]);
            }                              
        else{
            //change text
            
                if (str[0]== t.text())
                {
                    param = 0;
                    t.text(str[1]);
                }
                  else {
                        param =  $(".activity").offset().top+"px";        
                        t.text(str[0]);
                  }
            $('body,html').animate({scrollTop: param }, 500);
        }
     }
    
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
        if (ua.indexOf('msie 8.') > 0) { data.$b.addClass("ie8"); }
        if (ua.indexOf('msie 9.') > 0) { data.$b.addClass("ie9"); }
        if (ua.indexOf(' OPR/') > 0) { data.$b.addClass("Opera"); }

        //IE10 -- IE 11
        if (ua.indexOf('MSIE 10.') > 0) { data.$b.addClass("ie10"); }
        else if ((ua.indexOf('Trident') > 0) && (navigator.userAgent.indexOf('rv:11.') > 0)) data.$b.addClass("ie11"); //IE11     
        
    };
    this.isCol_xs = function(){
        return (data.$b.width() < 768) ? true : false;
    };
    this.isCol_sm = function(){
        return (767 < data.$b.width()  && data.$b.width() < 992 ) ? true : false;
    };
    this.isCol_md = function(){
        return (992 < data.$b.width()  && data.$b.width() < 1200 ) ? true : false;
    };
    this.isCol_lg = function(){
        return (data.$b.width() > 1200) ? true : false;
    };
    
    this.isIpad = function () {        
        return (data.$b.hasClass("iPad")) ? true : false;
    };
    this.isIE9 = function () {
        return (data.$b.hasClass("ie9")) ? true : false;
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
