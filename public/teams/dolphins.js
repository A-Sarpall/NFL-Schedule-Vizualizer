import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  MIA: "./images/dolphins.jpeg",
  JAX: "./images/jaguars.jpeg",
  BUF: "./images/bills.jpeg",
  SEA: "./images/seahawks.jpeg",
  TEN: "./images/titans.jpeg",
  NE: "./images/patriots.jpeg",
  IND: "./images/colts.jpeg",
  ARI: "./images/cardinals.jpeg",
  LAR: "./images/rams.jpeg",
  LV: "./images/raiders.jpeg",
  GB: "./images/packers.jpeg",
  NYJ: "./images/jets.jpeg",
  HOU: "./images/texans.jpeg",
  SF: "./images/49ers.jpeg",
  CLE: "./images/browns.jpeg",
};

const schedule = [
  { week: 1, home: "MIA", away: "JAX" },
  { week: 2, home: "MIA", away: "BUF" },
  { week: 3, home: "SEA", away: "MIA" },
  { week: 4, home: "MIA", away: "TEN" },
  { week: 5, home: "NE", away: "MIA" },
  { week: 6, home: "MIA", away: "MIA" }, //BYE
  { week: 7, home: "IND", away: "MIA" },
  { week: 8, home: "MIA", away: "ARI" },
  { week: 9, home: "BUF", away: "MIA" },
  { week: 10, home: "LAR", away: "MIA" },
  { week: 11, home: "MIA", away: "LV" },
  { week: 12, home: "MIA", away: "NE" },
  { week: 13, home: "GB", away: "MIA" },
  { week: 14, home: "MIA", away: "NYJ" },
  { week: 15, home: "HOU", away: "MIA" },
  { week: 16, home: "MIA", away: "SF" },
  { week: 17, home: "CLE", away: "MIA" },
  { week: 18, home: "NYJ", away: "MIA" },
];

const MiamiCoordinates = [
  stadiums.MIA,
  stadiums.MIA,
  stadiums.SEA,
  stadiums.MIA,
  stadiums.NE,
  stadiums.MIA, // BYE
  stadiums.IND,
  stadiums.MIA,
  stadiums.BUF,
  stadiums.LAR,
  stadiums.MIA,
  stadiums.MIA,
  stadiums.GB,
  stadiums.MIA,
  stadiums.HOU,
  stadiums.MIA,
  stadiums.CLE,
  stadiums.NYJ,
];

let animationFrameId = null;
let isAnimating = false;

function createDolphinsFlightPath() {
  return new google.maps.Polyline({
    path: MiamiCoordinates,
    geodesic: false,
    strokeColor: "#008c95",
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
function dolphinsCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= MiamiCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(MiamiCoordinates.length - 1);
    updateWeek(MiamiCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = MiamiCoordinates[index];
  const end = MiamiCoordinates[index + 1];

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
        dolphinsCamera(map, index + 1);
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

export { createDolphinsFlightPath, dolphinsCamera };
