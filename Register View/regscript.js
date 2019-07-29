var items = {
  1:{
    name: "Beef Burger",
    price: 9.99,
    group: "mains"
  },
  2:{
    name: "Chicken Burger",
    price: 9.99,
    group: "mains"
  },
  3:{
    name: "Vegetarian Burger",
    price: 8.99,
    group: "mains"
  },
  11:{
    name: "Fries",
    price: 2.50,
    group: "sides"
  },
  12:{
    name: "Nuggets",
    price: 3.25,
    group: "sides"
  },
  13:{
    name: "Salad",
    price: 4,
    group: "sides"
  },
  21:{
    name: "Tomato Sauce",
    price: 0.5,
    group: "sauces"
  },
  22:{
    name: "Mayonnaise",
    price: 0.75,
    group: "sauces"
  },
  31:{
    name: "Iced Tea",
    price: 1.5,
    group: "drink"
  },
  32:{
    name: "Coke",
    price: 2,
    group: "drink"
  }
}

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
        document.getElementById("main").style = "display:block"
        document.getElementById("toshow").style = "display:none"
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
  
  console.log(items[itemId]);

  swal({
    title: "Item Added",
    text: items[itemId].name + " Added For $" + items[itemId].price.toFixed(2),
    icon: "success"})
  
}