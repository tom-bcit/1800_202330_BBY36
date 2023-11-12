

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

let users = [];


function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("spaceCardTemplate"); // Retrieve the HTML element with the ID "spaceCardTemplate" and store it in the cardTemplate variable. 
if(cardTemplate){
    db.collection(collection).get()   //the collection called "spaces"
        .then(allSpaces => {
            //var i = 1;  //Optional: if you want to have a unique ID for each space
            allSpaces.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var latitude = doc.data().latitude;       // get value of the "latitude" key
                var longitude = doc.data().longitude;       // get value of the "longitude" key
                var details = doc.data().details;  // get value of the "details" key
                var spaceCode = doc.data().code;    //get unique ID to each space to be used for fetching right image
                var spaceStatus = doc.data().status; //gets the status field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                console.log((parseFloat(localStorage.getItem("latitude")) - latitude));
                newcard.querySelector('.distance').innerHTML = 
                Math.sqrt((Math.pow((parseFloat(localStorage.getItem("latitude")) - latitude), 2)) 
                + (Math.pow((parseFloat(localStorage.getItem("longitude")) - longitude), 2)));
                newcard.querySelector('.card-status').src = `./images/${spaceStatus}.jpg`;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${spaceCode}.jpg`; //Example: NV01.jpg
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
displayCardsDynamically("spaces");  //input param is the name of the collection




    ///-------------------------------------------------
    ///FOR SEARCH BAR CHECKS WHAT INPUT IT
    ///---------------------------------------------------
    const searchInput = document.getElementById("search1");

    function addSearchEventListener() {
    if(searchInput){
        searchInput.addEventListener("input", (e) => {
            const value = e.target.value.toLowerCase();



            Array.from(document.getElementsByClassName('search3')).forEach((card) => {
                const isVisible = card.getElementsByClassName('card-title')[0].innerText.includes(value);
                isVisible ? card.classList.remove('hide') :
                    card.classList.add('hide')
            })
        

        
        })
        }   
    }
    addSearchEventListener();

