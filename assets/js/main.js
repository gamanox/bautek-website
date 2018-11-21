var mapa;
var loquehacemos = document.getElementById("mapa");

function loquehacemosMapa() {
  mapa = new google.maps.Map(document.getElementById("mapa"), {
    center: { lat: 25.464993, lng: -100.978545 },
    zoom: 15,
    disableDefaultUI: true,
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }, { lightness: 17 }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }, { lightness: 18 }]
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }, { lightness: 16 }]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#dedede" }, { lightness: 21 }]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }]
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }]
      },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{ color: "#fefefe" }, { lightness: 20 }]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
      }
    ]
  });
  var icons = {
    party: {
      icon: '/assets/img/quehay-marcador-bautek.svg'
    }
  };
  var party_location = {
    position: new google.maps.LatLng(25.464993, -100.978545),
    type: "party"
  };
  console.log(party_location.position);
  var currentMarker = new google.maps.Marker({
    icon: '/assets/img/quehay-marcador-bautek.svg',
    position: party_location.position,
    map: mapa
  });
  mapa.setZoom(14);
  mapa.panTo(currentMarker.position);
}

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.464993, lng: -100.978545 },
    zoom: 15,
    disableDefaultUI: true,
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }, { lightness: 17 }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }, { lightness: 18 }]
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }, { lightness: 16 }]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#dedede" }, { lightness: 21 }]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }]
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }]
      },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{ color: "#fefefe" }, { lightness: 20 }]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
      }
    ]
  });
  var icons = {
    party: {
      icon: '/assets/img/quehay-marcador-bautek.svg'
    }
  };
  var party_location = {
    position: new google.maps.LatLng(25.464993, -100.978545),
    type: "party"
  };
  var currentMarker = new google.maps.Marker({
    icon: '/assets/img/quehay-marcador-bautek.svg',
    position: party_location.position,
    map: map
  });
  map.setZoom(14);
  map.panTo(currentMarker.position);
}
initMap();
if (loquehacemos) {
  loquehacemosMapa();
}
$(function() {
  $("#menu").on("click", function() {
    $(this).toggleClass("active");
    $("#menu-overlay").toggleClass("active");
    $("#principal").toggleClass("active");
  });
  $("#menu-overlay .close").on("click", function() {
    $("#principal").toggleClass("active");

    $("#menu").toggleClass("active");
    $("#menu-overlay").toggleClass("active");
  });
  $(".agendarcita-btn").on("click", function() {
    $("#agendarcita").toggleClass("active");
  });
});
