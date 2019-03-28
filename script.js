function loginEnsure() {
    if(sessionStorage.getItem("auth") == false || sessionStorage.getItem("auth") == null) {
        alert("Whoops! Something went wrong. Please login again.")
        goHome();
    } 
}


// Function which is called when the button to login as admin is called. 
// Opens page "adminlogin.html" in the same tab/window (_self)
function loginAsAdmin() {
    window.open("adminlogin.html","_self")
    console.log("Admin Login Entered")
}

// Function which is called when the user presses a button which takes them to the index.
// Same functionality as above.
function goHome() {
    window.open("index.html","_self")
    sessionStorage.clear()

}

//
function goToLogin() {
    window.open("RManagerLogin/loginpage.html","_self")
}

function loadFunction() {
    if(sessionStorage.getItem("auth") == false || sessionStorage.getItem("auth") == null) {
        alert("Whoops! Something went wrong. Please login again.")
        goHome();
    }
    document.getElementById("stid").innerHTML = sessionStorage.getItem("stID");
}

function table1() {
    window.open("table1.html", "_self")
}

function table2() {
    window.open("table2.html", "_self")
}

function table3() {
    window.open("table3.html", "_self")
}

function table4() {
    window.open("table4.html", "_self")
}

function table5() {
    window.open("table5.html", "_self")
}

function table6() {
    window.open("table6.html", "_self")
}

function table7() {
    window.open("table7.html", "_self")
}

function table8() {
    window.open("table8.html", "_self")
}

function backHomeLgn() {
    window.open("main.html","_self")
}


// Is run when a booking is logged. 
// Verifies and enters booking data into localStorage
function addBooking () {
    // Vars are defined here
    var date = document.getElementById('dateInput').value;
    var num = document.getElementById('numInput').value;
    var window = document.getElementById('windowInput').value;

    // This ensures that the user has entered data into the required fields
    if(date == "" || num == "") {
        alert("Whoops! Please enter data into all the fields.")
    }

if(bookingKeyArray[0] = undefined) {
    var bookingKeyArray = [];
}

var distinct = false;

    while(distinct = false) {
        var bookingKey = generateKey()
        if(bookingKeyArray.indexOf(bookingKey) == -1) {
            bookingKeyArray[bookingKeyArray.length+1] = bookingKey;
            distinct = true;
        }
    }
}

function generateKey() {
    var key = Math.floor(Math.random()*1000)
    return key;
}
