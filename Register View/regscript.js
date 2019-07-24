function selectBooking() {
  document.getElementById("main").style = "display:none"
  document.getElementById("toshow").style = "display:inline; width:80%"
}

function settable() {
  var time = document.getElementById("timeSelection").value;
  var table = document.getElementById("tab").value;
  var timetable = time + " " + table;

  let str = "tableAlloc" + localStorage.getItem("//set/DateSet") + time + table
    if(JSON.parse(localStorage.getItem(str)) == null) {
      swal({
        title: "Success! (No Booking)",
        text: "Table has been selected. \n NB: There is no booking bound to that table, meaning that it will be run as an open table.",
        icon: "success"
      })
      .then((val) => {
        document.getElementById("main").style = "display:inline"
    })
    }

    else {
      swal({
        title: "All Done!",
        text: "Table: " + table + " and Time: " + time + " selected. A booking has also been found with name: " + JSON.parse(localStorage.getItem(str)).bookingName + ".",
        icon: "success"
      })
      .then((val) => {
        document.getElementById("main").style = "display:block"
        document.getElementById("toshow").style = "display:none"
    })
  }
}

function addItem(itemId) {
  alert(itemId)
}