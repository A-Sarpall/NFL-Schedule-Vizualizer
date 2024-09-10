import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  DET: "./images/lions.jpeg",
  LAR: "./images/rams.jpeg",
  TB: "./images/buccaneers.jpeg",
  ARI: "./images/cardinals.jpeg",
  SEA: "./images/seahawks.jpeg",
  DAL: "./images/cowboys.jpeg",
  MIN: "./images/vikings.jpeg",
  TEN: "./images/titans.jpeg",
  GB: "./images/packers.jpeg",
  HOU: "./images/texans.jpeg",
  JAX: "./images/jaguars.jpeg",
  IND: "./images/colts.jpeg",
  CHI: "./images/bears.jpeg",
  BUF: "./images/bills.jpeg",
  SF: "./images/49ers.jpeg",
};

const schedule = [
  { week: 1, home: "DET", away: "LAR" },
  { week: 2, home: "DET", away: "TB" },
  { week: 3, home: "ARI", away: "DET" },
  { week: 4, home: "DET", away: "SEA" },
  { week: 5, home: "DET", away: "DET" }, //BYE
  { week: 6, home: "DAL", away: "DET" },
  { week: 7, home: "MIN", away: "DET" },
  { week: 8, home: "DET", away: "TEN" },
  { week: 9, home: "GB", away: "DET" },
  { week: 10, home: "HOU", away: "DET" },
  { week: 11, home: "DET", away: "JAX" },
  { week: 12, home: "IND", away: "DET" },
  { week: 13, home: "DET", away: "CHI" },
  { week: 14, home: "DET", away: "GB" },
  { week: 15, home: "DET", away: "BUF" },
  { week: 16, home: "CHI", away: "DET" },
  { week: 17, home: "SF", away: "DET" },
  { week: 18, home: "DET", away: "MIN" },
];
const DetroitCoordinates = [
  stadiums.DET,
  stadiums.DET,
  stadiums.ARI,
  stadiums.DET,
  stadiums.DET, // BYE
  stadiums.DAL,
  stadiums.MIN,
  stadiums.DET,
  stadiums.GB,
  stadiums.HOU,
  stadiums.DET,
  stadiums.IND,
  stadiums.DET,
  stadiums.DET,
  stadiums.DET,
  stadiums.CHI,
  stadiums.SF,
  stadiums.DET,
];

let animationFrameId = null;
let isAnimating = false;

function createLionsFlightPath() {
  return new google.maps.Polyline({
    path: DetroitCoordinates,
    geodesic: false,
    strokeColor: "#006db0",
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
function lionsCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= DetroitCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(DetroitCoordinates.length - 1);
    updateWeek(DetroitCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = DetroitCoordinates[index];
  const end = DetroitCoordinates[index + 1];

  // Check if 'start' and 'end' are defined
  if (!start || !end) {
    console.error(
      `Invalid coordinates at index ${index}. Start or end coordinate is undefined.`
    );
    teamSelect.disabled = false; // Re-enable dropdown even if an error occurs
    return;
  }

  const totalSteps = 100; // Number of steps for the animation

  // Update team logos and the week based on the current index (week)
  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      // Move to the next segment after the current one finishes
      setTimeout(() => {
        lionsCamera(map, index + 1);
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

export { createLionsFlightPath, lionsCamera };
