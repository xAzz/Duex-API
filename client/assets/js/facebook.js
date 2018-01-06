var APP_ID = '1658944970782589'; //id
var scopes = 'email, user_friends, public_profile';
var API_URL = "";

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        getFacebookData();
        getJWT(response.authResponse.userID, response.authResponse.accessToken);
    } else {
        FB.login();
    }
}
window.fbAsyncInit = function() {
    FB.init({
        appId: '1143150365804274',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });
    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};
// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js?";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// Login
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
// Logout
function fbLogout() {
    FB.logout(function(response) {
        //Do what ever you want here when logged out like reloading the page
        console.log("logged out from facebook...");
        $(".connecting-info").text("Logged out from facebook...");
        $("#profileBlock").fadeIn("slow");
        setTimeout(function(){
            window.location.reload();
        }, 2500);
    });
}

function getFacebookData() {
    $("#profileBlock").fadeIn("slow");
    setTimeout(function(){
        console.log('Success!, Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log(JSON.stringify(response));
            var id = FB.getUserID();
            var profileId = response.id;
            $("#fb_id").val(id);
            var profileName = response.name;
            profileName = profileName.substring(0, profileName.lastIndexOf(" "));
            var profileImageURL = "http://graph.facebook.com/" + response.id + "/picture?type=large";
            console.log('Successful login for:');
            console.log("%c" + response.name + " %s", "font-weight:bold;", '');
            //$("#profileName").text(profileName = profileName.substring(0, profileName.lastIndexOf(" ")));
            //$("#profileName").text(profileName.split(" ")[0]);
            $("#profileName").text(profileName.split(" ")[0]);
            //$("#subtitle").text(profileName.split(" ")[1]);
            function facebook(css) {
                var head, style;
                head = document.getElementsByTagName('head')[0];
                if (!head) {
                    return;
                }
                style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'profile-css';
                style.innerHTML = css;
                head.appendChild(style);
            }
            facebook("#fb-userimage { background: url('" + profileImageURL + "') center center no-repeat }");
            $(".fbid").text(id);
            /*** Magia xD ***/
            $("#lvl, #levelsts").fadeIn("slow");
            $(".duex-profile-container").fadeIn("slow");
            /*** Magia xD ***/
            $("#profileButtons").empty();
            $("#profileButtons").append('<button class="btn btn-logout" id="btnLogoutFB">Logout <span uk-icon="icon: sign-out"></span></button>');
            response.source = location.host;
            //checkPlayer(response);
        });
    }, 3500);
    setTimeout(function(){
        $("#profileBlock").fadeOut("slow");
    }, 5500);
}