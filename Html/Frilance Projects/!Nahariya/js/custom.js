
 $(document).ready(function() {



  setToggleInputs();
			
	
			
			
function setToggleInputs () {

jQuery("[class*='toggle-inputs']").each(function (i) {
var defaultValue = jQuery(this).val();

jQuery(this).bind("click", function(){
if (jQuery(this).val() == defaultValue) {
jQuery(this).val('');
}
});

jQuery(this).bind("focus", function(){
if (jQuery(this).val() == defaultValue) {
jQuery(this).val('');
}
});

jQuery(this).bind("blur", function(){
if (jQuery(this).val() == '') {
jQuery(this).val(defaultValue);
}
});

});

return true;
}		
	
	
	
  
	  });	  
	  

