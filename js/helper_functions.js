/*

This section contains app specific functions for elements within the
index.html file.

*/

/* LOAD PRIMARY WEB ELEMENTS */
var app_container = document.getElementById('app_container');
var app_container_image = document.getElementById('app_container_image');

/* SET BACKGROUND */
function setBackground () {
    var pattern = Trianglify({           
        height: app_container.clientHeight,
        width: app_container.clientWidth,
        cell_size: 50,
        seed: 'az60g', 
        x_colors: ['#ffffff', '#335484', '#19234D']
    });
    app_container_image.setAttribute("src", pattern.png());
}

/* RESET MY CLIENT APP */
function resetMyClient () {
    // RESET THE APP, CLEARS ALL GLOBAL VARIABLES AND SESSION OBJECTS
    window.location.reload();
};

/* FAVICON */
function setFavIcon (icon) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon'
    link.type = 'image/x-icon';
    link.href = icon;
    document.getElementsByTagName('head')[0].appendChild(link);
}

/* CHECK MOBILE BROWSER */
function checkMobileBrowser () {
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|crios|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) mobile_browser = true;})(navigator.userAgent||navigator.vendor||window.opera);
}

/* NOTIFICATIONS FOR CONVEYING NOTES TO CLIENTS */
// INFO NOTIFICATION AT TOP OF VIEW
function displayInfoNotification (content, timeout, color) {
    info_notification.style.display = "block"; 
    info_notification_content.innerHTML = content; 
    if (color) info_notification.style.backgroundColor = color;    
    // DETERMINES HOW LONG THE USER WILL VIEW THE NOTIFICATION
    setTimeout(function () {
        info_notification.style.display = "none";
        if (color) info_notification.style.backgroundColor = "";
    }, timeout)
};

// TOAST AT BOTTOM RIGHT OF SCREEN
function displayBottomToast (content, timeout, color) {
    bottom_toast.style.display = "block"; 
    bottom_toast_content.innerHTML = content; 
    if (color) bottom_toast.style.backgroundColor = color;
    // DETERMINES HOW LONG THE USER WILL VIEW THE TOAST
    setTimeout(function () {
        bottom_toast.style.display = "none";
        if (color) bottom_toast.style.backgroundColor = "";
    }, timeout)
};

// RESETS ACCORDIONS
function resetAccordions () {
    expand_bool = true;
    accordions = [];
    coll_exp_all = null;
}

// EXPANDS OR COLLAPSES ALL ACCORDIONS
function expCollAll () {
    try {
        expand_bool ? expandAll() : collapseAll();
        function expandAll() {
            Array.prototype.forEach.call(accordions, function (x) {
                for (var i = 0; i < accordions.length; i++) {
                    accordions[i].classList.add("accordion_active");
                    var panel = accordions[i].nextElementSibling;
                    panel.style.display = "block";
                    expand_bool = false;
                    coll_exp_all.innerHTML = "Collapse All"
                }
                return;
            });
        }
        function collapseAll() {
            Array.prototype.forEach.call(accordions, function (x) {
                for (var i = 0; i < accordions.length; i++) {
                    accordions[i].classList.remove("accordion_active");
                    var panel = accordions[i].nextElementSibling;
                    panel.style.display = "none";
                    expand_bool = true;
                    coll_exp_all.innerHTML = "Expand All"
                }
                return;
            });
        }
    } 
    catch (error) {
        console.log(error.name + ' : ' + error.message + '.')
        return displayModal("error", [{button:{text:"Ok",action:"ok"}}], "Error", '<b>(expCollAll), ' + error.name +  ': </b>' + error.message, "");
    }
    
}

// INITIALISES ACCORDIONS
function initialiseAccordions (name) {
    try {
        accordions = document.getElementsByClassName(name);
        //coll_exp_all = document.getElementById("coll_exp_all");
        Array.prototype.forEach.call(accordions, function (x) {
            x.addEventListener("click", function () { 
                for (var i = 0; i < accordions.length; i++) {
                    if (x == accordions[i]) continue;
                    if (expand_bool == true) {
                        accordions[i].classList.remove("accordion-active");
                        var panel = accordions[i].nextElementSibling;
                        panel.style.display = "none";
                    }
                }
                this.classList.toggle("accordion-active");
                panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        });
        //coll_exp_all.addEventListener("click", expCollAll);
    } 
    catch (error) {
        console.log(error.name + ' : ' + error.message + '.')
        //return displayModal("error", [{button:{text:"Ok",action:"ok"}}], "Error", '<b>(initialiseAccordions), ' + error.name +  ': </b>' + error.message, "");
    }
}

/* GENERATE THE WEB APP MANIFEST */

function generateWebManifest () {
    // INITIALISE BARE BONES MANIFEST
    var manifest = {
        "dir": "ltr",
        "lang": "en",
        "name": "My Mobiloan Journey",
        "short_name": "My Mobiloan Journey",
        "start_url": window.location.href,
        "scope": window.location.href,
        "theme_color": "#19234D",
        "background_color": "#19234D",
        "display": "fullscreen",
        "icons": []
    }
    // POPULATE ICONS
    var icon_sizes = [16,32,36,48,57,60,64,70,72,76,96,114,120,128,144,150,152,180,192,196,310,512];
    for (var i of icon_sizes) {
        manifest.icons.push({
            "src": "https://mobiloan.modalityapps.com/config/icons/myadmin/" + i + "x" + i + ".webp",
            "sizes": "" + i + "x" + i,
            "type": "image/webp"
        })
        manifest.icons.push({
            "src": "https://mobiloan.modalityapps.com/config/icons/myadmin/" + i + "x" + i + ".png",
            "sizes": "" + i + "x" + i,
            "type": "image/png"
        })
    }
    // APPEND MANIFEST TO THE HEADER
    var content = encodeURIComponent(JSON.stringify(manifest)); 
    var url = "data:application/manifest+json," + content; 
    var meta_element = document.createElement('link'); 
    meta_element.setAttribute('rel', 'manifest'); 
    meta_element.setAttribute('href', url); 
    document.querySelector('head').appendChild(meta_element);
}