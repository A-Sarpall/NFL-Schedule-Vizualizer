import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  SEA: "./images/seahawks.jpeg",
  DEN: "./images/broncos.jpeg",
  NE: "./images/patriots.jpeg",
  MIA: "./images/dolphins.jpeg",
  DET: "./images/lions.jpeg",
  NYG: "./images/giants.jpeg",
  SF: "./images/49ers.jpeg",
  ATL: "./images/falcons.jpeg",
  BUF: "./images/bills.jpeg",
  LAR: "./images/rams.jpeg",
  ARI: "./images/cardinals.jpeg",
  NYJ: "./images/jets.jpeg",
  GB: "./images/packers.jpeg",
  MIN: "./images/vikings.jpeg",
  CHI: "./images/bears.jpeg",
};

const schedule = [
  { week: 1, home: "SEA", away: "DEN" },
  { week: 2, home: "NE", away: "SEA" },
  { week: 3, home: "SEA", away: "MIA" },
  { week: 4, home: "DET", away: "SEA" },
  { week: 5, home: "SEA", away: "NYG" },
  { week: 6, home: "SEA", away: "SF" },
  { week: 7, home: "ATL", away: "SEA" },
  { week: 8, home: "SEA", away: "BUF" },
  { week: 9, home: "SEA", away: "LAR" },
  { week: 10, home: "SEA", away: "SEA" }, //BYE
  { week: 11, home: "SF", away: "SEA" },
  { week: 12, home: "SEA", away: "ARI" },
  { week: 13, home: "NYJ", away: "SEA" },
  { week: 14, home: "ARI", away: "SEA" },
  { week: 15, home: "SEA", away: "GB" },
  { week: 16, home: "SEA", away: "MIN" },
  { week: 17, home: "CHI", away: "SEA" },
  { week: 18, home: "LAR", away: "SEA" },
];

const SeattleCoordinates = [
  stadiums.SEA,
  stadiums.NE,
  stadiums.SEA,
  stadiums.DET,
  stadiums.SEA,
  stadiums.SEA,
  stadiums.ATL,
  stadiums.SEA,
  stadiums.SEA,
  stadiums.SEA, // BYE
  stadiums.SF,
  stadiums.SEA,
  stadiums.NYJ,
  stadiums.ARI,
  stadiums.SEA,
  stadiums.SEA,
  stadiums.CHI,
  stadiums.LAR,
];

function createSeahawksFlightPath() {
  return new google.maps.Polyline({
    path: SeattleCoordinates,
    geodesic: false,
    strokeColor: "#65b628",
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
function seahawksCamera(map, index = 0) {
  if (index >= SeattleCoordinates.length) return;

  const start = SeattleCoordinates[index];
  const end = SeattleCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        seahawksCamera(map, index + 1);
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

export { createSeahawksFlightPath, seahawksCamera };
