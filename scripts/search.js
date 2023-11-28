const optionClick = document.querySelector("#button21")

///-------------------------------------------------
///FOR SEARCH BAR CHECKS WHAT INPUT IT
///---------------------------------------------------
const searchInput = document.querySelector(".me-2");

// Hides cards that do not match search text in search bar
function addSearchEventListener() {
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      Array.from(document.getElementsByClassName('card')).forEach((card) => {
        const isVisible = card.getElementsByClassName('card-title')[0].innerText.toLowerCase().includes(value);
        isVisible ? card.classList.remove('hide') :
          card.classList.add('hide');
      })
    })
  }
}
addSearchEventListener();

// Reference to a Firestore collection
var collectionRef = db.collection("spaces");

let capacity = [];
let spaceOutlet = [];
let docname = [];

// 
function getDocData() {
  collectionRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // Access the data in each document
      capacity.push(doc.data().capacity);
      spaceOutlet.push(doc.data().power_outlet);
      docname.push(doc.id);

      // Log the data for each document
      console.log('Document ID:', doc.id, 'Data:',);
    });
  })
}
getDocData();

//
//  DROPDOWN FOR OPTIONS SAVES THEM
//

let applyVar = document.querySelector("#button2")
const distance = document.querySelector("#filter")
const powerOutlet = document.querySelector("#filter2")
const numPeople = document.querySelector("#filter3")
const resultSearch = document.querySelector("#result-list")

// Checks for changes to the filters 
function addEventListeners() {
  distance.addEventListener("change", () => {
    const selectedDistance = distance.value;
    console.log(selectedDistance);
  })

  powerOutlet.addEventListener("change", () => {
    const selectedOutlet = powerOutlet.value;
    console.log(selectedOutlet);
  })

  numPeople.addEventListener("change", () => {
    const selectedPeople = numPeople.value;
    console.log(selectedPeople);
  })

  optionClick.addEventListener("click", () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    let newDistance = urlParams.get('filter1');
    let newOutlet = urlParams.get('filter2');
    let newPeople = urlParams.get('filter3');
    console.log(newOutlet);

    distance.value = newDistance;
    powerOutlet.value = newOutlet;
    numPeople.value = newPeople;
    console.log(numPeople);
  })
}

// Allow for direct searching to get to the corresponding eachSpace page
function dosearch() {
  var result = document.getElementById("search-1").value.toLowerCase(); // Get the user's search term
  // Proceed only if the result is not empty
  if (result) {
    // Query the database for all spaces
    db.collection("spaces").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        var spaceName = doc.data().name.toLowerCase();

        // If the search term matches the space name
        if (spaceName == result) {
          var docID = doc.id;
          window.location.href = "eachSpace.html?docID=" + docID;
        }
      });
    });
  }
}