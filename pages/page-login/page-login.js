document.title = "Login";

var username = document.getElementById('username');
var password = document.getElementById('password');

var password_image = app_container.querySelector(".password-img");
password_image.addEventListener('click', (e)=>{
    e.target.classList.toggle('hidden');
    e.target.classList.contains('hidden') ? password.type = 'text' : password.type = 'password';
});

var login_button = app_container.querySelector(".login");
login_button.addEventListener('click', (e)=>{
    var data = {
        username: username.value,
        password : password.value
    }
    injectView('pages/page-training/', 'page-training', data, ['action-menu','toast']);
});

var link = app_container.querySelector(".link");
link.addEventListener('click', (e)=>{
    alert('link clicked');
});