
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}





function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}


// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
      }
    }
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

function getDocData(){
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
const optionClick = document.querySelector("#button21")





function addeventlisteners() {
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