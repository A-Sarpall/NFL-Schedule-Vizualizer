import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  ATL: "./images/falcons.jpeg",
  PIT: "./images/steelers.jpeg",
  PHI: "./images/eagles.jpeg",
  KC: "./images/chiefs.jpeg",
  NO: "./images/saints.jpeg",
  TB: "./images/buccaneers.jpeg",
  CAR: "./images/panthers.jpeg",
  SEA: "./images/seahawks.jpeg",
  DAL: "./images/cowboys.jpeg",
  DEN: "./images/broncos.jpeg",
  LAC: "./images/chargers.jpeg",
  MIN: "./images/vikings.jpeg",
  LV: "./images/raiders.jpeg",
  NYG: "./images/giants.jpeg",
  WSH: "./images/commanders.jpeg",
};

const schedule = [
  { week: 1, home: "ATL", away: "PIT" },
  { week: 2, home: "PHI", away: "ATL" },
  { week: 3, home: "ATL", away: "KC" },
  { week: 4, home: "ATL", away: "NO" },
  { week: 5, home: "ATL", away: "TB" },
  { week: 6, home: "CAR", away: "ATL" },
  { week: 7, home: "ATL", away: "SEA" },
  { week: 8, home: "TB", away: "ATL" },
  { week: 9, home: "ATL", away: "DAL" },
  { week: 10, home: "NO", away: "ATL" },
  { week: 11, home: "DEN", away: "ATL" },
  { week: 12, home: "ATL", away: "ATL" }, //BYE
  { week: 13, home: "ATL", away: "LAC" },
  { week: 14, home: "MIN", away: "ATL" },
  { week: 15, home: "LV", away: "ATL" },
  { week: 16, home: "ATL", away: "NYG" },
  { week: 17, home: "WSH", away: "ATL" },
  { week: 18, home: "ATL", away: "CAR" },
];

const AtlantaCoordinates = [
  stadiums.ATL,
  stadiums.PHI,
  stadiums.ATL,
  stadiums.ATL,
  stadiums.ATL,
  stadiums.CAR,
  stadiums.ATL,
  stadiums.TB,
  stadiums.ATL,
  stadiums.NO,
  stadiums.DEN,
  stadiums.ATL, //BYE
  stadiums.ATL,
  stadiums.MIN,
  stadiums.LV,
  stadiums.ATL,
  stadiums.WSH,
  stadiums.ATL,
];

function createFalconsFlightPath() {
  return new google.maps.Polyline({
    path: AtlantaCoordinates,
    geodesic: false,
    strokeColor: "#bd0c19",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
}

function updateTeamLogos(weekIndex) {
  const homeImg = document.getElementById("home-team-img");
  const awayImg = document.getElementById("away-team-img");

  const currentMatch = schedule[weekIndex];
  if (!currentMatch) {
    console.error("No match found for this week");
    return;
  }

  const homeTeam = currentMatch.home;
  const awayTeam = currentMatch.away;

  homeImg.src = teamLogos[homeTeam] || "./images/default_home.jpeg";
  awayImg.src = teamLogos[awayTeam] || "./images/default_away.jpeg";

  console.log(`Home Image Set To: ${homeImg.src}`);
  console.log(`Away Image Set To: ${awayImg.src}`);
}

// Function to update the week display
function updateWeek(weekIndex) {
  const weekElement = document.querySelector(".week h2");
  weekElement.textContent = `Week ${weekIndex + 1}`; // Weeks start from 1
}

// Function to animate the camera along the flight path
function falconsCamera(map, index = 0) {
  if (index >= AtlantaCoordinates.length) return;

  const start = AtlantaCoordinates[index];
  const end = AtlantaCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        falconsCamera(map, index + 1);
      }, 1000); // Wait before moving to the next point
      return;
    }

    const lat = start.lat + (end.lat - start.lat) * (currentStep / totalSteps);
    const lng = start.lng + (end.lng - start.lng) * (currentStep / totalSteps);

    map.panTo(new google.maps.LatLng(lat, lng));
    map.setZoom(7); // Adjust the zoom level as needed

    currentStep++;
    setTimeout(moveCamera, stepDuration);
  }

  moveCamera();
}

export { createFalconsFlightPath, falconsCamera };
