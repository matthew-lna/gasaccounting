/* SITE PARAMETERS */

/*
    This stores all the site parameters.
    
    Site parameters are included as part of the URL.
    
    They will be passed to the app from Journey / links supplied by us. 
    
    Possible parameters include:

    auth : this is the authorisation which will be linked to a UUID stored in mySQL

*/

var site_parameters_object = {
    reset: (function () {
        for (i in site_parameters_object) {
            if (i == 'reset') continue;
            site_parameters_object[i] = null;
        }
    })
};

/* APPLICATION DEFAULTS */

/*
    Remember each time you add a value to defaults you must amend 
    the reset function, depending on default value type.

    This stores all the session information for use in the myclients app.
*/

var defaults = {
    app_content_loaded : null,
    reset: (function () {
        for (i in defaults) {
            if (i == 'reset') continue;
            // SET STRING VALUES
            else if (i=='') defaults[i] = "";
            // SET EMPTY ARRAYS
            else if (i=='') defaults[i] = [];
            // SET EMPTY OBJECTS
            else if (i== '') defaults[i] = {};
            // SET TRUE VALUES
            else if (i=='') defaults[i] = true;
            // SET NIL INTEGER VALUES
            else if (i=='') defaults[i] = 0;
            // SET FALSE VALUES
            else if (i=='') defaults[i] = false;
            else defaults[i] = null;
        }
    })
};

/* 
    OTHER GLOBAL VARIABLES
*/

/* ACCORDION VARIABLES */
var expand_bool = true;
var accordions = [];
var coll_exp_all = null;

/* DOCUMENT TYPES ALLOWED FOR UPLOADING */
var allowed_files = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

/* BANKS OBJECT */
var banks = {
    "Select Bank...": {
        logo: "bank_000000.png",
        branch_code: null
    },
    "Access Bank": {
        logo: "bank_410105.png",
        branch_code: "410105"
    },
    "ABSA Bank": {
        logo: "bank_632005.png",
        branch_code: "632005"
    },
    "African Bank": {
        logo: "bank_430000.png",
        branch_code: "430000"
    },
    "Bidvest Bank": {
        logo: "bank_462005.png",
        branch_code: "462005"
    },
    "Capitec Bank": {
        logo: "bank_470010.png",
        branch_code: "470010"
    },
    "Discovery Bank": {
        logo: "bank_679000.png",
        branch_code: "679000"
    },
    "Finbond Mutual Bank": {
        logo: "bank_589000_FB.png",
        branch_code: "589000"
    },
    "First National Bank": {
        logo: "bank_254005.png",
        branch_code: "254005"
    },
    "Grindrod Bank": {
        logo: "bank_584000.png",
        branch_code: "584000"
    },
    "Grobank": {
        logo: "bank_410506.png",
        branch_code: "410506"
    },
    "Infinity Bank": {
        logo: "bank_591000.png",
        branch_code: "591000"
    },
    "Investec Bank": {
        logo: "bank_580105.png",
        branch_code: "580105"
    },
    "Nedbank": {
        logo: "bank_198765.png",
        branch_code: "198765"
    },
    "Sasfin Bank": {
        logo: "bank_683000.png",
        branch_code: "683000"
    },
    "Standard Bank": {
        logo: "bank_051001.png",
        branch_code: "051001"
    },
    "Surecard": {
        logo: "bank_410600.png",
        branch_code: "410600"
    },
    "Tyme Bank": {
        logo: "bank_678910.png",
        branch_code: "678910"
    },
    "UBank": {
        logo: "bank_431010.png",
        branch_code: "431010"
    }
};
