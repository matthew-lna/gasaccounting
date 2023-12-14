if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register(window.location.href.slice(0, window.location.href.indexOf('/?')) + '/service_worker.js').then(function(registration) {
        // Registration was successful
        //console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
        // Registration failed
        //console.log('ServiceWorker registration failed: ', err);
        });
    });
}