// The capacity of each table
var cap = [5,5,5,8,5,5,5,8]

var tabloc = {
    // The location of each table
    // True is inside
    // False is outside
    t1: true,
    t2: true,
    t3: true,
    t4: false,
    t5: true,
    t6: true,
    t7: true,
    t8: false
}

// Function which makes sure that the user is logged in and authenticated
// Done by checking whether auth (in s.storage) is not set to true.
function loginEnsure() {
    if(sessionStorage.getItem("auth") == false || sessionStorage.getItem("auth") == null) {
        swal("Whoops! Something went wrong.", "Please login again.")
        goHome();
    } 
}

function infoModal() {
    swal({
        title:'What is RManager?',
        text:'RManager is a tool for restaurants to create, manage and manipulate bookings. \nTo find out more, visit the docs.',
        icon: 'info',
    })
}

function regLoad() {
    window.open("start.html", "_self")
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
    //var confirmation = confirm("Are you sure you want to do that? \nClearing the local storage will delete all bookings, logins and data from RM. \nContinue?")

    swal({
        title: "Are you sure you want to do that?",
        text: "Doing so will delete all usernames, passwords, bookings and other data.",
        icon: "warning",
        buttons: true,
        dangermode: true}
        )
    .then((value) => {
        if(value == true) {
            localStorage.clear();
            var emptarr = "";
            localStorage.setItem("bookingsList", emptarr);
            console.log("%cLocal storage was cleared. Approved by user.", "color: red; font-size: 20px;")
            swal({
                title: "Done!",
                text: "Local Storage has been Cleared",
                icon: "success"
            })
            }
        else {
            swal("Ok then.","Local storage has not been cleared.");
            console.log("%cLocal storage was NOT cleared. Aborted by user.", "color: red; font-size: 20px;")
            }
      });
}

// This function runs when each page is loaded and does chores such as authentication and DOM manipulation
function loadFunction() {
    if(sessionStorage.getItem("auth") == false || sessionStorage.getItem("auth") == null) {
        alert("Whoops! Something went wrong. Please login again.")
        goHome();
    }
    document.getElementById("stid").innerHTML = sessionStorage.getItem("stID");
}

// Runs on main page to populate tables with correct information
function loadFunctionMain() {
    if(sessionStorage.getItem("auth") == false || sessionStorage.getItem("auth") == null) {
        alert("Whoops! Something went wrong. Please login again.")
        goHome();
    }
    document.getElementById("stid").innerHTML = sessionStorage.getItem("stID");


    //document.getElementById("t6.6").innerHTML = "this is a test"
    for(i=0;i<8;i++){
        for(a=0;a<4;a++){
            let str = "tableAlloc" + localStorage.getItem("//set/DateSet") + (a+6) + (i+1)
            if(JSON.parse(localStorage.getItem(str)) == null) {
                let id = "t" + (i+1) + "." + (a+6);
                document.getElementById(id).innerHTML = (a+6) + "PM: not booked "
            }
            else if(JSON.parse(localStorage.getItem(str)).booked == true){
                let id = "t" + (i+1) + "." + (a+6);
                let text = (a+6) + "PM: Booked By " + JSON.parse(localStorage.getItem(str)).bookingName + " (" + JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem(str)).bookingName)).number + " people)"
                if(text.length > 35) {
                    text = text.substring(0,33) + "..."
                }
                document.getElementById(id).innerHTML = text
                document.getElementById(id).style.fill = "red"
            }
            else{
                let id = "t" + (i+1) + "." + (a+6);
                document.getElementById(id).innerHTML = (a+6) + "PM: not booked "
            }
        }
    }
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
                creationDate: Date.now(),
                alloc: false
        }
        
        // The button is faded out using some JQuery
        $("#submitButton").fadeOut();

        // A confirmation message appears with the respective details
        var confirmation = swal({
            title: "Confirm the following details:",
            text: "Name: " + bookingObject.bookingname + "\nDate: " + bookingObject.bookingdate + "\nTime: " + bookingObject.bookingtime + "\nNumber: " + bookingObject.number + "\nLocation: " + bookingObject.location,
            icon: "warning",
            buttons: true})
            .then((value) => {
                console.log(value);
                // This is run if the confirmation comes through as true
            if(value == true){

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
            swal({
                title: "Booking confirmed.",
                text: "You're all set. The booking is now in storage, ready for table allocation on the night.",
                icon: "success"})
                .then((value) => {
                $('#formcontainer').hide();
                $('#successdiv').show()
                window.open('main.html', '_self')})
                

        }
        else {
            $("#submitButton").fadeIn(3000);
        }
    
            })
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

