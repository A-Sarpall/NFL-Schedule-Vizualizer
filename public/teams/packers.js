import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  GB: "./images/packers.jpeg",
  PHI: "./images/eagles.jpeg",
  IND: "./images/colts.jpeg",
  TEN: "./images/titans.jpeg",
  MIN: "./images/vikings.jpeg",
  LAR: "./images/rams.jpeg",
  ARI: "./images/cardinals.jpeg",
  HOU: "./images/texans.jpeg",
  JAX: "./images/jaguars.jpeg",
  DET: "./images/lions.jpeg",
  CHI: "./images/bears.jpeg",
  SF: "./images/49ers.jpeg",
  MIA: "./images/dolphins.jpeg",
  SEA: "./images/seahawks.jpeg",
  NO: "./images/saints.jpeg",
};

const schedule = [
  { week: 1, home: "PHI", away: "GB" },
  { week: 2, home: "GB", away: "IND" },
  { week: 3, home: "TEN", away: "GB" },
  { week: 4, home: "GB", away: "MIN" },
  { week: 5, home: "LAR", away: "GB" },
  { week: 6, home: "GB", away: "ARI" },
  { week: 7, home: "GB", away: "HOU" },
  { week: 8, home: "JAX", away: "GB" },
  { week: 9, home: "GB", away: "DET" },
  { week: 10, home: "GB", away: "GB" }, //BYE
  { week: 11, home: "CHI", away: "GB" },
  { week: 12, home: "GB", away: "SF" },
  { week: 13, home: "GB", away: "MIA" },
  { week: 14, home: "DET", away: "GB" },
  { week: 15, home: "SEA", away: "GB" },
  { week: 16, home: "GB", away: "NO" },
  { week: 17, home: "MIN", away: "GB" },
  { week: 18, home: "GB", away: "CHI" },
];

const GreenBayCoordinates = [
  stadiums.BRAZIL,
  stadiums.GB,
  stadiums.TEN,
  stadiums.GB,
  stadiums.LAR,
  stadiums.GB,
  stadiums.GB,
  stadiums.JAX,
  stadiums.GB,
  stadiums.GB, // BYE
  stadiums.CHI,
  stadiums.GB,
  stadiums.GB,
  stadiums.DET,
  stadiums.SEA,
  stadiums.GB,
  stadiums.MIN,
  stadiums.GB,
];

function createPackersFlightPath() {
  return new google.maps.Polyline({
    path: GreenBayCoordinates,
    geodesic: false,
    strokeColor: "#1c2e26",
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
function packersCamera(map, index = 0) {
  if (index >= GreenBayCoordinates.length) return;

  const start = GreenBayCoordinates[index];
  const end = GreenBayCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        packersCamera(map, index + 1);
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

export { createPackersFlightPath, packersCamera };
