import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  LAR: "./images/rams.jpeg",
  DET: "./images/lions.jpeg",
  ARI: "./images/cardinals.jpeg",
  SF: "./images/49ers.jpeg",
  CHI: "./images/bears.jpeg",
  GB: "./images/packers.jpeg",
  LV: "./images/raiders.jpeg",
  MIN: "./images/vikings.jpeg",
  SEA: "./images/seahawks.jpeg",
  MIA: "./images/dolphins.jpeg",
  NE: "./images/patriots.jpeg",
  PHI: "./images/eagles.jpeg",
  NO: "./images/saints.jpeg",
  BUF: "./images/bills.jpeg",
  NYJ: "./images/jets.jpeg",
};

const schedule = [
  { week: 1, home: "DET", away: "LAR" },
  { week: 2, home: "ARI", away: "LAR" },
  { week: 3, home: "LAR", away: "SF" },
  { week: 4, home: "CHI", away: "LAR" },
  { week: 5, home: "LAR", away: "GB" },
  { week: 6, home: "LAR", away: "LAR" }, //BYE
  { week: 7, home: "LAR", away: "LV" },
  { week: 8, home: "LAR", away: "MIN" },
  { week: 9, home: "SEA", away: "LAR" },
  { week: 10, home: "LAR", away: "MIA" },
  { week: 11, home: "NE", away: "LAR" },
  { week: 12, home: "LAR", away: "PHI" },
  { week: 13, home: "NO", away: "LAR" },
  { week: 14, home: "LAR", away: "BUF" },
  { week: 15, home: "SF", away: "LAR" },
  { week: 16, home: "NYJ", away: "LAR" },
  { week: 17, home: "LAR", away: "ARI" },
  { week: 18, home: "LAR", away: "SEA" },
];

const LosAngelesRCoordinates = [
  stadiums.DET,
  stadiums.ARI,
  stadiums.LAR,
  stadiums.CHI,
  stadiums.LAR,
  stadiums.LAR, // BYE
  stadiums.LAR,
  stadiums.LAR,
  stadiums.SEA,
  stadiums.LAR,
  stadiums.NE,
  stadiums.LAR,
  stadiums.NO,
  stadiums.LAR,
  stadiums.SF,
  stadiums.NYJ,
  stadiums.LAR,
  stadiums.LAR,
];

function createRamsFlightPath() {
  return new google.maps.Polyline({
    path: LosAngelesRCoordinates,
    geodesic: false,
    strokeColor: "#013594",
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
function ramsCamera(map, index = 0) {
  if (index >= LosAngelesRCoordinates.length) return;

  const start = LosAngelesRCoordinates[index];
  const end = LosAngelesRCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        ramsCamera(map, index + 1);
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

export { createRamsFlightPath, ramsCamera };
