const optionClick = document.querySelector("#button21")

function myFunction() {
  const form = document.getElementById("popUpForm");
  if (form.classList.contains("d-block")) {
    form.classList.remove("d-block");
    form.classList.add("d-none");
  } else {
    form.classList.remove("d-none");
    form.classList.add("d-block");
  }
}




///-------------------------------------------------
///FOR SEARCH BAR CHECKS WHAT INPUT IT
///---------------------------------------------------
const searchInput = document.querySelector(".me-2");


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



// Reference to a Firestore collection
var collectionRef = db.collection("spaces");

let capacity = [];
let spaceOutlet = [];
let docname = [];

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

addSearchEventListener();


//
//  DROPDOWN FOR OPTIONS SAVES THEM
//


let applyVar = document.querySelector("#button2")
const distance = document.querySelector("#filter")
const powerOutlet = document.querySelector("#filter2")
const numPeople = document.querySelector("#filter3")
const resultSearch = document.querySelector("#result-list")





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


    Array.from(document.getElementsByClassName('card')).forEach((card) => {
      console.log(card.id)

    })

  })
}



addEventListeners();

document.addEventListener('DOMContentLoaded', function () {
  // get elements by their ID
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  // Check if elements exist
  if (searchButton && searchInput) {
    // add event listener to the button
    searchButton.addEventListener('click', function () {
      // get the search input value
      const searchTerm = searchInput.value;
      console.log(`Searching for "${searchTerm}"...`);
      window.location.href = 'eachSpace.html' + encodeURIComponent(searchTerm);
    });

    // add event listener to the input (if you want to trigger the search on Enter keypress)
    searchInput.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) { // Enter key code
        // simulate a button click to trigger the search
        searchButton.click();
      }
    });
  } else {
    console.error("Elements not found");
  }
});




