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
    var emptarr = "";
    localStorage.setItem("bookingsList", emptarr);
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
                creationDate: date.Now()
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
                    localStorage.setItem(datetime, (localStorage.getItem(datetime) - Number(numberOfPeople)));
                    $("#submitButton").fadeIn(3000);

                    return;
                }

            }

            console.log("Total amouunt of people booked for that time: " + localStorage.getItem(datetime));
            localStorage.setItem(name, JSON.stringify(bookingObject))
            var namesarr = localStorage.getItem("bookingsList");
            var newarr = namesarr + bookingObject.bookingname + "^!";
            localStorage.setItem("bookingsList", newarr);
            alert("Booking confirmed.")
            $('#formcontainer').hide();
            $('#successdiv').show()
            window.open('main.html', '_self')
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

// 
function eraseBooking() {
    var input = sessionStorage.getItem('bookingRef')
    var name = sessionStorage.getItem('inp');

    console.log(name)
    console.log(input)

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
            console.log('%cRecord deleted permanantly from LocalStorage. Permission from user recieved.', "color: red");
            var bookingobj = JSON.parse(localStorage.getItem(name));
            var bookingnum = bookingobj.number;
            var nightnum = localStorage.getItem(bookingobj.bookingdate + bookingobj.bookingtime);
            var newsum = nightnum - bookingnum;
            localStorage.setItem(bookingobj.bookingdate + bookingobj.bookingtime, newsum);
            localStorage.removeItem(name);
            }
        }
    }


function editBooking() {
    var input = document.getElementById("inputQuery").value;
    if(localStorage.getItem(input) == undefined) {
        alert("Whoops! \nI can't seem to find that record.")
    }
    else{window.open('editBooking.html', "", "width=1000,height=450")}
}

// This function is run when the edit booking popup is run 
// It authenticates and subsequently fills in the fields with the stored data
function loadFunctionEdit() {
    if(sessionStorage.getItem("auth") == false || sessionStorage.getItem("auth") == null) {
        alert("Whoops! Something went wrong. Please login again.")
        goHome();
    }
    document.getElementById("stid").innerHTML = sessionStorage.getItem("stID");
    document.getElementById("itemcurrview").innerHTML = sessionStorage.getItem("inp");

    // This block replaces the fields with the data which is stored in localStorage
    var booking = JSON.parse(localStorage.getItem(sessionStorage.getItem('bookingRef')));
    console.log(booking)
    $('#date').val(booking.bookingdate);
    $('#howMany').val(booking.number);
    $('#timeSelecton').val(1);
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
    var numberOfPeople = document.getElementById("howMany").value;
    var tableLocation = document.getElementById("insideOut").value;
    var name = document.getElementById("name").value;
    var time = JSON.parse(localStorage.getItem(name)).bookingtime;
    var date = JSON.parse(localStorage.getItem(name)).bookingdate;

    // A console log is made of all variables for troubleshooting and recording
    console.log(numberOfPeople);
    console.log(tableLocation);
    console.log(name);

    // This is run if the name is unique.
        // Here, a new object is created with the parameters of the variables listed above.
        var bookingObject = new Object();
        var bookingObject = {
                bookingname: name,
                bookingdate: JSON.parse(localStorage.getItem(name)).bookingdate,
                bookingtime: JSON.parse(localStorage.getItem(name)).bookingtime,
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

            

            console.log("Total amount of people booked for that time: " + localStorage.getItem(datetime));
            localStorage.setItem(name, JSON.stringify(bookingObject))
            alert("Booking confirmed.")
            $('#formcontainer').hide();
            $('#successdiv').show()
            window.close()
            window.close()
        }
        else {
            $("#submitButton").fadeIn(3000);
        }
    }

    // This function pushes two parameters into a textfile using the filesaver.js package
function SaveAsFile(filecontent, filename) {
    // This creates a blob with the content parameter and as text type plain text
    var blob = new Blob([filecontent], {type: "text/plain;charset=utf-8"});
    // This saves the blob under the filename with txt extension
    saveAs(blob, filename+".txt");
    }

// This function prepares the file for export
function prepareFile () {
    // The key for grabbing the stored object is found from the text box
    var key = document.getElementById("inputQuery").value;
    // The booking object is then parsed from localstorage
    var bookingobj = JSON.parse(localStorage.getItem(key));
    // Variables are defined from the retrieved object
    var name = bookingobj.bookingname;
    var time = bookingobj.bookingtime;
    var date = bookingobj.bookingdate;
    var number = bookingobj.number;
    var location = bookingobj.location;
    // An output string is generated from the above variables
    var outputStr = "Booking File Generated by RManager \r\nBooking Name: " + name + "\r\nBooking Date: " + date + "\r\nBooking Time: " + time + "\r\nAmount of People: " + number + "\r\nLocation: " + location
    // Function SaveAsFile is called with parameters of (content, filename)
    SaveAsFile(outputStr, name + date + ".txt");
}

