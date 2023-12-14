var deferredPrompt;

window.addEventListener("beforeinstallprompt", function (e) {
    // PREVENT CHROME 67 AND EARLIER FROM AUTOMATICALLY SHOWING PROMPT
    e.preventDefault();
    // STORE EVENT IN GLOBAL VARIABLE TO TRIGGER LATER
    deferredPrompt = e;
    // IF INSTALL PROMPT IS AVAILABLE, THEN DISPLAY INSTALL PROMPT
    web_app_install.style.display = "";
    // UPDATE UI TO NOTIFY THE USER THEY CAN ADD TO HOME SCREEN
    confirm_web_app_install.addEventListener("click", function () {
        // HIDE THE ADD TO HOME SCREEN DIALOG
        web_app_install.style.display = "none";
        // SHOW THE PROMPT
        deferredPrompt.prompt();
        // WAIT FOR THE USER TO RESPOND TO THE PROMPT
        deferredPrompt.userChoice.then( function (choiceResult) {
            if (choiceResult.outcome === "accepted") {
            //if (JSON.parse(localStorage.getItem('config')).environment == "testing") console.log('User accepted the A2HS prompt...');
            } else {
            //if (JSON.parse(localStorage.getItem('config')).environment == "testing") console.log('User dismissed the A2HS prompt...');
            }
            deferredPrompt = null;
        });
    });
}); 