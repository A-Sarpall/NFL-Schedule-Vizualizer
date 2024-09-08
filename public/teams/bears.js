import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  CHI: "./images/bears.jpeg",
  TEN: "./images/titans.jpeg",
  HOU: "./images/texans.jpeg",
  IND: "./images/colts.jpeg",
  LAR: "./images/rams.jpeg",
  CAR: "./images/panthers.jpeg",
  JAX: "./images/jaguars.jpeg",
  WSH: "./images/commanders.jpeg",
  ARI: "./images/cardinals.jpeg",
  NE: "./images/patriots.jpeg",
  GB: "./images/packers.jpeg",
  MIN: "./images/vikings.jpeg",
  DET: "./images/lions.jpeg",
  SF: "./images/49ers.jpeg",
  SEA: "./images/seahawks.jpeg",
};

// Define the schedule for each week
const schedule = [
  { week: 1, home: "CHI", away: "TEN" },
  { week: 2, home: "HOU", away: "CHI" },
  { week: 3, home: "IND", away: "CHI" },
  { week: 4, home: "CHI", away: "LAR" },
  { week: 5, home: "CHI", away: "CAR" },
  { week: 6, home: "CHI", away: "JAX" },
  { week: 7, home: "CHI", away: "CHI" }, //BYE
  { week: 8, home: "WSH", away: "CHI" },
  { week: 9, home: "ARI", away: "CHI" },
  { week: 10, home: "CHI", away: "NE" },
  { week: 11, home: "CHI", away: "GB" },
  { week: 12, home: "CHI", away: "MIN" },
  { week: 13, home: "DET", away: "CHI" },
  { week: 14, home: "SF", away: "CHI" },
  { week: 15, home: "MIN", away: "CHI" },
  { week: 16, home: "CHI", away: "DET" },
  { week: 17, home: "CHI", away: "SEA" },
  { week: 18, home: "GB", away: "CHI" },
];

const ChicagoCoordinates = [
  stadiums.CHI,
  stadiums.HOU,
  stadiums.IND,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.UKTOT,
  stadiums.CHI,
  stadiums.WSH,
  stadiums.ARI,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.DET,
  stadiums.SF,
  stadiums.MIN,
  stadiums.CHI,
  stadiums.CHI,
  stadiums.GB,
];

let animationFrameId = null;
let isAnimating = false;

// Function to create the Bears' flight path
function createBearsFlightPath(map) {
  const flightPath = new google.maps.Polyline({
    path: ChicagoCoordinates,
    geodesic: false,
    strokeColor: "#df3f00",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);

  return flightPath;
}

// Function to update the team logos based on the current week
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

// Function to animate the camera along the flight path and update logos
function bearsCamera(map, index = 0) {
  if (index >= ChicagoCoordinates.length) return;

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = ChicagoCoordinates[index];
  const end = ChicagoCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  // Update team logos and the week based on the current index (week)
  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        bearsCamera(map, index + 1);
      }, 1000); // Wait before moving to the next point
      return;
    }

    const lat = start.lat + (end.lat - start.lat) * (currentStep / totalSteps);
    const lng = start.lng + (end.lng - start.lng) * (currentStep / totalSteps);

    map.panTo(new google.maps.LatLng(lat, lng));
    map.setZoom(7); // Adjust the zoom level as needed

    currentStep++;
    animationFrameId = requestAnimationFrame(moveCamera);
    isAnimating = true;
  }

  moveCamera();
}

export { createBearsFlightPath, bearsCamera };
