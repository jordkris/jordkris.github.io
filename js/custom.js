(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '')==this.pathname.replace(/^\//, '')&&location.hostname==this.hostname) {
            var target=$(this.hash);
            target=target.length? target:$('[name='+this.hash.slice(1)+']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#sideNav'
    });

})(jQuery); // End of use strict

//scroll animation
var scroll_animation=function (elm, kind) {
    $(window).scroll(function () {
        var id=elm.id;
        var hT=$('#'+id).offset().top,
            hH=$('#'+id).outerHeight(),
            wH=$(window).height(),
            wS=$(this).scrollTop();
        if (wS>(hT+hH-wH)&&(hT>wS)&&(wS+wH>hT+hH)) {
            $('#'+id).addClass('wow animated '+kind);
        } else {
            $('#'+id).removeClass('wow animated '+kind);
        }
    });
}

function min(a, b) {
    if (a>b) {
        return b;
    } else {
        return a;
    }
}

function rotate_box(elm, version) {
    var id=elm.id;
    // e = Mouse click event.
    var rect=document.getElementById(id).getBoundingClientRect();
    var x=event.clientX-rect.left-(rect.width/2); //x position within the element.
    var y=-1*(event.clientY-rect.top-(rect.height/2)); //y position within the element.
    var max_degreeX=30;
    var max_degreeY=30;
    var degreeY=x*max_degreeX/(rect.width/2);
    var degreeX=y*max_degreeY/(rect.height/2);
    var degreeFinal;
    $('#'+id).css('border', '1px solid #39b3ff');
    if (version=='v1') {
        if (degreeX==0||degreeY==0) {
            degreeFinal=0;
        } else {
            degreeFinal=min(degreeX, degreeY);
        }
        if ((x<0&&y<0)||(x>0&&y>0)) {
            $('#'+id).css('transform', 'rotate3D(2,1,0,'+degreeFinal.toString()+'deg');
        } else {
            $('#'+id).css('transform', 'rotate3D(-2,1,0,'+degreeFinal.toString()+'deg');
        }
    } else if (version=='v2') {
        if (Math.abs(x)>Math.abs(y)) {
            $('#'+id).css('transform', 'rotate3D(0,1,0,'+degreeY.toString()+'deg');
        } else {
            $('#'+id).css('transform', 'rotate3D(1,0,0,'+degreeX.toString()+'deg');
        }
    }
}

function default_box(elm) {
    var id=elm.id;
    $('#'+id).css('border', '');
    $('#'+id).css('transform', '');
}

$(".skill-item").each(function () {
    $(this).on("mouseenter", function () {
        $(this).addClass("wow animated fadeIn");
    }).on("mouseleave", function () {
        $(this).removeClass("wow animated fadeIn");
    });
});