// Function run when the booking is erased
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

// Checks if the entered record is valid (ie. it exists) and then forwards on to popup for change
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
        var confirmation = swal({title: "Please confirm these details:",
                                text: "Confirm the following details: \nName: " + bookingObject.bookingname + "\nDate: " + bookingObject.bookingdate + "\nTime: " + bookingObject.bookingtime + "\nNumber: " + bookingObject.number + "\nLocation: " + bookingObject.location,
                                buttons: true,
                                icon: "info"})
        .then((value) => {
            // This is run if the confirmation comes through as true
        if(value == true){

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
            swal({title: "Booking confirmed.",
                text: "The booking has been successfuly edited!",
                icon: "success"})
                .then(() => {
                    $('#formcontainer').hide();
                    $('#successdiv').show()
                    window.close()
                    window.close()
                })
        }
        else {
            $("#submitButton").fadeIn(3000);
        }

        })
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
        swal({
            title: "Whoops!",
            text: "Please enter something in the box below.",
            icon: "error"
        });
    }
}

/*
// This is the main function for table allocation (WIP)
function allocate() {
    var date = localStorage.getItem("alldate");
    var datenum6 = localStorage.getItem(date + 6);
    var datenum7 = localStorage.getItem(date + 7);
    var datenum8 = localStorage.getItem(date + 8);
    var datenum9 = localStorage.getItem(date + 9);

    var numarray = [datenum6, datenum7, datenum8, datenum9];
    var faterr = false;

    // Here, each part of the array is incremented and checked if it is over 20 or 0
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

    // This is run if all of the numbers are equal to null (as in, there are no registered bookings for that day)
    // It shows a div which tells the user that there are no active bookings for that date.
    if(datenum6 == null && datenum7 == null && datenum8 == null && datenum9 == null) {
        setTimeout(function(){$('#cont3').fadeIn(250);}, 500);
        return;
    }

    // The search by time / date function is run to get an array of bookigns for each time.
    var all6 = searchRoutine("time/date", date + 6);
    var all7 = searchRoutine("time/date", date + 7);
    var all8 = searchRoutine("time/date", date + 8);
    var all9 = searchRoutine("time/date", date + 9);

    // A function is called to search to search for inside/outside booking for each time-date combination.
    var outArr6 = getOutsideTables(all6,"Outside Table");
    var outArr7 = getOutsideTables(all7,"Outside Table");
    var outArr8 = getOutsideTables(all8,"Outside Table");
    var outArr9 = getOutsideTables(all9,"Outside Table");
}


// This function gets the outside tables for any given date/time combination
function getOutsideTables(arr, result) {
    var l = arr.length;
    var truearr = [];

    // This loop block loops through and checks whether the criteria is met for each record in localStorage
    for (i = 0; i < l; i++) {
        var objct = JSON.parse(localStorage.getItem(arr[i]))
        if (objct == null) {}
        else if(objct.bookingdate + objct.location == result) {
            truearr.push(objct.bookingname);
        }
    }
    return truearr;
}

*/

function getAllBookingsFile() {
    $("#btn1").fadeOut()
    $("#btn2").fadeOut()
    setTimeout(function(){ $("#results").fadeIn(); }, 1000)
    var allrecords = splitRecords();
    for(i=0;i<allrecords.length;i++){
        if (allrecords[i] == null) {}
        else{
            allobjct = JSON.parse(localStorage.getItem(allrecords[i]));
            if(allobjct != null){
            document.getElementById("results").value = document.getElementById("results").value + "Name: " + allobjct.bookingname + "\nDate: " + allobjct.bookingdate + "\nTime: " + allobjct.bookingtime + "\nLocation: " + allobjct.location + "\nNumber: " + allobjct.number + "\n\n";
        }
        }
    }
}

// Is run when a date is selected by the user
function updateDate() {
let date = document.getElementById("todayDate").value;
if(date != ""){
localStorage.setItem("//set/DateSet", date);
swal({
    title: "All set!",
    text: "Today's date is now set to " + date + ".",
    icon: "success"
})
}
else {
    swal({
        title: "Whoops!",
        text: "Make sure you entered something into the date field!",
        icon: "warning"
    })
}
}

