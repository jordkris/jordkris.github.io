(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#sideNav'
    });

})(jQuery); // End of use strict

//scroll animation
var scroll_animation = function(elm, kind) {
    $(window).scroll(function() {
        var id = elm.id;
        var hT = $('#' + id).offset().top,
            hH = $('#' + id).outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
            $('#' + id).addClass('wow animated ' + kind);
        } else {
            $('#' + id).removeClass('wow animated ' + kind);
        }
    });
}

function min(a, b) {
    if (a > b) {
        return b;
    } else {
        return a;
    }
}

function rotate_box(elm, version) {
    var id = elm.id;
    // e = Mouse click event.
    var rect = document.getElementById(id).getBoundingClientRect();
    var x = event.clientX - rect.left - (rect.width / 2); //x position within the element.
    var y = -1 * (event.clientY - rect.top - (rect.height / 2)); //y position within the element.
    var max_degreeX = 30;
    var max_degreeY = 30;
    var degreeY = x * max_degreeX / (rect.width / 2);
    var degreeX = y * max_degreeY / (rect.height / 2);
    var degreeFinal;
    $('#' + id).css('border', '1px solid #39b3ff');
    if (version == 'v1') {
        if (degreeX == 0 || degreeY == 0) {
            degreeFinal = 0;
        } else {
            degreeFinal = min(degreeX, degreeY);
        }
        if ((x < 0 && y < 0) || (x > 0 && y > 0)) {
            $('#' + id).css('transform', 'rotate3D(2,1,0,' + degreeFinal.toString() + 'deg');
        } else {
            $('#' + id).css('transform', 'rotate3D(-2,1,0,' + degreeFinal.toString() + 'deg');
        }
    } else if (version == 'v2') {
        if (Math.abs(x) > Math.abs(y)) {
            $('#' + id).css('transform', 'rotate3D(0,1,0,' + degreeY.toString() + 'deg');
        } else {
            $('#' + id).css('transform', 'rotate3D(1,0,0,' + degreeX.toString() + 'deg');
        }
    }
}

function default_box(elm) {
    var id = elm.id;
    $('#' + id).css('border', '');
    $('#' + id).css('transform', '');
}

$(".skill-item").each(function() {
    $(this).on("mouseenter", function() {
        $(this).addClass("wow animated fadeIn");
    }).on("mouseleave", function() {
        $(this).removeClass("wow animated fadeIn");
    });
});

$.getJSON('js/allData.json', (allData) => {
    $('#profile-logo').attr('src', allData.logoProfile).attr('alt', allData.logoProfile);
    $('#name').text(allData.name);
    $('#motto').html(allData.motto);
    $('#profile-about').html(allData.profileAbout);
    let last = allData.links.length - 1;
    $('#links').html('');
    allData.links.forEach((obj, i) => {
        $('#links').append(`
            <li ${i == last ? 'id="cv_download"' : ''} class="list-inline-item wow ${i == last ? 'swing center' : 'animated zoomIn'}" ${i == last ? 'data-wow-iteration="200"' : ''} data-toggle="tooltip" data-placement="top" title="${obj.title}">
                <a href="${obj.link}" target="_blank">
                    <span class="fa-stack fa-lg">
                        <i class="fa fa-circle fa-stack-2x ${i == last ? 'text-success' : ''}"></i>
                        <i class="${obj.icon} fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
            </li>
        `);
    });
    $('#exp-box').html('');
    allData.experience.forEach((obj, i) => {
        let magicBoxDiv = `
            <div class="col-lg-4 magic-box">
                <img class="magic-image" src="${obj.imgLogo}" />
            </div>
        `;
        let jobDetailsDiv = `
            <div class="col-lg-8">
                <span class="date">${obj.date}</span>
                <h5 class="title">${obj.title}</h5>
                <span class="title text-info">${obj.company}</span>
            </div>
        `;
        $('#exp-box').append(`
            <div class="exp">
                <div id="exp-icon-1" class="exp-icon" onmousemove="rotate_box(this,'v${i%2+1}')" onmouseout="default_box(this)"></div>
                <div id="exp-box-1" class="exp-content" onmousemove="rotate_box(this,'v${2-i%2}')" onmouseout="default_box(this)">
                    <div class="row">
                        ` + i % 2 == 0 ? magicBoxDiv + jobDetailsDiv : jobDetailsDiv + magicBoxDiv + `
                        <div class="col-lg-12">
                            <p class="description text-justify">${obj.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
});