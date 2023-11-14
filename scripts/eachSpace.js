function displaySpaceInfo() {
  let params = new URL( window.location.href ); //get URL of search bar
  let ID = params.searchParams.get( "docID" ); //get value for key "id"
  console.log( ID );


  db.collection( "spaces" )
      .doc( ID )
      .get()
      .then( doc => {
          thisSpace = doc.data();
          spaceCode = thisSpace.code;
          spaceName = doc.data().name;
          spaceDetails = doc.data().details;
          spaceCapacity = doc.data().capacity;
          spacelongitude = doc.data().longitude;
          spacelatitude = doc.data().latitude;
          if (doc.data().power_outlet) {
            spacePower = "Yes";
          } else {
            spacePower = "No"
          }


          // only populate title, image, description, capacity and power outlets
          document.getElementById( "spaceName" ).innerHTML = spaceName;
          document.getElementById( "details" ).innerHTML = spaceDetails;
          document.getElementById( "capacity" ).innerHTML = spaceCapacity;
          document.getElementById( "powerOutlet" ).innerHTML = spacePower;
          let imgEvent = document.querySelector( ".space-img" );
          imgEvent.src = "../images/" + spaceCode + ".jpg";
      } );
}
displaySpaceInfo();

function saveSpaceDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('spaceDocID', ID);
}

function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(spacelatitude,spacelongitude),
    zoom:18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  }
