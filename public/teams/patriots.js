import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  NE: "./images/patriots.jpeg",
  CIN: "./images/bengals.jpeg",
  SEA: "./images/seahawks.jpeg",
  NYJ: "./images/jets.jpeg",
  SF: "./images/49ers.jpeg",
  MIA: "./images/dolphins.jpeg",
  HOU: "./images/texans.jpeg",
  JAX: "./images/jaguars.jpeg",
  TEN: "./images/titans.jpeg",
  CHI: "./images/bears.jpeg",
  LAR: "./images/rams.jpeg",
  IND: "./images/colts.jpeg",
  ARI: "./images/cardinals.jpeg",
  BUF: "./images/bills.jpeg",
  LAC: "./images/chargers.jpeg",
};

const schedule = [
  { week: 1, home: "CIN", away: "NE" },
  { week: 2, home: "NE", away: "SEA" },
  { week: 3, home: "NYJ", away: "NE" },
  { week: 4, home: "SF", away: "NE" },
  { week: 5, home: "NE", away: "MIA" },
  { week: 6, home: "NE", away: "HOU" },
  { week: 7, home: "JAX", away: "NE" },
  { week: 8, home: "NE", away: "NYJ" },
  { week: 9, home: "TEN", away: "NE" },
  { week: 10, home: "CHI", away: "NE" },
  { week: 11, home: "NE", away: "LAR" },
  { week: 12, home: "MIA", away: "NE" },
  { week: 13, home: "NE", away: "IND" },
  { week: 14, home: "NE", away: "NE" }, //BYE
  { week: 15, home: "ARI", away: "NE" },
  { week: 16, home: "BUF", away: "NE" },
  { week: 17, home: "NE", away: "LAC" },
  { week: 18, home: "NE", away: "BUF" },
];

const NewEnglandCoordinates = [
  stadiums.CIN,
  stadiums.NE,
  stadiums.NYJ,
  stadiums.SF,
  stadiums.NE,
  stadiums.NE,
  stadiums.UKWEM,
  stadiums.NE,
  stadiums.TEN,
  stadiums.CHI,
  stadiums.LAR,
  stadiums.MIA,
  stadiums.NE,
  stadiums.NE, // BYE
  stadiums.ARI,
  stadiums.BUF,
  stadiums.NE,
  stadiums.NE,
];

function createPatriotsFlightPath() {
  return new google.maps.Polyline({
    path: NewEnglandCoordinates,
    geodesic: false,
    strokeColor: "#0d254d",
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
function patriotsCamera(map, index = 0) {
  if (index >= NewEnglandCoordinates.length) return;

  const start = NewEnglandCoordinates[index];
  const end = NewEnglandCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        patriotsCamera(map, index + 1);
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

export { createPatriotsFlightPath, patriotsCamera };
