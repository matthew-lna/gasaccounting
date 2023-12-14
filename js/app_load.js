// APP ROUTING AND INITIAL LOAD

/*
    This file was created to assist in retrieving the
    necessary configuration items used in determining
    the layout, configuration, colour schemes etc of 
    the relevant MYCLIENT instance.

    Step 1 : Initiate load screen;
    Step 2 : Check app compatability;
    Step 3 : Create meta data for web apps;
    Step 4 : Create marketing meta;
    Step 5 : Set web manifest.

*/

// CLEAR LOCAL STORAGE
localStorage.clear();

// SET BACKGROUND
setBackground();
window.addEventListener('resize', setBackground);

// TEST FOR INTERNET EXPLORER AND STOP LOAD

/* MIGRATION TO navigator.userAgentData WILL BE REQUIRED IN THE FUTURE */

function checkCompatibility () {
    if (window.navigator.userAgent.indexOf('MSIE ') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        my_company_loading_notifier.innerHTML = "Sorry, this app is not compatible with Internet Explorer...";
        return false;
    } else {
        return true;
    }      
}

if (checkCompatibility()) {
    // CONTENT LOAD COMPLETE VARIABLE

    /*
        This variable will only be set to true once the app
        has loaded and the core data for the instance has 
        been completely downloaded.
    */

    defaults.app_content_loaded = false;

    // SET THE DOCUMENT TITLE TO LOADING WHILE APP LOADS
    document.title = "Loading...";

    // CUSTOM SCRIPT TO PREVENT RIGHT CLICK ON NON INPUT ELEMENTS
    /*window.addEventListener("contextmenu", function (e) {
        if (e.target.tagName != "INPUT") {
            return e.preventDefault();
        } else {
            return;
        }
    });*/

    // SET THE LOADING FAV ICON
    setFavIcon('images/logos/mobiloan_logo.svg');

    // APP CUSTOMISATIONS

    // CUSTOM DESCRIPTIONS
    var description_data = [
        {name: 'description', content: 'My Mobiloan Journey'}
    ]
    for (var i in description_data) {
        var meta_element = document.createElement('meta');
        meta_element.setAttribute('name', description_data[i].name);
        meta_element.setAttribute('content', description_data[i].content);
        document.getElementsByTagName('head')[0].appendChild(meta_element);
    }

    // CUSTOM META DATA AND LINKS

    // GENERATE APP MANIFEST
    generateWebManifest();

    // SET WEB APP META
    var web_app_meta = [
        {name: 'mobile-web-app-capable', content: 'yes'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        {name: 'application-name', content: 'My Mobiloan Journey'},
        {name: 'apple-mobile-web-app-title', content: 'My Mobiloan Journey'},
        {name: 'apple-mobile-web-app-status-bar-style', content: 'default'},
        {name: 'theme-color', content: '#9AA4C0'}
    ]
    for (var i in web_app_meta) {
        var meta_element = document.createElement('meta');
        meta_element.setAttribute('name', web_app_meta[i].name);
        meta_element.setAttribute('content', web_app_meta[i].content);
        document.getElementsByTagName('head')[0].appendChild(meta_element);
    }

    // WEB ICONS FOR APPLE DEVICES
    var apple_icons = [
        {rel: 'apple-touch-icon', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/310x310.png'},
        {rel: 'apple-touch-startup-image', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/310x310.png'},
        {rel: 'apple-touch-icon', sizes:'36x36', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/36x36.png'},
        {rel: 'apple-touch-icon', sizes:'48x48', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/48x48.png'},
        {rel: 'apple-touch-icon', sizes:'57x57', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/57x57.png'},
        {rel: 'apple-touch-icon', sizes:'60x60', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/60x60.png'},
        {rel: 'apple-touch-icon', sizes:'64x64', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/64x64.png'},
        {rel: 'apple-touch-icon', sizes:'70x70', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/70x70.png'},
        {rel: 'apple-touch-icon', sizes:'72x72', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/72x72.png'},
        {rel: 'apple-touch-icon', sizes:'76x76', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/76x76.png'},
        {rel: 'apple-touch-icon', sizes:'96x96', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/96x96.png'},
        {rel: 'apple-touch-icon', sizes:'114x114', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/114x114.png'},
        {rel: 'apple-touch-icon', sizes:'120x120', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/120x120.png'},
        {rel: 'apple-touch-icon', sizes:'128x128', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/128x128.png'},
        {rel: 'apple-touch-icon', sizes:'144x144', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/144x144.png'},
        {rel: 'apple-touch-icon', sizes:'150x150', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/150x150.png'},
        {rel: 'apple-touch-icon', sizes:'152x152', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/152x152.png'},
        {rel: 'apple-touch-icon', sizes:'167x167', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/167x167.png'},
        {rel: 'apple-touch-icon', sizes:'180x180', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/180x180.png'},
        {rel: 'apple-touch-icon', sizes:'192x192', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/192x192.png'},
        {rel: 'apple-touch-icon', sizes:'310x310', href: 'https://mobiloan.modalityapps.com/config/icons/myadmin/310x310.png'}
    ]

    for (var i in apple_icons) {
        var meta_element = document.createElement('link');
        meta_element.setAttribute('rel', apple_icons[i].rel);
        if (apple_icons[i].sizes) meta_element.setAttribute('sizes', apple_icons[i].sizes);
        meta_element.setAttribute('href', apple_icons[i].href);
        document.getElementsByTagName('head')[0].appendChild(meta_element);
    }

    // SET MARKETING META INFORMATION
    var marketing_meta = [
        {property: 'og:title', content: 'My Mobiloan Journey'},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: 'https://mobiloan.modalityapps.com/'},
        {property: 'og:description', content: 'Mobiloan administration web portal'},
        {property: 'og:image', content: 'https://mobiloan.modalityapps.com/config/marketing/myadmin.png'},
        {property: 'og:locale', content: 'en_US'}
    ]
    for (var i in marketing_meta) {
        var meta_element = document.createElement('meta');
        meta_element.setAttribute('property', marketing_meta[i].property);
        meta_element.setAttribute('content', marketing_meta[i].content);
        document.getElementsByTagName('head')[0].appendChild(meta_element);
    }

    injectView('pages/page-loader/', 'page-loader', null, []);

}









