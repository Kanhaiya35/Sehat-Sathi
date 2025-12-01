/**
 * Vaccination Center Map + Listing Handler
 * Works with AI Assistant output containing hidden <!--DATA ... DATA--> block
 */

let vaccinationCenters = [];

/**
 * Extract DATA block from AI message and display centers
 */
function processVaccinationData(aiMessage) {
    // 1️⃣ Extract hidden DATA block
    const match = aiMessage.match(/<!--DATA([\s\S]*?)DATA-->/);

    if (!match) {
        console.warn("⚠️ No DATA block found in message.");
        return aiMessage; // return original message for chat display
    }

    const rawData = match[1].trim().split("\n");

    // 2️⃣ Convert DATA → Center objects
    vaccinationCenters = rawData.map(line => {
        const parts = line.split("|").map(x => x.trim());

        return {
            name: parts[0],
            lat: parseFloat(parts[1]),
            lng: parseFloat(parts[2]),
            address: parts[3],
            timing: parts[4] ?? "Not Available",
            status: (parts[5] ?? "open").toLowerCase(),
            vaccines: ["Polio", "Tetanus", "Routine"] // or dynamic if needed
        };
    });

    // 3️⃣ Display in UI
    displayCenters(vaccinationCenters);

    // 4️⃣ Remove DATA block before showing chat message to user
    return aiMessage.replace(/<!--DATA[\s\S]*?DATA-->/, "").trim();
}

/**
 * Display vaccination centers on the page
 */
function displayCenters(centers) {
    const centersList = document.getElementById('centersList');
    if (!centersList) return;

    centersList.innerHTML = centers.map(center => {
        const statusClass = center.status === 'open'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700';

        return `
            <div class="bg-white rounded-2xl shadow-md p-6 card-hover mb-4">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-gray-800 mb-2">${center.name}</h3>

                        <p class="text-gray-600 mb-2">
                            <i class="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                            ${center.address}
                        </p>

                        <p class="text-gray-600 mb-2">
                            <i class="fas fa-clock text-orange-600 mr-2"></i>
                            Timing: ${center.timing}
                        </p>
                    </div>

                    <span class="${statusClass} px-4 py-2 rounded-full text-sm font-semibold">
                        ${center.status === "open" ? "Open" : "Closed"}
                    </span>
                </div>
            </div>
        `;
    }).join("");
}

/**
 * Optional: function to load markers on your map UI (Leaflet/Google Maps)
 */
function loadMapMarkers(map) {
    if (!map || !vaccinationCenters.length) return;

    vaccinationCenters.forEach(center => {
        L.marker([center.lat, center.lng])
            .addTo(map)
            .bindPopup(`<strong>${center.name}</strong><br>${center.address}`);
    });
}