function splitRecords () {
    var recordstr = localStorage.getItem("bookingsList");
    var recordarr = recordstr.split("^!");
    return recordarr;
}

// Queries the bookings based on date or date/time
// Acts as a shell for the search functions and puts string together
function searchRoutine(searchparam, result) {

    // This calls the splitrecords function which splits the records into an array of keys
    var recordarray = splitRecords() 

    // This decides what search to do
    switch (searchparam) {
        case "date":
            var resultarr = searchByDate(recordarray, result);
            break;
        case "time/date":
            var resultarr = searchByTimeDate(recordarray, result);
            break;
    }

    var string = "";

    // This block puts together the string which is then saved as a txt.
    string = string + "Record made by RManager. \r\nRecord for date: " + result;
    var l = resultarr.length;

    for (i = 0; i < l; i++) {
        obj = JSON.parse(localStorage.getItem(resultarr[i]))
        string = string + "\r\n \r\nName: " + obj.bookingname + "\r\nDate: " + obj.bookingdate + "\r\nTime: " + obj.bookingtime + "\r\nNumber of People: " +
        obj.number + "\r\nLocation: " + obj.location;
    }

    string = string + "\r\n \r\nQuery Complete."

    // The file is saved here by calling the SaveAsFile function with params
    SaveAsFile(string, result);
}


// Function which searches by date
function searchByDate(arr, result) {
    var l = arr.length;
    var truearr = [];

    // This loop block loops through and checks whether the criteria is met for each record in localStorage
    for (i = 0; i < l; i++) {
        var objct = JSON.parse(localStorage.getItem(arr[i]))
        if (objct == null) {}
        else if(objct.bookingdate == result) {
            truearr.push(objct.bookingname);
        }
    }

    return truearr;
}


// Function which searches by both date and time
function searchByTimeDate(arr, result) {
    var l = arr.length;
    var truearr = [];

    // This loop block loops through and checks whether the criteria is met for each record in localStorage
    for (i = 0; i < l; i++) {
        var objct = JSON.parse(localStorage.getItem(arr[i]))
        if (objct == null) {}
        else if(objct.bookingdate + objct.bookingtime == result) {
            truearr.push(objct.bookingname);
        }
    }

    return truearr;
}


// This function is the front-end interface for the query page. 
// It calls the respective function (searchRoutine) if the input critera are met
function query(type) {
    var date = document.getElementById("date").value;
    var time = document.getElementById("dateSelection").value;

    if(type == "date") {
        searchRoutine("date", date);
    }
    else if (type == "dt") {
        searchRoutine("time/date", date + time);
    }
    else {
        alert ("Whoops, something went wrong. \n \nPlease try again.")
    }
}

// This is a prototype function for the dynamic UI found on the table allocation wizard.
function fadeTest() {

    var inp = document.getElementById("date").value;

    if(inp != "") {
    $('#cont1').fadeOut(200);
    setTimeout(function(){$('#cont2').fadeIn(250);}, 200);
    localStorage.setItem("alldate", inp);
    }
    else {
        alert("Please enter something in the box below.")
    }
}

// This is the main function for table allocation (WIP)
function allocate() {
    var date = localStorage.getItem("alldate");
    var datenum6 = localStorage.getItem(date + 6);
    var datenum7 = localStorage.getItem(date + 7);
    var datenum8 = localStorage.getItem(date + 8);
    var datenum9 = localStorage.getItem(date + 9);

    var numarray = [datenum6, datenum7, datenum8, datenum9];
    var faterr = false;

    for(i=0;i<numarray.length;i++) {
        if(numarray[i] > 20) {
            console.log("%cFatal error: " + numarray[i] + " (index " + i + ") is too big. Stopped operating.", "color: yellow;")
            faterr = true;
        }
        if(numarray[i] == null){
            console.log("%cOperational error: " + numarray[i] + " (index " + i + ") found (no bookings for this time). Continued operating.", "background-color: yellow;")
        }
    }
    if (faterr == true) {return;}

    if(datenum6 == null && datenum7 == null && datenum8 == null && datenum9 == null) {
        setTimeout(function(){$('#cont3').fadeIn(250);}, 500);
    }

    



}