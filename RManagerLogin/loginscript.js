
// This function is run when the login button is pressed.
// It checks and authenticates the input and then passes over to the loginredirect function.
function loginStart() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username == "" || password == "") {
        alert("Please enter your username and password in the fields below.");
        return;
    }

    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem(username) == encrypt(password)){
            loginRedirect();
        }
        else {
            alert("Sorry, that pasword is wrong.")
        }
      } else {
        alert("Sorry, your browser is incompatible. Please use another browser.")
      }

}

// This function is run when the user requests a new account be made.
// It checks and authenticates the input.
function createAccount() {
    var requsername = document.getElementById("username").value;
    var reqpassword = document.getElementById("password").value;

    if(requsername == "" || requsername == "") {
        alert("Please enter your username and password in the fields below.");
        return;
    }

    if (localStorage.getItem(requsername) !== null){
        alert("Whoops! That username is already taken.")
    }
    else {
        var username = requsername;
        var password = reqpassword;

        var encpas = encrypt(password);

        localStorage.setItem(username, encpas);
        alert("Success! Account Created.")
        window.open("loginpage.html", "_self");
    }

}

function loginRedirect() {
    var username = document.getElementById("username").value;
    sessionStorage.setItem("auth", true);
    sessionStorage.setItem("stID", username);
    window.open("../main.html","_self");
}

function acccreateRedirect () {
    window.open("acccreate.html","_self")
}

function goHomeLogin () {
    window.open("loginpage.html","_self")
}

function encrypt(pass) {
    var passarray = pass.split("");
    var revarray = passarray.reverse();

    for(i=0; i<revarray.length; i++){
        switch(revarray[i]){
            case "a":
                revarray[i] = "01"
                break;
            case "b":
                revarray[i] = "02"
                break;
        }
    }

    var finalstr = revarray.join();
    return finalstr;

}

function decrypt(encpass) {
    var encarray = encpass.split("");
    var passarray = encarray.reverse();
    var passw = passarray.join();
    return passw;
}

function tellMeMore() {
    window.open("info.html","_self")
}