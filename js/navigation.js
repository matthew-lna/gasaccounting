// RESETS MY MOBILOAN

/* NAVIGATION */
var view_stack = [];

/* AVAILABLE VIEWS */
var app_views = [
    "login",                    // 1 : LOGIN PAGE, AUTHENTICATION AND OBTAINING OF TOKEN
    "form_allps_checklist",     // 2 : ALLPS SETUP COMPLETION CHECKLIST
    "form_client_onboarding",   // 3 : CLIENT ONBOARDING FORM
    "form_quiz",                // 4 : QUIZ
    "form_saccra_checklist",    // 5 : SACCRA CHECKLIST
    "form_sudonum_checklist",   // 6 : SUDONUM CHECKLIST
    "form_xds_checklist",       // 7 : XDS CHECKLIST
    "page_administration",      // 8 : ADMINISTRATION PAGE
    "page_training"             // 9 : TRAINING PAGE
];

// UPDATES THE NAVIGATION VIEW STACK
function updateViewStack(new_page) {
    var array_index = view_stack.indexOf(new_page);
    var in_array = array_index != -1;
    if (in_array) view_stack.length = array_index + 1;
    else view_stack.push(new_page);
    return view_stack[view_stack.length-1];
}

// LOG THE USER INTO THE APPLICATION
function login () {
    
}

// LOG THE USER OUT OF THE APPLICATION
function logout() {
    
}

// FORM OR PAGE NAVIGATION
function navigate () {
    
}

// INJECT PAGE INTO VIEW
function injectView (path, template, data, components) {

    // CHECK DATA
    // console.log(data);
    
    // CLEAR APP CONTAINER
    app_container.innerHTML = '';

    // REMOVE OLD SCRIPT FILES
    for (var script of app_container.querySelectorAll('script')) {
        script.remove();
    }

    // REMOVE OLD STYLE SHEETS
    for (var sheet of document.querySelectorAll('link[rel="stylesheet"]')) {
        if (sheet.getAttribute('href').includes('index') || sheet.getAttribute('href').includes('google')) continue;
        else sheet.remove();
    }
    
    // ADD NEW STYLING
    var style_element = document.createElement('link');
    style_element.setAttribute('rel', 'stylesheet');
    style_element.setAttribute('href', path + template + '.css');
    document.querySelector('head').appendChild(style_element);

    // FETCH TEMPLATE
    fetch(path + template + '.html')
        .then(response=> response.text())
        .then(webpage=> app_container.innerHTML = webpage)
        .then(()=> {            
            // INJECT COMPONENTS
            if (components.length) {
                for (var component of components) {
                    fetch('components/' + component + '.html')
                        .then(response=> response.text())
                        .then(injectable_component=> app_container.querySelector(`.${template}`).innerHTML += injectable_component);
                }
            }

            // ADD SCRIPT FILE
            var script_element = document.createElement('script');
            script_element.setAttribute('src', path + template + '.js');
            app_container.appendChild(script_element);

        });
}