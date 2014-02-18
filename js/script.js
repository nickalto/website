
$(document).ready(function() {

	$(".hidden-menu").hide();

    $(".box-shadow-menu").on('click', function(e) {
    	if($(".hidden-menu").is(":hidden"))
    		$(".hidden-menu").slideDown(200);
    	else
    		$(".hidden-menu").slideUp(200);
    });
});



