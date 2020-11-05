var currentPos = { lat: 21.291278, lng: -157.842922 };
  
    // Initialize and add the map

    function initMap() {
      
      pos = currentPos;
      
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: pos,
      });

      const marker = new google.maps.Marker({
        position: pos,
        map: map,
      });
    }

    var linkMoana = document.getElementById('moana');
    linkMoana.onclick = updateMoana;

    var linkVegas = document.getElementById('vegas');
    linkVegas.onclick = updateVegas;

    var linkFran = document.getElementById('fran');
    linkFran.onclick = updateFran;

    var linkHills = document.getElementById('hills');
    linkHills.onclick = updateHills;

    var linkMonica = document.getElementById('monica');
    linkMonica.onclick = updateMonica;

    var linkFresno = document.getElementById('fresno');
    linkFresno.onclick = updateFresno;

    posTextEL = document.getElementById('posText');

    function updateMoana() {
     console.log("moana");
     posTextEL.innerHTML = "Viewing: Moana";
     currentPos = { lat: 21.293493, lng: -157.85005 };
     initMap();
    }

    function updateVegas() {
     console.log("vegas baby");
     posTextEL.innerHTML = "Viewing: Vegas bby";
     currentPos = { lat: 36.211, lng: -115.194 };
     initMap();
    }

    function updateFran() {
     console.log("fran");
     posTextEL.innerHTML = "Viewing: Vegas Fransisco";
     currentPos = { lat: 37.773972, lng: -122.431297 };
     initMap();
    }

    function updateHills() {
     console.log("hills");
     posTextEL.innerHTML = "Viewing: The hills";
     currentPos = { lat: 34.0698712, lng: -118.4014686 };
     initMap();
    }

    function updateMonica() {
     console.log("monica");
     posTextEL.innerHTML = "Viewing: Santa Monica";
     currentPos = { lat: 34.006147, lng: -118.4881439 };
     initMap();
    }

    function updateFresno() {
     console.log("fresno");
     posTextEL.innerHTML = "Viewing: Fresno";
     currentPos = { lat: 36.7646259, lng: -119.8090723 };
     initMap();
    }