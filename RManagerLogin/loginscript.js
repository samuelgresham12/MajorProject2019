
// This function is run when the login button is pressed.
// It checks and authenticates the input and then passes over to the loginredirect function.
function loginStart() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username == "" || password == "") {
        swal({
            title: "Please enter your username and password.",
            text: "It seems like you didnt enter data into both boxes. \nPlease do so in order to log in.",
            icon: "error"
        });
        return;
    }

    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem(username) == encrypt(password)){
            loginRedirect();
        }
        else {
            swal({
                title: "Whoops!",
                text: "It looks like that username or password is incorrect. Please try again.",
                icon: "error"
            })
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
        swal({
            title: "Please enter your username and password in the fields.",
            text: "Make sure you have entered text into both boxes and try again.",
            icon: "error"
        });
        return;
    }

    if (localStorage.getItem(requsername) !== null){
        swal({
            title: "Whoops!",
            text: "That username is already taken.",
            icon: "error"
        })
    }
    else {
        var username = requsername;
        var password = reqpassword;

        var encpas = encrypt(password);

        localStorage.setItem(username, encpas);
        
        swal({
            title: "Success! Account Created.",
            text: "You're all set! Now, navigate to the login page and login!",
            icon: "success"
        })
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