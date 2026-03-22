/* ── Sehat Sathi – Vaccination Page ─────────────────────────────────────── */
'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  const user = getUser();
  if (!user) {
    document.getElementById('authGuardV').classList.remove('hidden');
  } else {
    document.getElementById('mainContentV').classList.remove('hidden');
    loadCentres();
    loadSchedule();
    loadOutbreakAlertsV();

    // Sync nav user display
    const nameEl = document.getElementById('navUserNameV');
    if (nameEl) nameEl.textContent = user.name?.split(' ')[0] || '';
    document.getElementById('navAuthV')?.classList.add('hidden');
    document.getElementById('navUserV')?.classList.remove('hidden');
  }
});

// ── Vaccination Centres ──────────────────────────────────────────────────────
async function loadCentres(type = '') {
  try {
    const url  = `/api/vaccination/centres${type ? '?type=' + encodeURIComponent(type) : ''}`;
    const data = await apiCall(url);
    renderCentres(data.centres);
    const c = document.getElementById('centreCount');
    if (c) c.textContent = `(${data.total} found)`;
  } catch (err) {
    document.getElementById('centresList').innerHTML =
      '<p class="text-red-500 text-sm">Failed to load centres. Please try again.</p>';
  }
}

function searchCentres() {
  const type = document.getElementById('centreTypeFilter')?.value || '';
  loadCentres(type);
}

function renderCentres(centres) {
  const container = document.getElementById('centresList');
  if (!container) return;
  if (!centres?.length) {
    container.innerHTML = '<div class="text-center py-12 text-gray-400"><div class="text-4xl mb-2">🔍</div><p>No centres found for selected filter.</p></div>';
    return;
  }
  container.innerHTML = centres.map(c => `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <h4 class="font-bold text-gray-800 dark:text-white">${c.name}</h4>
            <span class="text-xs px-2 py-0.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full font-medium">${c.type}</span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
            <span>📍</span>${c.address}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
            <span>📞</span><a href="tel:${c.phone}" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">${c.phone}</a>
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-3">
            <span>⏰</span>${c.hours}
          </p>
          <div class="flex flex-wrap gap-1.5">
            ${c.vaccines.map(v => `<span class="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-800">${v}</span>`).join('')}
          </div>
        </div>
        <div class="text-center flex-shrink-0">
          <a href="https://maps.google.com/?q=${c.lat},${c.lng}" target="_blank" rel="noopener"
            class="inline-flex flex-col items-center gap-1 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/40 border border-primary-200 dark:border-primary-700 transition-all text-primary-700 dark:text-primary-300">
            <span class="text-2xl">🗺</span>
            <span class="text-xs font-medium">Maps</span>
          </a>
        </div>
      </div>
    </div>`).join('');
}

