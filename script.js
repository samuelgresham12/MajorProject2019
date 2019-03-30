
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
function submitFunction(dist) {

    // Here, variables are assigned from the respective document values
    var date = document.getElementById("date").value;
    var numberOfPeople = document.getElementById("howMany").value;
    var time = document.getElementById("timeSelection").value;
    var tableLocation = document.getElementById("insideOut").value;
    var name = document.getElementById("name").value;

    if(date == null || date == "" || name == "") {
        alert("Please enter text into the fields below.");
        
        if (date == null || date == "") {
            $("#date").css('outline', '1px solid red');
        }
        else {
            $('#date').removeAttr('style');
        }
        if (name == "") {
            $("#name").css('outline', '1px solid red');
        }
        else {
            $("#name").removeAttr('style');
        }
        return;
    }
    else {
        $('#date').removeAttr('style');
        $("#name").removeAttr('style');
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
        return;
    }

    else{
    // This is run if the name is unique.
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

            //The primary key for the localstorage entry is generated using the booking date and time
            var datetime = date + time;
            console.log("DT: " + datetime);

            // If the storage does not exist yet, it is created and filled with the booking number
            if(localStorage.getItem(datetime) === undefined) {
                localStorage.setItem(date, numberOfPeople);
            }
            // If localstorage has a record of the date/time, then the contents are incremented by the amount of people.
            else {
                var dnum = localStorage.getItem(datetime);
                dnum = Number(dnum) + Number(numberOfPeople);
                localStorage.setItem(datetime, dnum);

                // If there are too many people booked in that specific time slot, the program throws an error.
                if(Number(localStorage.getItem(datetime)) > 20) {
                    alert("Whoops. Too many people are booked for that day and time.")
                    console.log("%cToo many people booked that day. Booking aborted.", "color: red;");
                    localStorage.getItem(datetime) = localStorage.getItem(datetime) - numberOfPeople;
                    $("#submitButton").fadeIn(3000);

                    return;
                }

            }

            console.log("Total amouunt of people booked for that time: " + localStorage.getItem(datetime));
            localStorage.setItem(name, JSON.stringify(bookingObject))
            alert("Booking confirmed.")
            $('#formcontainer').hide();
            $('#successdiv').show()
            //window.open('main.html', '_self')
        }
        else {
            $("#submitButton").fadeIn(3000);
        }
    }
    }


    function queryBooking () {
        var input = document.getElementById("inputQuery").value;
        sessionStorage.setItem('inp', input);

        $('#bookingName').html("");
        $('#bookingDate').html("");
        $('#bookingTime').html("");
        $('#bookingLocation').html("");
        $('#bookingAmount').html("");

        // Basic data validation to ensure the user entered something into the box.
        if(input == "") {
            alert("Please enter data into the box.")

            // Puts an outline around the offending object to make it clear that nothing was entered there.
            $("#inputQuery").css('outline', '1px solid red');
            return;
        }

        else {
            // If there is no data validation issue, the style (red outline around box) is removed (if it ever was set to red outline due to an error.)
            $('#inputQuery').removeAttr('style');
        }

        if(localStorage.getItem(input) == undefined || localStorage.getItem(input) == null) {
            alert("Sorry, I couldn't find any records for '" + input + "'. \n \nAre you sure you spelled it correctly?")
        }

        else {
            var bookingDetails = JSON.parse(localStorage.getItem(input))

            console.log(bookingDetails);

            sessionStorage.setItem('bookingRef', input);

            $('#resultsDiv').show()
            $('#bookingName').html(bookingDetails.bookingname);
            $('#bookingDate').html(bookingDetails.bookingdate);
            $('#bookingTime').html(bookingDetails.bookingtime + ":00 pm");
            $('#bookingLocation').html(bookingDetails.location);
            $('#bookingAmount').html(bookingDetails.number + " people");

        }
    }

    function eraseBooking() {
        var input = sessionStorage.getItem('bookingRef')
        var name = sessionStorage.getItem('inp');

        if(input === undefined) {
            console.log("%cERROR: Cannot find booking.", "color: red;")
            alert("Please enter something in the text box above.")
        }
        else {
            var confirmation = confirm("Are you sure you want to delete this booking?")

            if(confirmation == false) {
                console.log("Booking NOT deleted. Terminated by user.")
            }
            else if(confirmation == true) {
                console.log('%cRecord deleted permanantly from LocalStorage. Permission from user recieved.', "color: red")
                localStorage.removeItem(name);

            }
        }
    }

function editBooking() {
    window.open('editBooking.html', "", "width=1000,height=1000")
}

function loadFunctionEdit() {
    if(sessionStorage.getItem("auth") == false || sessionStorage.getItem("auth") == null) {
        alert("Whoops! Something went wrong. Please login again.")
        goHome();
    }
    document.getElementById("stid").innerHTML = sessionStorage.getItem("stID");
    document.getElementById("itemcurrview").innerHTML = sessionStorage.getItem("inp");

    var booking = JSON.parse(localStorage.getItem(sessionStorage.getItem('bookingRef')));
    console.log(booking)
    $('#date').val(booking.bookingdate);
    $('#howMany').val(booking.number);
    $('#timeSelecton').val(7);

    if(booking.location == "Inside Table"){
        $('#insideOut').val("Inside Table");
    }
    else if(booking.location == "Outside Table") {
        $('#insideOut').val("Outside Table");
    }

    $('#name').val(booking.bookingname);
    
}

function updateFunction() {

    // Here, variables are assigned from the respective document values
    var date = document.getElementById("date").value;
    var numberOfPeople = document.getElementById("howMany").value;
    var time = document.getElementById("timeSelection").value;
    var tableLocation = document.getElementById("insideOut").value;
    var name = document.getElementById("name").value;

    if(date == null || date == "" || name == "") {
        alert("Please enter text into the fields below.");
        
        if (date == null || date == "") {
            $("#date").css('outline', '1px solid red');
        }
        else {
            $('#date').removeAttr('style');
        }
        if (name == "") {
            $("#name").css('outline', '1px solid red');
        }
        else {
            $("#name").removeAttr('style');
        }
        return;
    }
    else {
        $('#date').removeAttr('style');
        $("#name").removeAttr('style');
    }

    // A console log is made of all variables for troubleshooting and recording
    console.log(date);
    console.log(numberOfPeople);
    console.log(time);
    console.log(tableLocation);
    console.log(name);

    // This is run if the name is unique.
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

            //The primary key for the localstorage entry is generated using the booking date and time
            var datetime = date + time;
            console.log("DT: " + datetime);

            var booking = JSON.parse(localStorage.getItem(sessionStorage.getItem('bookingRef')));
            var originalbookingnum = booking.number;
            var numberoriginal = localStorage.getItem(datetime)
            var numberminusold = numberoriginal - originalbookingnum
            var finalnum = Number(numberminusold) + Number(bookingObject.number);

            // If there are too many people booked in that specific time slot, the program throws an error.
            if(finalnum > 20) {
                alert("Whoops. Too many people are booked for that day and time.")
                console.log("%cToo many people booked that day. Booking aborted.", "color: red;");
                $("#submitButton").fadeIn(3000);

                return;
            }

            localStorage.setItem(datetime, finalnum);

            }

            console.log("Total amouunt of people booked for that time: " + localStorage.getItem(datetime));
            localStorage.setItem(name, JSON.stringify(bookingObject))
            alert("Booking confirmed.")
            $('#formcontainer').hide();
            $('#successdiv').show()
            window.close()
            //window.open('main.html', '_self')
        }
