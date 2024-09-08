import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  LV: "./images/raiders.jpeg",
  LAC: "./images/chargers.jpeg",
  BAL: "./images/ravens.jpeg",
  CAR: "./images/panthers.jpeg",
  CLE: "./images/browns.jpeg",
  DEN: "./images/broncos.jpeg",
  PIT: "./images/steelers.jpeg",
  LAR: "./images/rams.jpeg",
  KC: "./images/chiefs.jpeg",
  CIN: "./images/bengals.jpeg",
  MIA: "./images/dolphins.jpeg",
  TB: "./images/buccaneers.jpeg",
  ATL: "./images/falcons.jpeg",
  JAX: "./images/jaguars.jpeg",
  NO: "./images/saints.jpeg",
};

const schedule = [
  { week: 1, home: "LAC", away: "LV" },
  { week: 2, home: "BAL", away: "LV" },
  { week: 3, home: "LV", away: "CAR" },
  { week: 4, home: "LV", away: "CLE" },
  { week: 5, home: "DEN", away: "LV" },
  { week: 6, home: "LV", away: "PIT" },
  { week: 7, home: "LAR", away: "LV" },
  { week: 8, home: "LV", away: "KC" },
  { week: 9, home: "CIN", away: "LV" },
  { week: 10, home: "LV", away: "LV" }, //BYE
  { week: 11, home: "MIA", away: "LV" },
  { week: 12, home: "LV", away: "DEN" },
  { week: 13, home: "KC", away: "LV" },
  { week: 14, home: "TB", away: "LV" },
  { week: 15, home: "LV", away: "ATL" },
  { week: 16, home: "LV", away: "JAX" },
  { week: 17, home: "NO", away: "LV" },
  { week: 18, home: "LV", away: "LAC" },
];

const LasVegasCoordinates = [
  stadiums.LAC,
  stadiums.BAL,
  stadiums.LV,
  stadiums.LV,
  stadiums.DEN,
  stadiums.LV,
  stadiums.LAR,
  stadiums.LV,
  stadiums.CIN,
  stadiums.LV, // BYE
  stadiums.MIA,
  stadiums.LV,
  stadiums.KC,
  stadiums.TB,
  stadiums.LV,
  stadiums.LV,
  stadiums.NO,
  stadiums.LV,
];

function createRaidersFlightPath() {
  return new google.maps.Polyline({
    path: LasVegasCoordinates,
    geodesic: false,
    strokeColor: "#000000",
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
function raidersCamera(map, index = 0) {
  if (index >= LasVegasCoordinates.length) return;

  const start = LasVegasCoordinates[index];
  const end = LasVegasCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  let currentStep = 0;

  updateTeamLogos(index);
  updateWeek(index);

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        raidersCamera(map, index + 1);
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

export { createRaidersFlightPath, raidersCamera };
