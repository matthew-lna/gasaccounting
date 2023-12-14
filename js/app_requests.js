/* GENERIC FUNCTION FOR MAKING APP REQUESTS */

async function retrieveSendData (request, data) {

    // INFORM USER
    request_strings[request].initial_message(data);
    // PERFORM FUNCTION
    var result = await fetch(request, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function (res) {
        if (res.status == 200 || res.status == 201 || res.status == 207) {
            request_strings[request].success_message(data);
            return res.json();
        } else {
            request_strings[request].failed_message(data);
            handleError(request, res, data)
        }
    }).catch(error => {
        handleError(request, error, data)
    });

    // HANDLE SUCCESSFUL RESPONSE
    if (result) {
        if (result.reply_cd) {
            if (result.reply_cd == 200 || result.reply_cd == 201 || result.reply_cd == 207) return handleSuccess(request, result, data);       
            else return handleError(request, result, data);
        }
        else {
            return handleSuccess(request, result, data);
        }
    }
};

function handleSuccess (request, result, data) {
    // HIDE LOADER
    loader_container.style.display = "none";
    return request_strings[request].success_function(result, data);
}

function handleError (request, error, data) {
    // HIDE LOADER
    loader_container.style.display = "none";

    var err_status = error.status ? error.status : error.reply_cd ? error.reply_cd : 500;
    var err_title = error.name ? error.name : "Internal Error";
    var err_response = error.message ? error.message : error.reply_str ? error.reply_str : "An internal server error has occurred. Please try again later.";

    var reply_object = {
        status: err_status,
        title: err_title,
        response: err_response
    }    
    request_strings[request].failed_notification(reply_object, data);
}

/* APP REQUESTS */

var request_strings = {
    config : {
        initial_message: function () {},
        success_message: function () {},
        failed_message: function () {},
        failed_notification: function (error) {
            
        },
        success_function: function (result, data) {
            
        },
        query: function () {
            
        }
    }
}