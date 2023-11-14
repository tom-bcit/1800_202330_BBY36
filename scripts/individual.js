function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("spaceCardTemplate_i"); // Retrieve the HTML element with the ID "spaceCardTemplate" and store it in the cardTemplate variable. 
if(cardTemplate){
    db.collection(collection).get()   //the collection called "spaces"
        .then(allindividual_space => {
            //var i = 1;  //Optional: if you want to have a unique ID for each space
            allindividual_space.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                var spaceCode = doc.data().code;    //get unique ID to each space to be used for fetching right image
                var spaceStatus = doc.data().status; //gets the status field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
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
displayCardsDynamically("individual_space");  //input param is the name of the collection





    ///-------------------------------------------------
    ///FOR SEARCH BAR CHECKS WHAT INPUT IT
    ///---------------------------------------------------
    const searchInput = document.getElementById("search1");

    function addSearchEventListener() {
    if(searchInput){
        searchInput.addEventListener("input", (e) => {
            const value = e.target.value.toLowerCase();



            Array.from(document.getElementsByClassName('search4')).forEach((card) => {
                const isVisible = card.getElementsByClassName('card-title')[0].innerText.includes(value);
                isVisible ? card.classList.remove('hide') :
                    card.classList.add('hide')
            })
        

        
        })
        }   
    }
    addSearchEventListener();