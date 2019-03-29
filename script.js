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


function goToLogin() {
    window.open("RManagerLogin/loginpage.html","_self")
}

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

function submitFunction() {
    var date = document.getElementById("date").value;
    var numberOfPeople = document.getElementById("howMany").value;
    var time = document.getElementById("timeSelection").value;
    var tableLocation = document.getElementById("insideOut").value;
    var name = document.getElementById("name").value;

    console.log(date);
    console.log(numberOfPeople);
    console.log(time);
    console.log(tableLocation);
    console.log(name);

    if(localStorage.getItem(name) != null) {
        alert("That name alrady exists in records. Please change it or clear records.")
    }

    else{
        var bookingObject = new Object();
        var bookingObject = {
                bookingname: name,
                bookingdate: date,
                bookingtime: time,
                number: numberOfPeople,
                location: tableLocation,
        }
        
        
        $("#submitButton").fadeOut();
        console.log(JSON.parse(localStorage.getItem(name)));
        var confirmation = confirm("Confirm the following details: \nName: " + bookingObject.bookingname + "\nDate: " + bookingObject.bookingdate + "\nTime: " + bookingObject.bookingtime + "\nNumber: " + bookingObject.number + "\nLocation: " + bookingObject.location);
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
