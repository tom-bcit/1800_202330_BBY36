
function displaySpaceInfo() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"
  console.log(ID);


  db.collection("spaces")
    .doc(ID)
    .get()
    .then(doc => {
      thisSpace = doc.data();
      spaceCode = thisSpace.code;
      spaceName = doc.data().name;
      spaceDetails = doc.data().details;
      spaceCapacity = doc.data().capacity;
      spacelongitude = doc.data().longitude;
      spacelatitude = doc.data().latitude;
      spaceStatus = doc.data().status;
      if (doc.data().power_outlet) {
        spacePower = "Yes";
      } else {
        spacePower = "No"
      }


      // only populate title, image, description, capacity and power outlets
      document.getElementById("spaceName").innerHTML = spaceName;
      document.getElementById("details").innerHTML = spaceDetails;
      document.getElementById("capacity").innerHTML = spaceCapacity;
      document.getElementById("powerOutlet").innerHTML = spacePower;
      let imgEvent = document.querySelector(".space-img");
      imgEvent.src = "../images/" + spaceCode + ".jpg";
    });
}
displaySpaceInfo();



function saveSpaceDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("docID");
  localStorage.setItem('spaceDocID', ID);
}

function myMap() {
  // Retrieve ID from the URL parameters just like in displaySpaceInfo
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("docID");

  if (ID) { // Make sure ID is not null or undefined
    db.collection("spaces").doc(ID).get().then(doc => {
      if (doc.exists) {
        var spaceName = doc.data().name;
        var spaceStatus = doc.data().status; // Assuming status is also fetched from the database
        var statusDot = document.getElementById('statusDot');
        var mapProp;

        if (spaceName == "SE12 - Room 1") {
          mapProp = {
            center: new google.maps.LatLng(49.25001012909419, -123.00152632908595),
            zoom: 18,
          };
        } else if (spaceName == "SW1 - Room 1") {
          mapProp = {
            center: new google.maps.LatLng(49.251014057113906, -123.00266313271943),
            zoom: 18,
          };
        } else if (spaceName == "NE1 - Room 1") {
          mapProp = {
            center: new google.maps.LatLng(49.25411087424854, -123.00095403610528),
            zoom: 18,
          };
        }

        if (spaceStatus === 'green') {
          statusDot.style.backgroundColor = 'green';
        } else if (spaceStatus === 'red') {
          statusDot.style.backgroundColor = 'red';
        } else if (spaceStatus === 'yellow') {
          statusDot.style.backgroundColor = 'yellow';
        }

        //Initialize the map with mapProp...
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      } else {
        console.log("No such document!");
      }
    }).catch(error => {
      console.log("Error getting document:", error);
    });
  } else {
    console.log("Document ID is not provided in the URL parameters.");
  }

}

function changeColor() {
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("docID");

  if (ID) {
    db.collection("spaces").doc(ID).get().then(doc => {
      if (doc.exists) {
        var spaceStatus = doc.data().status; // Assuming status is also fetched from the database
        var statusDot = document.getElementById('statusDot');
        if (spaceStatus === 'green') {
          var confirmation = confirm("Are you sure you want to study at this location?");
          if (confirmation) {
            statusDot.style.backgroundColor = 'yellow';
          }
        } else if (spaceStatus === 'yellow') {
          var confirmation_y = confirm("Are you sure you want to study at this location?");
          if (confirmation_y) {
            statusDot.style.backgroundColor = 'red';
          }
        } else if (spaceStatus === 'red') {
          var confirmation_r = confirm("It is fully booking at this location, please change to another location");
          if (confirmation_r) {
            statusDot.style.backgroundColor = 'red';
          }
        } else {
          console.log("Status change cancelled.");
        }
      } else {
        console.log("No such document!");
      }
    }).catch(error => {
      console.log("Error getting document:", error);
    });
  } else {
    console.log("Document ID is not provided in the URL parameters.");
  }
}

function Nexttimebutton() {
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("docID");
  if (ID) {
    db.collection("spaces").doc(ID).get().then(doc => {
      if (doc.exists) {
        var spaceStatus = doc.data().status; 
        var statusDot = document.getElementById('statusDot');
        
        if (spaceStatus === 'green') {
          statusDot.style.backgroundColor = 'green';
        } else if (spaceStatus === 'red') {
          statusDot.style.backgroundColor = 'red';
        } else if (spaceStatus === 'yellow') {
          statusDot.style.backgroundColor = 'yellow';
        }
      }
  })
}
}




