// Logs out the user from firebase
function logout() {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("logging out user");
    }).catch((error) => {
      // An error happened.
    });
}

// Creates a log out pop up
function logout_confir(){
  console.log("logging out user");
  if (confirm("Are you sure you want to logout?") == true){
    window.location.href = "./logout.html";
  }
}

