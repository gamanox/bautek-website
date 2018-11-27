var mapa;
var loquehacemos = document.getElementById("mapa");
var introSlider = document.getElementById("inicio-intro");
var introSliderVenta = document.getElementById("venta-intro");
var agendaCita = document.getElementById("agendarcita");

var markersArray = [];
var infowindow;

function createMarker(place) {
  var mkColor = $("#quehay-mapa .servicio.active").data("servicio");
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: mapa,
    position: place.geometry.location,
    icon: "/assets/img/pin-" + mkColor + ".svg"
  });
  var lng = place.geometry.location.lng();
  var lat = place.geometry.location.lat();
  var src =
    "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" +
    lat +
    "," +
    lng +
    "&key=AIzaSyB87VxKTCOjaD6TDRPBsZbBF8qGi3hOvB8";
  var contentString = "";
  contentString += '<div class="media">';
  contentString +=
    '  <div class="mr-3" style="background-image: url(' +
    src +
    '); background-repeat: no-repeat; background-size: cover; width: 88px; height: 88px;" ></div>';
  contentString += '  <div class="media-body">';
  contentString +=
    '    <h5 class="mt-0"><a href="https://www.google.com/maps/place/?q=place_id:' +
    place.place_id +
    '" target="_blank">' +
    place.name +
    "</h5></a>";
  contentString += "<p>" + place.vicinity + "</p>";
  contentString += "  </div>";
  contentString += "</div>";
  markersArray.push(marker);
  var infowindow = new SnazzyInfoWindow({
    map: mapa,
    marker: marker,
    maxWidth: 380,
    closeOnMapClick: true,
    closeWhenOthersOpen: true,
    content: contentString
  });
  google.maps.event.addListener(marker, "click", function() {
    var bgColor = $("#quehay-mapa .servicio.active").data("servicio");
    console.log(bgColor);
    infowindow.open(mapa, this);

    infowindow.setWrapperClass(bgColor);
  });
}
function removeMarkers() {
  for (i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    removeMarkers();
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log(results[i]);
    }
  }
}

function servicio(servicio) {
  var service = new google.maps.places.PlacesService(mapa);
  service.nearbySearch(
    {
      location: { lat: 25.464993, lng: -100.978545 },
      radius: 5500,
      type: [servicio]
    },
    callback
  );
}

function loquehacemosMapa() {
  mapa = new google.maps.Map(document.getElementById("mapa"), {
    center: { lat: 25.464993, lng: -100.978545 },
    zoom: 15,
    // disableDefaultUI: true,
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
      icon: "/assets/img/quehay-marcador-bautek.svg"
    }
  };
  var party_location = {
    position: new google.maps.LatLng(25.464993, -100.978545),
    type: "party"
  };
  console.log(party_location.position);
  var currentMarker = new google.maps.Marker({
    icon: "/assets/img/quehay-marcador-bautek.svg",
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
      icon: "/assets/img/quehay-marcador-bautek.svg"
    }
  };
  var party_location = {
    position: new google.maps.LatLng(25.464993, -100.978545),
    type: "party"
  };
  var currentMarker = new google.maps.Marker({
    icon: "/assets/img/quehay-marcador-bautek.svg",
    position: party_location.position,
    map: map
  });
  map.setZoom(14);
  map.panTo(currentMarker.position);
}

$(function() {
  $("#quehay-mapa .servicio").on("click", function() {
    $("#quehay-mapa .servicio").removeClass("active");
    $(this).addClass("active");
    var currentServ = $(this).data("servicio");
    console.log(currentServ);
    servicio(currentServ);
  });
  initMap();
  if (loquehacemos) {
    loquehacemosMapa();
  }
  $("#menu").on("click", ".menu-btn", function() {
    $("#menu").toggleClass("active");
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

  if (introSlider) {
    new fullpage("#inicio-intro", {
      licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
      autoScrolling: false,
      fitToSection: false
    });
    setInterval(() => {
      fullpage_api.moveSlideRight();
    }, 5000);
  }
  if (introSliderVenta) {
    new fullpage("#venta-intro", {
      licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
      autoScrolling: false,
      fitToSection: false
    });
    setInterval(() => {
      fullpage_api.moveSlideRight();
    }, 5000);
  }
  if (agendaCita) {
    setTimeout(() => {
      $("#agendarcita").toggleClass("active");
    }, 1500);
    $("#agendar-enviar").on("click", function() {
      var from = $("#agendar-email").val();
      var name = $("#agendar-nombre").val();
      var cell = $("#agendar-celular").val();
      var msg = $("#agendar-msg").val();
      var subj = "Me interesa agendar una cita.";
      var err = $("#agendar-error");
      var eTo = "noxwill@gmail.com";

      // $(".error").hide();
      // var hasError = false;

      // if (from == "") {
      //   err.html(
      //     '<span class="error">Olvidó poner su correo electrónico.</span>'
      //   );
      //   hasError = true;
      // }

      // if (msg == "") {
      //   err.html('<span class="error">Olvidó escribir un mensaje.</span>');
      //   hasError = true;
      // }

      // if (hasError == false) {

      //   $.post("/assets/php/sendmail.php", {
      //     emailTo: eTo,
      //     emailFrom: from,
      //     subject: subj,
      //     cellPhone: cell,
      //     message: msg
      //   })
      //     .done(function(msg) {
      //       err.html("Your email was sent.");
      //     })
      //     .fail(function(xhr, status, error) {
      //       console.log(error);
      //       console.log(xhr);
      //       console.log(status);
      //     });
      // }

      // return false;

      Email.send(
        from,
        "noxwill@gmail.com",
        "Por favor agendarme una cita",
        msg,
        "mail.bautek.com.mx",
        "noreply@bautek.com.mx",
        "p4r4n64r1",
        function done(message) {
          err.html("Su mensaje se ha enviado.");
        }
      );
    });
  }
});
