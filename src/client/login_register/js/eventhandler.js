// This is where all events are 

window.onload = function () {
    console.log('Document loaded.')
}

$('body').on('click', '.lg_bt_register_click', function(){
    window.location = "../pages/register.html"
})

$('body').on('click', '.lg_bt_continue_click', function(){
    window.location = "../../profilseite/index.html"
})

$('body').on('click', '.lg_logo_click', function(){
    window.location = "../../../src/landing_page/index.html"
})

$('body').on('click', '.rg_bt_login_click', function(){
    window.location = "../pages/login.html"
})

$('body').on('click', '.rg_bt_continue_click', function(){
    window.location = "../../profilseite/index.html"
})

$('body').on('click', '.rg_policy_click', function(){
    window.location = "../../terms_of_service/index.html"
})

$('body').on('click', '.rg_logo_click', function(){
    window.location = "../../../src/landing_page/index.html"
})

$('body').on('click', '.apple', function(){
    alert('this page is in work.')
    // window.location = "#"
})

$('body').on('click', '.google', function(){
    alert('this page is in work.')
    // window.location = "#"
})