// This is run when a table allocation is made. It populates the booking name dropdown based on who is booked for that date and time.
function fillDDown() {
    // Some variables are defined
    let time = document.getElementById("timeSelection").value;
    let x = document.getElementById("bookings")

    // The function is called to clear all existing items in the dropdown
    removeOptions(document.getElementById("bookings"));

    // Here, the options are queried and then populated into the dropown
    if(time != ""){
        let found = false;
        let records = splitRecords();
        let fbnalloc = false
        for(i=0;i<(records.length -1); i++){
            if(JSON.parse(localStorage.getItem(records[i])) != undefined) {
            if(JSON.parse(localStorage.getItem(records[i])).bookingdate == localStorage.getItem("//set/DateSet")) {
                if(JSON.parse(localStorage.getItem(records[i])).bookingtime == time){
                    if(JSON.parse(localStorage.getItem(records[i])).alloc != true) {
                        found = true;
                        let option = document.createElement("option")
                        option.text = JSON.parse(localStorage.getItem(records[i])).bookingname
                        option.value = JSON.parse(localStorage.getItem(records[i])).bookingname
                        x.add(option)
                    }
                    fbnalloc = true
                }
            }
        }
    }
        if(found == false) {
            if(fbnalloc == true) {
                swal({
                    title: "Error",
                    text: "All bookings are allocated for that time (" + localStorage.getItem("//set/DateSet") + ", " + time + ":00 PM).",
                    icon: "error"
                })
            }
            else{
            swal({
                title: "Error",
                text: "No bookings were found for that time and date (" + localStorage.getItem("//set/DateSet") + ", " + time + ":00 PM).",
                icon: "error"
            })
        }
        }
    }
    else {}
    }

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

// Gets booking details on refresh of dropdown
function getBookingDetails() {
    let ddwn = document.getElementById("bookings")
    let obj = JSON.parse(localStorage.getItem(ddwn.value))
    
    swal({
        title: "Booking Details",
        text: "Booking Name: " + obj.bookingname + "\nBooking Time: " + obj.bookingtime + "\nBooking Date: " + obj.bookingdate + "\nAmount of People: " + obj.number + "\nTime Booked: " + obj.creationDate + "\n"
    })
}

function allocTab() {
    let booking = document.getElementById("bookings")
    let obj = JSON.parse(localStorage.getItem(booking.value))
    let table = document.getElementById("tab")

    if(booking.value == ""){
        swal({
            title: "Whoops",
            text: "Please select a booking.",
            icon: "error"
        })
        return
    }

    let str = "tableAlloc" + localStorage.getItem("//set/DateSet") + document.getElementById("timeSelection").value + table.value
    if(obj.number > cap[table.value - 1]) {
        swal({
            title: "Over Capacity",
            text: "Too many people for that table.",
            icon: "error"
        })
        
    }
    else if(localStorage.getItem(str) == "" || localStorage.getItem(str) == undefined || localStorage.getItem(str) == null){
        let cont = {
            booked: true,
            bookingName: booking.value,
            timeAllocated: Date.now()
        }
        localStorage.setItem(str, JSON.stringify(cont))
        obj.alloc = true;
        localStorage.setItem(booking.value, JSON.stringify(obj))
        
        swal({
            title: "All set",
            text: "Table has been successfuly allocated. Details are as follows: \nBooking Name: " + obj.bookingname + "\nBooking Time: " + obj.bookingtime + "\nBooking Date: " + obj.bookingdate + "\nAmount of People: " + obj.number + "\nAssigned to:" + table.value 
        })
    }
    else{
        swal({
            title: "That Table is Already Booked",
            text: "Already booked by: " + JSON.parse(localStorage.getItem(str)).bookingName,
            icon: "error"
        })
    }
}

function loadPopUp(table) {
    i = table
        for(a=0;a<4;a++){
            let str = "tableAlloc" + localStorage.getItem("//set/DateSet") + (a+6) + (i+1)
            if(JSON.parse(localStorage.getItem(str)) == null) {
                let id = "t" + (i+1) + "." + (a+6);
                document.getElementById(id).innerHTML = (a+6) + "PM: not booked "
            }
            else if(JSON.parse(localStorage.getItem(str)).booked == true){
                let id = "t" + (i+1) + "." + (a+6);
                let text = (a+6) + "PM: Booked By " + JSON.parse(localStorage.getItem(str)).bookingName + " (" + JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem(str)).bookingName)).number + " people)"
                document.getElementById(id).innerHTML = text
                document.getElementById(id).style.color = "red";
                document.getElementById(id).style.fontWeight = "bold";
            }
            else{
                let id = "t" + (i+1) + "." + (a+6);
                document.getElementById(id).innerHTML = (a+6) + "PM: not booked "
            }
        }
    }
 