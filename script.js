
// Function which makes sure that the user is logged in and authenticated
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

// Function which takes the user to the login page
function goToLogin() {
    window.open("RManagerLogin/loginpage.html","_self")
}

// Function which clears the local storage for the user.
// Verification is also used here to make sure the user is intentionally doing so.
function clearLocal() {
    var confirmation = confirm("Are you sure you want to do that? \nClearing the local storage will delete all bookings, logins and data from RM. \nContinue?")

    if(confirmation == true) {
    localStorage.clear();
    console.log("%cLocal storage was cleared. Approved by user.", "color: red; font-size: 20px;")
    }
    else {
        alert("Ok then. \nLocal storage has not been cleared.");
        console.log("%cLocal storage was NOT cleared. Aborted by user.", "color: red; font-size: 20px;")
    }
}

// This function runs when each page is loaded and does chores such as authentication and DOM manipulation
function loadFunction() {
    if(sessionStorage.getItem("auth") == false || sessionStorage.getItem("auth") == null) {
        alert("Whoops! Something went wrong. Please login again.")
        goHome();
    }
    document.getElementById("stid").innerHTML = sessionStorage.getItem("stID");
}

// The below functions open the respective page for each table.
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

// This function is run when a new booking is made
function submitFunction() {

    // Here, variables are assigned from the respective document values
    var date = document.getElementById("date").value;
    var numberOfPeople = document.getElementById("howMany").value;
    var time = document.getElementById("timeSelection").value;
    var tableLocation = document.getElementById("insideOut").value;
    var name = document.getElementById("name").value;

    if(date == null || date == "") {
        alert("Please enter text into the fields below.");
        $("#date").css('color', 'red');
        return;
    }
    else {
        $('#date').removeAttr('style');
    }

    // A console log is made of all variables for troubleshooting and recording
    console.log(date);
    console.log(numberOfPeople);
    console.log(time);
    console.log(tableLocation);
    console.log(name);

    // Here, the program checks whether a record has already been made with the specific primary key.
    if(localStorage.getItem(name) != null) {
        alert("That name alrady exists in records. Please change it or clear records.")
    }

    // This is run if the name is unique.
    else{
        // Here, a new object is created with the parameters of the variables listed above.
        var bookingObject = new Object();
        var bookingObject = {
                bookingname: name,
                bookingdate: date,
                bookingtime: time,
                number: numberOfPeople,
                location: tableLocation,
        }
        
        // The button is faded out using some JQuery
        $("#submitButton").fadeOut();

        // A confirmation message appears with the respective details
        var confirmation = confirm("Confirm the following details: \nName: " + bookingObject.bookingname + "\nDate: " + bookingObject.bookingdate + "\nTime: " + bookingObject.bookingtime + "\nNumber: " + bookingObject.number + "\nLocation: " + bookingObject.location);
        // This is run if the confirmation comes through as true
        if(confirmation == true){

            var datetime = date + time;
            console.log("DT: " + datetime);

            if(localStorage.getItem(datetime) === undefined) {
                localStorage.setItem(date, numberOfPeople);
            }
            else {
                var dnum = localStorage.getItem(datetime);
                dnum = Number(dnum) + Number(numberOfPeople);
                localStorage.setItem(datetime, dnum);

                if(Number(localStorage.getItem(datetime)) > 20) {
                    alert("Whoops. Too many people are booked for that day and time.")
                    console.log("%cToo many people booked that day. Booking aborted.", "color: red;");
                    $("#submitButton").fadeIn(3000);

                    return;
                }

            }

            console.log("Total amouunt of people booked for that time: " + localStorage.getItem(datetime));
            localStorage.setItem(name, JSON.stringify(bookingObject))
            alert("Booking confirmed.")
            //window.open('main.html', '_self')
        }
        else {
            $("#submitButton").fadeIn(3000);
        }
    }
    }