// ── Vaccination Schedule Table ───────────────────────────────────────────────
async function loadSchedule() {
  try {
    const data  = await apiCall('/api/vaccination/schedule');
    const tbody = document.getElementById('scheduleTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.schedule.map((row, i) => `
      <tr class="${i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'} hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
        <td class="px-4 py-3">
          <span class="font-semibold text-gray-800 dark:text-white text-sm">${row.age}</span>
        </td>
        <td class="px-4 py-3">
          <div class="flex flex-wrap gap-1.5">
            ${row.vaccines.map(v => `<span class="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full font-medium">${v}</span>`).join('')}
          </div>
        </td>
        <td class="px-4 py-3 hidden sm:table-cell text-xs text-gray-500 dark:text-gray-400">${row.note || '–'}</td>
        <td class="px-4 py-3">
          <span class="w-2 h-2 inline-block rounded-full mr-1 ${i < 4 ? 'bg-green-500' : 'bg-gray-300'}"></span>
          <span class="text-xs ${i < 4 ? 'text-green-600 dark:text-green-400 font-medium' : 'text-gray-400'}">${i < 4 ? 'Critical' : 'Scheduled'}</span>
        </td>
      </tr>`).join('');
  } catch {
    document.getElementById('scheduleTableBody').innerHTML =
      '<tr><td colspan="4" class="px-4 py-8 text-center text-red-400">Failed to load schedule.</td></tr>';
  }
}

// ── Outbreak Alerts (Vaccination page) ──────────────────────────────────────
async function loadOutbreakAlertsV() {
  try {
    const data   = await apiCall('/api/alerts/active');
    const banner = document.getElementById('alertBannerV');
    const alertsContainer = document.getElementById('outbreakAlerts');

    if (banner && data.alerts?.length) {
      const a = data.alerts[0];
      const colors = { low:'bg-green-600', medium:'bg-amber-500', high:'bg-orange-600', critical:'bg-red-700' };
      banner.className = `text-white text-center py-2.5 px-4 text-sm font-medium ${colors[a.severity] || 'bg-amber-500'}`;
      document.getElementById('alertTextV').textContent = `⚠️ ${a.title} – ${a.region}`;
      banner.classList.remove('hidden');
    }

    if (alertsContainer) {
      if (!data.alerts?.length) {
        alertsContainer.innerHTML = '<p class="text-xs text-gray-400">No active alerts in your region.</p>';
        return;
      }
      const severityColors = {
        low: 'severity-low', medium: 'severity-medium',
        high: 'severity-high', critical: 'severity-critical'
      };
      alertsContainer.innerHTML = data.alerts.map(a => `
        <div class="rounded-xl p-3 ${severityColors[a.severity] || 'severity-medium'}">
          <div class="flex items-start justify-between gap-2">
            <div class="font-semibold text-sm">${a.title}</div>
            <span class="text-xs font-bold uppercase">${a.severity}</span>
          </div>
          <p class="text-xs mt-1 opacity-80">${a.region} · ${new Date(a.createdAt).toLocaleDateString()}</p>
          <p class="text-xs mt-1">${a.message}</p>
        </div>`).join('');
    }
  } catch { /* ignore */ }
}

// ── Vaccination Reminder Calculator ─────────────────────────────────────────
function calculateReminder() {
  const dobInput = document.getElementById('childDob')?.value;
  const result   = document.getElementById('reminderResult');
  if (!dobInput || !result) return;

  const dob     = new Date(dobInput);
  const today   = new Date();
  const ageMs   = today - dob;
  const ageMonths = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 30.44));
  const ageDays   = Math.floor(ageMs / (1000 * 60 * 60 * 24));

  if (ageDays < 0) { result.textContent = '❌ Please enter a valid past date.'; result.classList.remove('hidden'); return; }
  if (ageMonths > 204) { result.textContent = '✅ Child is above 17 years. Routine immunization schedule complete. Td booster recommended.'; result.classList.remove('hidden'); return; }

  let nextVaccine = '', nextAge = '';

  if (ageDays === 0)          { nextVaccine = 'BCG, OPV-0, Hep-B-1'; nextAge = 'TODAY (at birth)'; }
  else if (ageMonths < 1.5)   { nextVaccine = 'BCG, OPV-0, Hep-B-1 (if not given)'; nextAge = 'OVERDUE – Visit PHC immediately'; }
  else if (ageMonths < 2.5)   { nextVaccine = 'OPV-1, Pentavalent-1, IPV-1, PCV-1, Rotavirus-1'; nextAge = 'at 6 weeks'; }
  else if (ageMonths < 3.5)   { nextVaccine = 'OPV-2, Pentavalent-2, IPV-2, PCV-2, Rotavirus-2'; nextAge = 'at 10 weeks'; }
  else if (ageMonths < 4)     { nextVaccine = 'OPV-3, Pentavalent-3, IPV-3, PCV-3, Rotavirus-3'; nextAge = 'at 14 weeks'; }
  else if (ageMonths < 9)     { nextVaccine = 'MR-1, Vitamin A dose 1, JE-1 (endemic areas)'; nextAge = 'at 9 months'; }
  else if (ageMonths < 16)    { nextVaccine = 'DPT Booster-1, OPV Booster, MR-2, Vitamin A-2'; nextAge = 'at 16 months'; }
  else if (ageMonths < 60)    { nextVaccine = 'DPT Booster-2, Vitamin A (every 6 months)'; nextAge = 'at 5 years'; }
  else if (ageMonths < 120)   { nextVaccine = 'Td (Tetanus-Diphtheria)'; nextAge = 'at 10 years'; }
  else                        { nextVaccine = 'Td Booster'; nextAge = 'at 16 years'; }

  result.innerHTML = `<strong>Next Vaccine Due:</strong><br>💉 ${nextVaccine}<br>📅 Age: ${nextAge}<br><br>📍 Visit nearest PHC/CHC for FREE vaccination.`;
  result.classList.remove('hidden');
}
function initMap() {

  const location = { lat: 18.5204, lng: 73.8567 }; // Pune default

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: location
  });

  const service = new google.maps.places.PlacesService(map);

  const request = {
    location: location,
    radius: 5000,
    keyword: "vaccination hospital"
  };

  service.nearbySearch(request, (results, status) => {

    if (status === google.maps.places.PlacesServiceStatus.OK) {

      results.forEach(place => {

        new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: place.name
        });

      });

    }

  });

}


window.addEventListener("load", initMap);


let map;
let service;
let markers = [];

function initMap(){

  const pune = { lat:18.5204 , lng:73.8567 }

  map = new google.maps.Map(document.getElementById("map"),{
    zoom:12,
    center:pune
  })

  service = new google.maps.places.PlacesService(map)

}

window.addEventListener("load",initMap)


async function searchCentres(){

  const locationInput = document.getElementById("locationInput").value

  if(!locationInput){
    alert("Enter location or pincode")
    return
  }

  const geocoder = new google.maps.Geocoder()

  geocoder.geocode({ address: locationInput }, function(results,status){

    if(status === "OK"){

      const location = results[0].geometry.location

      map.setCenter(location)

      loadNearbyCentres(location)

    }else{

      alert("Location not found")

    }

  })

}


function loadNearbyCentres(location){

  markers.forEach(m => m.setMap(null))
  markers = []

  const request = {

    location: location,
    radius: 5000,
    keyword: "vaccination hospital"

  }

  service.nearbySearch(request,function(results,status){

    if(status === google.maps.places.PlacesServiceStatus.OK){

      displayCentres(results)
      placeMarkers(results)

    }

  })

}


function placeMarkers(results){

  results.forEach(place => {

    const marker = new google.maps.Marker({

      map: map,
      position: place.geometry.location,
      title: place.name

    })

    markers.push(marker)

  })

}


function displayCentres(centres){

  const list = document.getElementById("centresList")

  list.innerHTML = ""

  document.getElementById("centreCount").innerText = "(" + centres.length + ")"

  centres.forEach(c => {

    const card = document.createElement("div")

    card.className =
    "bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm"

    card.innerHTML = `

      <h4 class="font-bold text-gray-800 dark:text-white">${c.name}</h4>

      <p class="text-sm text-gray-500 dark:text-gray-400">
      ${c.vicinity || "Address not available"}
      </p>

      <button
      class="mt-2 text-xs text-primary-600 hover:underline"
      onclick="map.setCenter({lat:${c.geometry.location.lat()},lng:${c.geometry.location.lng()}})">
      View on Map
      </button>

    `

    list.appendChild(card)

  })

}


function loadSchedule(){

const schedule = [

{
age:"Birth",
vaccines:"BCG, OPV-0, Hepatitis B Birth Dose",
note:"Given immediately after birth"
},

{
age:"6 Weeks",
vaccines:"OPV-1, Pentavalent-1, Rotavirus-1, IPV-1, PCV-1",
note:"First primary vaccination"
},

{
age:"10 Weeks",
vaccines:"OPV-2, Pentavalent-2, Rotavirus-2",
note:"Second primary dose"
},

{
age:"14 Weeks",
vaccines:"OPV-3, Pentavalent-3, IPV-2, Rotavirus-3, PCV-2",
note:"Third primary dose"
},

{
age:"9-12 Months",
vaccines:"Measles-Rubella (MR-1), JE-1, PCV Booster",
note:"First measles vaccine"
},

{
age:"16-24 Months",
vaccines:"MR-2, JE-2, DPT Booster-1, OPV Booster",
note:"Booster vaccines"
},

{
age:"5-6 Years",
vaccines:"DPT Booster-2",
note:"School age booster"
},

{
age:"10 Years",
vaccines:"Td (Tetanus & adult Diphtheria)",
note:"Adolescent booster"
},

{
age:"16 Years",
vaccines:"Td",
note:"Second adolescent booster"
},

{
age:"Pregnant Mother",
vaccines:"Td-1, Td-2 or Td Booster",
note:"Protection against neonatal tetanus"
}

]

const table = document.getElementById("scheduleTableBody")

table.innerHTML=""

schedule.forEach(v=>{

const row = document.createElement("tr")

row.innerHTML=`

<td class="px-4 py-3 font-medium">${v.age}</td>

<td class="px-4 py-3">${v.vaccines}</td>

<td class="px-4 py-3 hidden sm:table-cell text-gray-500">${v.note}</td>

<td class="px-4 py-3">
<span class="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
Recommended
</span>
</td>

`

table.appendChild(row)

})

}

document.addEventListener("DOMContentLoaded",loadSchedule)

async function loadOutbreakAlerts(){

const container=document.getElementById("outbreakAlerts")

try{

const res=await fetch("/api/outbreaks")
const data=await res.json()

container.innerHTML=""

data.alerts.forEach(a=>{

const div=document.createElement("div")

div.className="p-2 rounded border border-red-200 bg-red-50"

div.innerHTML=`
<strong>🦠 ${a.title}</strong>
<br>
<a href="${a.link}" target="_blank" class="text-xs text-red-600 underline">
View WHO report
</a>
<br>
<span class="text-xs text-gray-400">${a.date}</span>
`

container.appendChild(div)

})

}catch{

container.innerHTML="<p class='text-red-500 text-xs'>Unable to load outbreak alerts</p>"

}

}

document.addEventListener("DOMContentLoaded",loadOutbreakAlerts)