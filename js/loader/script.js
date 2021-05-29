// $(document).ready(function() {
$('.post_loader').css('display', 'none');
$('.post_loader').addClass('wow animated fadeIn');
// $('nav').hide();
// $('.container-fluid').hide();
setTimeout(function(){
	$('body').addClass('loaded');
	setTimeout(function(){
		$('nav').show();
		$('.container-fluid').delay(3000).show();
		setTimeout(function(){
			$('.post_loader').css('display', '');
		},1000);
	},1000);
}, 1000);
// });