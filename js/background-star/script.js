$(document).ready(function() {
	
	var star = '';
	for (var i=0;i<5;i++) {
		star+='<div class="shooting_star"></div>';
	}
	$('.night').html(star);

});