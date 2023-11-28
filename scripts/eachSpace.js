

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
            spaceName: "BCIT SE12",
            center: new google.maps.LatLng(49.25001012909419, -123.00152632908595),
            zoom: 18,
          };
        } else if (spaceName == "SW1 - Room 1") {
          mapProp = {
            spaceName: "Building SW1",
            center: new google.maps.LatLng(49.2510472232236, -123.00320133887256),
            zoom: 18,
          };
        } else if (spaceName == "NE1 - Room 1") {
          mapProp = {
            spaceName: "BCIT NE1",
            center: new google.maps.LatLng(49.254208910058054, -123.00137242755098),
            zoom: 18,
          };
        }
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        if (spaceStatus === 'green') {
          statusDot.style.backgroundColor = 'green';
        } else if (spaceStatus === 'red') {
          statusDot.style.backgroundColor = 'red';
        } else if (spaceStatus === 'yellow') {
          statusDot.style.backgroundColor = 'yellow';
        }

       var marker = new google.maps.Marker({
        position: mapProp.center,
        map: map,
        title: spaceName,
      });
       
      var infowindow = new google.maps.InfoWindow({
        content: spaceName,
      });

      // Attach a click event listener to the marker
      marker.addListener("click", function() {
        // Open a link to Google Maps with the specified location coordinates
            
            window.open("https://www.google.com/maps?q=" + mapProp.spaceName);
      });
    
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
        var spaceStatus = doc.data().status;
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


var currentUser;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
      currentUser = db.collection("users").doc(user.uid); //global
      favoriteButton();
  }
});

function favoriteButton() {
  let params = new URL(window.location.href);
  let docID = params.searchParams.get("docID");

  document.querySelector('.eachFavorite').id = 'save-' + docID;
  currentUser.get().then(userDoc => {
    //get the user name
    var favorites = userDoc.data().favorites;
    if (favorites.includes(docID)) {
        document.getElementById('save-' + docID).innerText = "";
        let img = document.createElement("img");
        img.src = "./images/heart.png";
        img.className = "img-fluid"
        document.getElementById('save-' + docID).append(img);
    } else {
        document.getElementById('save-' + docID).innerText = "";
        let img = document.createElement("img");
        img.src = "./images/empty_heart.png";
        img.className = "img-fluid"
        document.getElementById('save-' + docID).append(img);
    }
  })
  document.querySelector('.eachFavorite').onclick = () => saveFavorite(docID);
}



function saveFavorite(spaceDocID) {
  currentUser.get().then(userDoc => {
      var favorites = userDoc.data().favorites;
      if (favorites.includes(spaceDocID)) {
          currentUser.update({
              favorites: firebase.firestore.FieldValue.arrayRemove(spaceDocID)
          })
              // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
              .then(function () {
                  console.log("favorite has been removed for" + spaceDocID);
                  //this is to change the icon of the space that was saved to "filled"
                  document.getElementById('save-' + spaceDocID).innerText = "";
                  let img = document.createElement("img");
                  img.src = "./images/empty_heart.png";
                  img.className = "img-fluid"
                  document.getElementById('save-' + spaceDocID).append(img);
              });
      }
      else {
          // Manage the backend process to store the spaceDocID in the database, recording which space was favorited by the user.
          currentUser.update({
              // Use 'arrayUnion' to add the new favorite ID to the 'favorites' array.
              // This method ensures that the ID is added only if it's not already present, preventing duplicates.
              favorites: firebase.firestore.FieldValue.arrayUnion(spaceDocID)
          })
              // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
              .then(function () {
                  console.log("favorite has been saved for" + spaceDocID);
                  //this is to change the icon of the space that was saved to "filled"
                  document.getElementById('save-' + spaceDocID).innerText = "";
                  let img = document.createElement("img");
                  img.src = "./images/heart.png";
                  img.className = "img-fluid"
                  document.getElementById('save-' + spaceDocID).append(img);
              });
      }
  })

}

function getDate() {
  var current = Date.now();
  document.getElementById('date').innerHTML = new Date(current).toLocaleTimeString('en-US');
}
getDate();