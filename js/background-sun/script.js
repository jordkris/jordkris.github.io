$(document).ready(function() {
	var ray_box = document.createElement("DIV");
	ray_box.setAttribute('class','ray_box');
	var ray;
	for(var i=1; i<=10;i++) {
		ray = document.createElement("DIV");
		ray.setAttribute('class','ray ray'+i.toString());
		ray_box.appendChild(ray);
	}
	$('.sun').append(ray_box);
});