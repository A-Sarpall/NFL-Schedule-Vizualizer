import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  MIN: "./images/vikings.jpeg",
  NYG: "./images/giants.jpeg",
  SF: "./images/49ers.jpeg",
  HOU: "./images/texans.jpeg",
  GB: "./images/packers.jpeg",
  NYJ: "./images/jets.jpeg",
  DET: "./images/lions.jpeg",
  LAR: "./images/rams.jpeg",
  IND: "./images/colts.jpeg",
  JAX: "./images/jaguars.jpeg",
  TEN: "./images/titans.jpeg",
  CHI: "./images/bears.jpeg",
  ARI: "./images/cardinals.jpeg",
  ATL: "./images/falcons.jpeg",
  SEA: "./images/seahawks.jpeg",
};

const schedule = [
  { week: 1, home: "NYG", away: "MIN" },
  { week: 2, home: "MIN", away: "SF" },
  { week: 3, home: "MIN", away: "HOU" },
  { week: 4, home: "GB", away: "MIN" },
  { week: 5, home: "MIN", away: "NYJ" },
  { week: 6, home: "MIN", away: "MIN" }, //BYE
  { week: 7, home: "MIN", away: "DET" },
  { week: 8, home: "LAR", away: "MIN" },
  { week: 9, home: "MIN", away: "IND" },
  { week: 10, home: "JAX", away: "MIN" },
  { week: 11, home: "TEN", away: "MIN" },
  { week: 12, home: "CHI", away: "MIN" },
  { week: 13, home: "MIN", away: "ARI" },
  { week: 14, home: "MIN", away: "ATL" },
  { week: 15, home: "MIN", away: "CHI" },
  { week: 16, home: "SEA", away: "MIN" },
  { week: 17, home: "MIN", away: "GB" },
  { week: 18, home: "DET", away: "MIN" },
];

const MinnesotaCoordinates = [
  stadiums.NYG,
  stadiums.MIN,
  stadiums.MIN,
  stadiums.GB,
  stadiums.UKTOT,
  stadiums.MIN, // BYE
  stadiums.MIN,
  stadiums.LAR,
  stadiums.MIN,
  stadiums.JAX,
  stadiums.TEN,
  stadiums.CHI,
  stadiums.MIN,
  stadiums.MIN,
  stadiums.MIN,
  stadiums.SEA,
  stadiums.MIN,
  stadiums.DET,
];

let animationFrameId = null;
let isAnimating = false;

function createVikingsFlightPath() {
  return new google.maps.Polyline({
    path: MinnesotaCoordinates,
    geodesic: false,
    strokeColor: "#4f2681",
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
function vikingsCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= MinnesotaCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(MinnesotaCoordinates.length - 1);
    updateWeek(MinnesotaCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = MinnesotaCoordinates[index];
  const end = MinnesotaCoordinates[index + 1];

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
        vikingsCamera(map, index + 1);
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

export { createVikingsFlightPath, vikingsCamera };
