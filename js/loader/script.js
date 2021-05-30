// $(document).ready(function() {
$('.post_loader').css('display', 'none');
$('.post_loader').addClass('wow animated fadeIn');
// $('nav').hide();
// $('.container-fluid').hide();

setTimeout(function() {
	$('body').addClass('loaded');
	setTimeout(function() {
		$('nav').css('display','');
		$('.container-fluid').css('display','');
		$('.post_loader').css('display', '');
	},500);
	$('nav').css('visibility','');
	$('.container-fluid').css('visibility','');
},500);