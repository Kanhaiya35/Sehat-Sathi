// assets/js/vaccination.js
// Google Maps + Places API (2025 version) with MAP + CARD LIST + INTERACTION

let map;
let placesService;
let markers = [];
let cardMap = new Map();  // For linking cards <-> markers

const pinInput = document.getElementById("searchLocation");
const statusEl = document.getElementById("searchStatus");
const centersListEl = document.getElementById("centersList");

/* INITIALIZE MAP */
function initMap() {
  const indiaCenter = { lat: 22.9734, lng: 78.6569 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: indiaCenter,
    zoom: 5,
  });

  placesService = new google.maps.places.PlacesService(map);

  if (pinInput) {
    pinInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") searchCenters();
    });
  }
}

/* CLEAR OLD MARKERS */
function clearMarkers() {
  markers.forEach((m) => m.setMap(null));
  markers = [];
  cardMap.clear();
}

/* RENDER CARDS BELOW MAP */
function renderCentersList(places) {
  centersListEl.innerHTML = "";

  if (!places || places.length === 0) {
    centersListEl.innerHTML = `
      <div class="bg-white rounded-2xl shadow-md p-6 text-center">
        <p class="text-gray-700">No hospitals found near this PIN code.</p>
      </div>`;
    return;
  }

  places.forEach((place, index) => {
    const placeName = place.name || place.displayName?.text || "Hospital";
    const address =
      place.vicinity || place.shortFormattedAddress || place.formattedAddress || "Not available";
    const rating = place.rating ? `${place.rating} ⭐` : "Not rated";

    const card = document.createElement("div");
    card.className =
      "bg-white rounded-2xl shadow-md p-6 card-hover mb-4 transition cursor-pointer";
    card.id = `place-card-${index}`;

    card.innerHTML = `
      <div class="flex items-start justify-between">
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">${placeName}</h3>
          <p class="text-gray-600 mb-1">
            <i class="fas fa-map-marker-alt text-blue-600 mr-2"></i>${address}
          </p>
          <p class="text-gray-600">
            <i class="fas fa-star text-yellow-400 mr-2"></i>${rating}
          </p>
        </div>
      </div>
    `;

    // CARD → MARKER CLICK
    card.addEventListener("click", () => {
      const mk = cardMap.get(index);
      map.panTo(mk.position);
      map.setZoom(16);
      google.maps.event.trigger(mk, "click");
    });

    centersListEl.appendChild(card);
  });
}

/* MAIN SEARCH FUNCTION */
function searchCenters() {
  const pin = pinInput.value.trim();

  if (!/^[1-9][0-9]{5}$/.test(pin)) {
    statusEl.textContent = "Enter a valid 6-digit PIN code.";
    statusEl.className = "text-red-600 text-center mt-3";
    return;
  }

  statusEl.textContent = `Finding location for PIN ${pin}...`;
  statusEl.className = "text-blue-600 text-center mt-3";

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: `${pin}, India` }, (results, status) => {
    if (status !== "OK") {
      statusEl.textContent = "Unable to locate this PIN.";
      statusEl.className = "text-red-600 text-center mt-3";
      return;
    }

    const location = results[0].geometry.location;

    map.setCenter(location);
    map.setZoom(14);

    clearMarkers();

    statusEl.textContent = `Finding hospitals near ${pin}...`;

    const request = {
      location,
      radius: 5000,
      type: "hospital",
    };

    placesService.nearbySearch(request, (places, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !places) {
        statusEl.textContent = "No hospitals found.";
        return;
      }

      statusEl.textContent = `Found ${places.length} hospitals.`;
      statusEl.className = "text-green-600 text-center mt-3";

      renderCentersList(places);

      // MARKERS ON MAP
      places.forEach((place, index) => {
        if (!place.geometry) return;

        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map,
          title: place.name,
        });

        const info = new google.maps.InfoWindow({
          content: `<strong>${place.name}</strong><br>${place.vicinity ?? ""}`,
        });

        marker.addListener("click", () => {
          info.open(map, marker);

          // HIGHLIGHT CARD WHEN MARKER CLICKED
          const card = document.getElementById(`place-card-${index}`);
          if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.classList.add("ring-2", "ring-blue-500");
            setTimeout(() => card.classList.remove("ring-2", "ring-blue-500"), 2000);
          }
        });

        markers.push(marker);
        cardMap.set(index, marker);
      });
    });
  });
}

window.initMap = initMap;
window.searchCenters = searchCenters;
window.loadMoreCenters = searchCenters;
