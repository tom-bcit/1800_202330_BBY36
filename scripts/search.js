/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
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
  function myFunction_ul() {
    const input = document.querySelector(".form-control");
    const dropdown = document.getElementById("myUL");
    
    if (input.value.length > 0) {
        dropdown.classList.remove("hidden");
    } else {
        dropdown.classList.add("hidden");
    }
  }
  
  
  /* When the user clicks on the button, 
  toggle between hiding and showing the dropdown content */
  function myFunction_DD() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
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

  let applyVar = document.querySelector("#button2")
  const distance  = document.querySelector("#filter")
  const powerOutlet = document.querySelector("#filter2")
  const numPeople = document.querySelector("#filter3")
  const resultSearch = document.querySelector("#result-list")
  const optionClick = document.querySelector("#button21")

  console.log(distance);



function addeventlisterners(){
  distance.addEventListener("change", () => {
 const selectedDistance = distance.value;
    console.log(selectedDistance);




  })

  powerOutlet.addEventListener("change", () =>{
    const selectedOutlet = powerOutlet.value;
    console.log(selectedOutlet);





  })
  numPeople.addEventListener("change", () => {
    const selectedPeople = numPeople.value;
    console.log(selectedPeople);




  })
  
 
  optionClick.addEventListener("click",  () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    let newDistance = urlParams.get('filter1');
    let newOutlet = urlParams.get('filter2');
    let newPeople= urlParams.get('filter3');
  
    distance.value = newDistance;
    powerOutlet.value = newOutlet;
    numPeople.value = newPeople;




  })



}
addeventlisterners();
