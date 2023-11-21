//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page 
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log(currentUser);

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
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
        // document.getElementByID("name-goes-here").innetText=user_Name;
    })
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//----------------------------------------------------------    --------------------

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
                            let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                            //update title and text and image
                            newcard.querySelector('.card-title').innerHTML = title;
                            newcard.querySelector('.distance').innerHTML = measure(longitude, latitude);
                            newcard.querySelector('.card-image').classList.add(spaceStatus);
                            newcard.querySelector('.card-image').src = `./images/${spaceCode}.jpg`; //Example: NV01.jpg
                            newcard.querySelector('.card').id = docID;
                            newcard.querySelector('.favorite').id = 'save-' + docID;
                            newcard.querySelector('.favorite').onclick = () => saveFavorite(docID);
                            newcard.querySelector('a').href = "eachSpace.html?docID=" + docID;
                            //attach to gallery, Example: "hikes-go-here"
                            document.getElementById(collection + "-go-here").appendChild(newcard);
                            document.getElementById('save-' + docID).innerText = "";
                            let img = document.createElement("img");
                            img.src = "./images/heart.png";
                            img.className = "img-fluid"
                            document.getElementById('save-' + docID).append(img);
                        }
                        //i++;   //Optional: iterate variable to serve as unique ID
                    })
                })
            })
    }
}

function measure(longitude, latitude) {
    let deltaLat = (parseFloat(localStorage.getItem("latitude")) - latitude);
    let deltaLon = (parseFloat(localStorage.getItem("longitude")) - longitude);
    let latMid = (parseFloat(localStorage.getItem("latitude")) + latitude) / 2;
    let m_per_deg_lat = 111132.954 - 559.822 * Math.cos(2.0 * latMid) + 1.175 * Math.cos(4.0 * latMid);
    let m_per_deg_lon = (3.14159265359 / 180) * 6367449 * Math.cos(latMid);
    return Math.sqrt((Math.pow(deltaLat * m_per_deg_lat, 2)) + (Math.pow(deltaLon * m_per_deg_lon, 2)));
}

function saveFavorite(hikeDocID) {
    currentUser.get().then(userDoc => {
        var favorites = userDoc.data().favorites;
        if (favorites.includes(hikeDocID)) {
            currentUser.update({
                favorites: firebase.firestore.FieldValue.arrayRemove(hikeDocID)
            })
                // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
                .then(function () {
                    console.log("favorite has been removed for" + hikeDocID);
                    var iconID = 'save-' + hikeDocID;
                    //console.log(iconID);
                    //this is to change the icon of the hike that was saved to "filled"
                    document.getElementById('save-' + hikeDocID).innerText = "";
                    let img = document.createElement("img");
                    img.src = "./images/empty_heart.png";
                    img.className = "img-fluid"
                    document.getElementById('save-' + hikeDocID).append(img);
                });
        }
        else {
            // Manage the backend process to store the hikeDocID in the database, recording which hike was favorited by the user.
            currentUser.update({
                // Use 'arrayUnion' to add the new favorite ID to the 'favorites' array.
                // This method ensures that the ID is added only if it's not already present, preventing duplicates.
                favorites: firebase.firestore.FieldValue.arrayUnion(hikeDocID)
            })
                // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
                .then(function () {
                    console.log("favorite has been saved for" + hikeDocID);
                    var iconID = 'save-' + hikeDocID;
                    //console.log(iconID);
                    //this is to change the icon of the hike that was saved to "filled"
                    document.getElementById('save-' + hikeDocID).innerText = "";
                    let img = document.createElement("img");
                    img.src = "./images/heart.png";
                    img.className = "img-fluid"
                    document.getElementById('save-' + hikeDocID).append(img);
                });
        }
    })

}