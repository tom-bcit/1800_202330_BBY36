

function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            var userName = user.displayName;

            // method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function


//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//----------------------------------------------------------    --------------------



function displayCardsDynamically(collection, list) {
    let cardTemplate = document.getElementById("spaceCardTemplate"); // Retrieve the HTML element with the ID "spaceCardTemplate" and store it in the cardTemplate variable. 
    if (cardTemplate) {
        db.collection(collection).get()   //the collection called "spaces"
            .then(allSpaces => {
                //var i = 1;  //Optional: if you want to have a unique ID for each space
                allSpaces.forEach(doc => { //iterate thru each doc
                    var title = doc.data().name;       // get value of the "name" key
                    var latitude = doc.data().latitude;       // get value of the "latitude" key
                    var longitude = doc.data().longitude;       // get value of the "longitude" key
                    var spaceCode = doc.data().code;    //get unique ID to each space to be used for fetching right image
                    var spaceStatus = doc.data().status; //gets the status field
                    var favorite;
                   
                    

                    if (list.includes(title)) {
                        favorite = "star"
                    } else {
                        favorite = "empty_star"
                    }
                    var docID = doc.id;
                    let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                    //update title and text and image
                    newcard.querySelector('.card-title').innerHTML = title;
                    let deltaLat = (parseFloat(localStorage.getItem("latitude")) - latitude);
                    let deltaLon = (parseFloat(localStorage.getItem("longitude")) - longitude);
                    let latMid = (parseFloat(localStorage.getItem("latitude")) + latitude) / 2;
                    let m_per_deg_lat = 111132.954 - 559.822 * Math.cos( 2.0 * latMid ) + 1.175 * Math.cos( 4.0 * latMid);
                    let m_per_deg_lon = (3.14159265359/180 ) * 6367449 * Math.cos ( latMid );
                    newcard.querySelector('.distance').innerHTML =
                        Math.sqrt((Math.pow(deltaLat * m_per_deg_lat, 2))
                            + (Math.pow(deltaLon * m_per_deg_lon, 2)));
                    newcard.querySelector('.card-image').classList.add(spaceStatus);
                    newcard.querySelector('.card-image').src = `./images/${spaceCode}.jpg`; //Example: NV01.jpg
                    newcard.querySelector('.favorite').src = `./images/${favorite}.png`; //Example: NV01.jpg
                    newcard.querySelector('.favorite').id = title; //Example: NV01.jpg
                    newcard.querySelector('a').href = "eachSpace.html?docID=" + docID;

                    //Optional: give unique ids to all elements for future use
                    // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                    // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                    // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                    //attach to gallery, Example: "hikes-go-here"
                    document.getElementById(collection + "-go-here").appendChild(newcard);

                    //i++;   //Optional: iterate variable to serve as unique ID
                })
            })
    }
}



function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}

firebase.auth().onAuthStateChanged(userRecord => {
    localStorage.setItem("uid", userRecord.uid);
});

db.collection("users").doc(localStorage.getItem("uid"))
        .onSnapshot((doc) => {
            
            document.getElementById("card-container").innerHTML = "<div id=\"spaces-go-here\" class=\"row row-cols-auto d-flex justify-content-center\"></div>";
            let user = db.collection("users").doc(localStorage.getItem("uid"));
            user.get().then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    let favorites = documentSnapshot.data().favorites;
                    displayCardsDynamically("spaces", favorites);  //input param is the name of the collection
                }
            })
        })




function favClick(id) {
    firebase.auth().onAuthStateChanged(userRecord => {
        updateFavorites(userRecord.uid, id);
    });
}

function updateFavorites(uid, id) {
    let user = db.collection("users").doc(uid);
    user.get().then(documentSnapshot => {
        if (documentSnapshot.exists) {
            let fav = documentSnapshot.data().favorites;
            if (fav.includes(id)) {
                let index = fav.findIndex(x => x == id);
                fav.splice(index, 1);
                user.update("favorites", fav);
            } else {
                fav.splice(0, 0, id);
                user.update("favorites", fav);
            }
        }
    });
}