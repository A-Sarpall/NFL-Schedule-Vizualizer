import stadiums from "../stadiums.js";

const teamLogos = {
  BUF: "./images/bills.jpeg",
  ARI: "./images/cardinals.jpeg",
  MIA: "./images/dolphins.jpeg",
  JAX: "./images/jaguars.jpeg",
  BAL: "./images/ravens.jpeg",
  HOU: "./images/texans.jpeg",
  NYJ: "./images/jets.jpeg",
  TEN: "./images/titans.jpeg",
  SEA: "./images/seahawks.jpeg",
  IND: "./images/colts.jpeg",
  KC: "./images/chiefs.jpeg",
  SF: "./images/49ers.jpeg",
  LAR: "./images/rams.jpeg",
  DET: "./images/lions.jpeg",
  NE: "./images/patriots.jpeg",
};

const schedule = [
  { week: 1, home: "BUF", away: "ARI" },
  { week: 2, home: "MIA", away: "BUF" },
  { week: 3, home: "BUF", away: "JAX" },
  { week: 4, home: "BAL", away: "BUF" },
  { week: 5, home: "HOU", away: "BUF" },
  { week: 6, home: "NYJ", away: "BUF" },
  { week: 7, home: "BUF", away: "TEN" },
  { week: 8, home: "SEA", away: "BUF" },
  { week: 9, home: "BUF", away: "MIA" },
  { week: 10, home: "IND", away: "BUF" },
  { week: 11, home: "BUF", away: "KC" },
  { week: 12, home: "BUF", away: "BUF" }, //BYE
  { week: 13, home: "BUF", away: "SF" },
  { week: 14, home: "LAR", away: "BUF" },
  { week: 15, home: "DET", away: "BUF" },
  { week: 16, home: "BUF", away: "NE" },
  { week: 17, home: "BUF", away: "NYJ" },
  { week: 18, home: "NE", away: "BUF" },
];

const BuffaloCoordinates = [
  stadiums.BUF,
  stadiums.MIA,
  stadiums.BUF,
  stadiums.BAL,
  stadiums.HOU,
  stadiums.NYJ,
  stadiums.BUF,
  stadiums.SEA,
  stadiums.BUF,
  stadiums.IND,
  stadiums.BUF,
  stadiums.BUF, // BYE
  stadiums.BUF,
  stadiums.LAR,
  stadiums.DET,
  stadiums.BUF,
  stadiums.BUF,
  stadiums.NE,
];

function createBillsFlightPath() {
  return new google.maps.Polyline({
    path: BuffaloCoordinates,
    geodesic: false,
    strokeColor: "#0066b3",
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

  homeImg.src = teamLogos[homeTeam] || "./images/default_home.jpg";
  awayImg.src = teamLogos[awayTeam] || "./images/default_away.jpg";

  console.log(`Home Image Set To: ${homeImg.src}`);
  console.log(`Away Image Set To: ${awayImg.src}`);
}

// Function to update the week display
function updateWeek(weekIndex) {
  const weekElement = document.querySelector(".week h2");
  weekElement.textContent = `Week ${weekIndex + 1}`; // Weeks start from 1
}

// Function to animate the camera along the flight path
function billsCamera(map, index = 0) {
  if (index >= BuffaloCoordinates.length) return;

  const start = BuffaloCoordinates[index];
  const end = BuffaloCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        billsCamera(map, index + 1);
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

export { createBillsFlightPath, billsCamera };
