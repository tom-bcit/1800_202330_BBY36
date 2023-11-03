function logout() {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("logging out user");
    }).catch((error) => {
      // An error happened.
    });
}

function logout_confir(){
  console.log("logging out user");
  if (confirm("Are you sure you want to logout?") == true){
    window.location.href = "./logout.html";
  }
}

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