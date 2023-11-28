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
const applyButton = document.querySelector("#button2")
const form = document.querySelector("#form1")





let newDistance;
let newOutlet;
let newPeople;
let selectedDistance;
let selectedOutlet;
let selectedPeople;

function addEventListeners() {
  distance.addEventListener("change", () => {
     selectedDistance = distance.value;
    console.log(selectedDistance);
  })

  powerOutlet.addEventListener("change", () => {
     selectedOutlet = powerOutlet.value;
    console.log(selectedOutlet);
  })

  numPeople.addEventListener("change", () => {
      selectedPeople = numPeople.value;
    console.log(selectedPeople);
  })


  optionClick.addEventListener("click", () => {
    // Get the current URL parameters
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    // Set the new parameters based on your variables
    urlParams.set('filter1', selectedDistance);
    urlParams.set('filter2', selectedOutlet);
    urlParams.set('filter3', selectedPeople);

    // Get the updated parameters from the URL
    const newDistance = urlParams.get('filter1');
    const newOutlet = urlParams.get('filter2');
    const newPeople = urlParams.get('filter3');

    // Log the values to the console
    console.log(newDistance);
    console.log(newOutlet);
    console.log(newPeople);

    // Update your HTML elements with the new values
    distance.value = newDistance;
    powerOutlet.value = newOutlet;
    numPeople.value = newPeople;
});


form.addEventListener("submit", (e) =>{
  e.preventDefault();

  //fiter the cards based in the filter

  console.log(+numPeople.value , "capacity");
  console.log(powerOutlet.value , "powerOutlet");
  console.log(document.getElementsByClassName('card'))
   const cards = document.getElementsByClassName('card');
   console.log(cards)
   for(let i=0 ; i<cards.length ;i++){
    const card = cards[i].id.split("_");
    console.log(card)
    console.log(card[2].toString() , powerOutlet.value)
    console.log(card[2].toString() === powerOutlet.value)
    console.log(numPeople.value && +numPeople.value < +card[1] == false)


    if ((numPeople.value && +numPeople.value < +card[1]) || (powerOutlet.value && card[2].toString() !== powerOutlet.value)) {
      cards[i].classList.add('hide');
    } else {
      cards[i].classList.remove('hide'); 
    }
   }
})

} 
addEventListeners();  



function dosearch() {
  var result = document.getElementById("search-1").value.toLowerCase(); // Get the user's search term
  // Proceed only if the result is not empty
  if (result) {
    // Query the database for all spaces
    db.collection("spaces").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        var spaceName = doc.data().name.toLowerCase();

        // If the search term matches the space name
        if (spaceName ==result ) { 
          var docID = doc.id;
          window.location.href = "eachSpace.html?docID="+docID;
        }
      });
    });
  }
}