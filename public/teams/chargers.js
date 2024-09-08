import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  LAC: "./images/chargers.jpeg",
  LV: "./images/raiders.jpeg",
  CAR: "./images/panthers.jpeg",
  PIT: "./images/steelers.jpeg",
  KC: "./images/chiefs.jpeg",
  DEN: "./images/broncos.jpeg",
  ARI: "./images/cardinals.jpeg",
  NO: "./images/saints.jpeg",
  CLE: "./images/browns.jpeg",
  TEN: "./images/titans.jpeg",
  CIN: "./images/bengals.jpeg",
  BAL: "./images/ravens.jpeg",
  ATL: "./images/falcons.jpeg",
  TB: "./images/buccaneers.jpeg",
  NE: "./images/patriots.jpeg",
};

// Define the schedule for each week
const schedule = [
  { week: 1, home: "LAC", away: "LV" },
  { week: 2, home: "CAR", away: "LAC" },
  { week: 3, home: "PIT", away: "LAC" },
  { week: 4, home: "LAC", away: "KC" },
  { week: 5, home: "LAC", away: "LAC" }, //BYE
  { week: 6, home: "DEN", away: "LAC" },
  { week: 7, home: "ARI", away: "LAC" },
  { week: 8, home: "LAC", away: "NO" },
  { week: 9, home: "CLE", away: "LAC" },
  { week: 10, home: "LAC", away: "TEN" },
  { week: 11, home: "LAC", away: "CIN" },
  { week: 12, home: "LAC", away: "BAL" },
  { week: 13, home: "ATL", away: "LAC" },
  { week: 14, home: "KC", away: "LAC" },
  { week: 15, home: "LAC", away: "TB" },
  { week: 16, home: "LAC", away: "DEN" },
  { week: 17, home: "NE", away: "LAC" },
  { week: 18, home: "LV", away: "LAC" },
];

const LosAngelesCCoordinates = [
  stadiums.LAC,
  stadiums.CAR,
  stadiums.PIT,
  stadiums.LAC,
  stadiums.LAC, // BYE
  stadiums.DEN,
  stadiums.ARI,
  stadiums.LAC,
  stadiums.CLE,
  stadiums.LAC,
  stadiums.LAC,
  stadiums.LAC,
  stadiums.ATL,
  stadiums.KC,
  stadiums.LAC,
  stadiums.LAC,
  stadiums.NE,
  stadiums.LV,
];

function createChargersFlightPath() {
  return new google.maps.Polyline({
    path: LosAngelesCCoordinates,
    geodesic: false,
    strokeColor: "#f6be1d",
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
function chargersCamera(map, index = 0) {
  if (index >= LosAngelesCCoordinates.length) return;

  const start = LosAngelesCCoordinates[index];
  const end = LosAngelesCCoordinates[index + 1];
  const totalSteps = 600; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        chargersCamera(map, index + 1);
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

export { createChargersFlightPath, chargersCamera };
