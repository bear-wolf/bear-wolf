$(function(){
    
    Site.Init();
})

var Site = new function(){
  this.Init = function(){
            
      $(".activity-list .name-of-game").bind("click", function(){
          var t = $(this);
          
          var sr = t.closest("li").find(".space-results");
          var newHeight = (parseInt(sr.height())== 0) ? sr.animate({"height":sr.find("ul").height()},500) : 0;              
          
          sr.animate({"height":newHeight},500);
      });    
            
      
      if ($("body").width()>1024)
          {
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
  };  
    
     this.AutoHeight = function () {         
        var obj=$(".activity-scrollbar");
         var r = $("body").height() - $(".activity-scrollbar").offset().top;
         obj.css("height",r+"px");
    }   
    
};