$.getJSON('js/allData.json', (allData) => {
    $('#profile-logo').attr('src', allData.profileLogo).attr('alt', allData.profileLogo);
    $('#name').text(allData.name);
    $('#motto').html(allData.motto);
    $('#profile-about').html(allData.profileAbout);
    let last=allData.links.length-1;
    allData.links.forEach((obj, i) => {
        $('#links').append(`
            <li ${i==last? 'id="cv_download"':''} class="list-inline-item wow ${i==last? 'swing center':'animated zoomIn'}" ${i==last? 'data-wow-iteration="200"':''} data-toggle="tooltip" data-placement="top" title="${obj.title}">
                <a href="${obj.link}" target="_blank">
                    <span class="fa-stack fa-lg">
                        <i class="fa fa-circle fa-stack-2x ${i==last? 'text-success':''}"></i>
                        <i class="${obj.icon} fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
            </li>
        `);
    });
    allData.experience.forEach((obj, i) => {
        let magicBoxDiv=`
            <div class="col-lg-4 magic-box">
                <img class="magic-image" src="${obj.imgLogo}" />
            </div>
        `;
        let jobDetailsDiv=`
            <div class="col-lg-8">
                <span class="date">${obj.date}</span>
                <h5 class="title">${obj.title}</h5>
                <span class="title text-info">${obj.company}</span>
            </div>
        `;
        let insideRow=(i%2==0)? magicBoxDiv+jobDetailsDiv:jobDetailsDiv+magicBoxDiv;
        $('#exp-box').append(`
            <div class="exp">
                <div id="exp-icon-${i+1}" class="exp-icon" onmousemove="rotate_box(this,'v${i%2+1}')" onmouseout="default_box(this)"></div>
                <div id="exp-box-${i+1}" class="exp-content" onmousemove="rotate_box(this,'v${2-i%2}')" onmouseout="default_box(this)">
                    <div class="row">
                        ` +insideRow+`
                        <div class="col-lg-12">
                            <p class="description text-justify">${obj.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
});

// (async () => {
//     let getDefaultGeoLoc=async () => {
//         return await new Promise((resolve, reject) => {
//             $.ajax({
//                 url: `https://ipinfo.io?token=e231877e2f20dc`,
//                 type: 'GET',
//                 success: (res) => {
//                     let ip=res.ip;
//                     let lat=res.loc.split(',')[0];
//                     let lon=res.loc.split(',')[1];
//                     resolve({ ip: ip, lat: lat, lon: lon });
//                 },
//                 error: (err) => {
//                     reject(err);
//                 }
//             });
//         });
//     }

//     let processGeoLoc=(ip, lat, lon, accLat, accLon) => {
//         $.ajax({
//             url: `https://ip.jordkris.com/api/getIp?ip=${ip}&latlong=${lat},${lon}&accuratelatlong=${accLat},${accLon}`,
//             type: 'GET',
//             success: (res) => { },
//             error: (err) => {
//                 console.error(err);
//             }
//         });
//     }

//     let dataDefault=await getDefaultGeoLoc();
//     let promiseLocation=new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition((pos) => {
//             let lat=pos.coords.latitude;
//             let lon=pos.coords.longitude;
//             processGeoLoc(dataDefault.ip, dataDefault.lat, dataDefault.lon, lat, lon);
//             resolve();
//         }, (error) => {
//             console.error(error);
//             processGeoLoc(dataDefault.ip, dataDefault.lat, dataDefault.lon, '-', '-');
//             reject(error);
//         }, {
//             enableHighAccuracy: true
//         });
//     });

//     let promiseTimeout=new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(new Error('Timeout waiting for user location permission'));
//         }, 5000);
//     });

//     Promise.race([promiseLocation, promiseTimeout]).then(() => {
//         console.log('Location permission granted');
//     }).catch((error) => {
//         console.error(error);
//         processGeoLoc(dataDefault.ip, dataDefault.lat, dataDefault.lon, '-', '-');
//     });;

// })();

let getDefaultGeoLoc=async () => {
    return await new Promise((resolve, reject) => {
        $.ajax({
            url: `https://ipinfo.io?token=e231877e2f20dc`,
            type: 'GET',
            success: (res) => {
                let ip=res.ip;
                let lat=res.loc.split(',')[0];
                let lon=res.loc.split(',')[1];
                resolve({ ip: ip, lat: lat, lon: lon });
            },
            error: (err) => {
                reject(err);
            }
        });
    });
}

let processGeoLoc=(ip, lat, lon, accLat, accLon) => {
    $.ajax({
        url: `https://ip.jordkris.com/api/getIp?ip=${ip}&latlong=${lat},${lon}&accuratelatlong=${accLat},${accLon}`,
        type: 'GET',
        success: (res) => { },
        error: (err) => {
            console.error(err);
        }
    });
}

const getPosition=function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const timeout=function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('Request took too long!'));
        }, sec*1000);
    });
};

(async () => {
    let dataDefault=await getDefaultGeoLoc();
    Promise.race([getPosition(), timeout(3)])
        .then(pos => {
            let lat=pos.coords.latitude;
            let long=pos.coords.longitude;
            console.log(lat, long);
            console.log('User granted permission');
            processGeoLoc(dataDefault.ip, dataDefault.lat, dataDefault.lon, lat, long);
        })
        .catch(error => {
            console.error(error);
            console.error("User didn't grant permission");
            processGeoLoc(dataDefault.ip, dataDefault.lat, dataDefault.lon, '-', '-');
        });
})()
