//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page 
function doAll() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //global

      // the following functions are always called when someone is logged in
      insertNameFromFirestore();
      displayCardsDynamically("spaces");
    } else {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = "login.html";
    }
  });
}
doAll();

// Insert name function using the global variable "currentUser"
function insertNameFromFirestore() {
  currentUser.get().then(userDoc => {
    //get the user name
    var user_Name = userDoc.data().name;
    $("#name-goes-here").text(user_Name); //jquery
    // document.getElementByID("name-goes-here").innetText=user_Name;
  })
}

// Creates cards from database to be displayed on page
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("spaceCardTemplate"); // Retrieve the HTML element with the ID "spaceCardTemplate" and store it in the cardTemplate variable. 
    if (cardTemplate) {
        db.collection(collection)
        .orderBy("status")
        .get()   //the collection called "spaces"
            .then(allSpaces => {
                //var i = 1;  //Optional: if you want to have a unique ID for each space
                allSpaces.forEach(doc => { //iterate thru each doc
                    var title = doc.data().name;       // get value of the "name" key
                    var latitude = doc.data().latitude;       // get value of the "latitude" key
                    var longitude = doc.data().longitude;       // get value of the "longitude" key
                    var spaceCode = doc.data().code;    //get unique ID to each space to be used for fetching right image
                    var spaceStatus = doc.data().status; //gets the status field
                    var docID = doc.id;
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
                    let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                    //update title and text and image
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.distance').innerHTML = measure(longitude, latitude);    
                    newcard.querySelector('.img_container').classList.add(spaceStatus);
                    newcard.querySelector('.status_text').id = spaceStatus;
                    if (spaceStatus == "green") {
                        newcard.querySelector('.status_text').innerHTML = "Available Now";
                    } else {
                        newcard.querySelector('.status_text').innerHTML = "Busy";
                    }
                    newcard.querySelector('.card-image').src = `./images/${spaceCode}.jpg`; //Example: NV01.jpg
                    newcard.querySelector('.card').id = docID + "_" + doc.data()?.capacity + "_" + doc.data()?.power_outlet + "_" + measure(longitude, latitude);
                    newcard.querySelector('.favorite').id = 'save-' + docID;
                    newcard.querySelector('.favorite').onclick = () => saveFavorite(docID);
                    newcard.querySelector('a').href = "eachSpace.html?docID=" + docID;
                    //Optional: give unique ids to all elements for future use
                    // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                    // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                    // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

          //attach to gallery, Example: "spaces-go-here"
          document.getElementById(collection + "-go-here").appendChild(newcard);

          //i++;   //Optional: iterate variable to serve as unique ID
        })
      })
  }
}

// calculates distance in meters from longitude and latitude
function measure(longitude, latitude) {
  let deltaLat = (parseFloat(localStorage.getItem("latitude")) - latitude);
  let deltaLon = (parseFloat(localStorage.getItem("longitude")) - longitude);
  let latMid = (parseFloat(localStorage.getItem("latitude")) + latitude) / 2;
  let m_per_deg_lat = 111132.954 - 559.822 * Math.cos(2.0 * latMid) + 1.175 * Math.cos(4.0 * latMid);
  let m_per_deg_lon = (3.14159265359 / 180) * 6367449 * Math.cos(latMid);
  return Math.sqrt((Math.pow(deltaLat * m_per_deg_lat, 2)) + (Math.pow(deltaLon * m_per_deg_lon, 2)));
}

// Adds/removes a favorite from a user in the database and makes the visual change to correct state
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

// Gets current time and inserts into page
function getDate() {
  var current = Date.now();
  document.getElementById('date').innerHTML = new Date(current).toLocaleTimeString('en-US');
}
getDate();