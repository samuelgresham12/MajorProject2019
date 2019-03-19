
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
    }

}

function loginRedirect() {
    var username = document.getElementById("username").value;
    alert("Login Successful.")
    sessionStorage.setItem("auth", true);
    sessionStorage.setItem("stID", username);
    window.open("C:/Users/samue/Documents/Code/RManager/main.html","_self");
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
    var encstring = revarray.join();
    return encstring;

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