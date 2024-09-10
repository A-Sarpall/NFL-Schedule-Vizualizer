import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  ARI: "./images/cardinals.jpeg",
  BUF: "./images/bills.jpeg",
  LAR: "./images/rams.jpeg",
  DET: "./images/lions.jpeg",
  WSH: "./images/commanders.jpeg",
  SF: "./images/49ers.jpeg",
  GB: "./images/packers.jpeg",
  LAC: "./images/chargers.jpeg",
  MIA: "./images/dolphins.jpeg",
  CHI: "./images/bears.jpeg",
  NYJ: "./images/jets.jpeg",
  SEA: "./images/seahawks.jpeg",
  MIN: "./images/vikings.jpeg",
  NE: "./images/patriots.jpeg",
  CAR: "./images/panthers.jpeg",
};

// Define the schedule for each week
const schedule = [
  { week: 1, home: "BUF", away: "ARI" },
  { week: 2, home: "ARI", away: "LAR" },
  { week: 3, home: "ARI", away: "DET" },
  { week: 4, home: "ARI", away: "WSH" },
  { week: 5, home: "SF", away: "ARI" },
  { week: 6, home: "GB", away: "ARI" },
  { week: 7, home: "ARI", away: "LAC" },
  { week: 8, home: "MIA", away: "ARI" },
  { week: 9, home: "ARI", away: "CHI" },
  { week: 10, home: "ARI", away: "NYJ" },
  { week: 11, home: "ARI", away: "ARI" }, //BYE
  { week: 12, home: "SEA", away: "ARI" },
  { week: 13, home: "MIN", away: "ARI" },
  { week: 14, home: "ARI", away: "SEA" },
  { week: 15, home: "ARI", away: "NE" },
  { week: 16, home: "CAR", away: "ARI" },
  { week: 17, home: "LAR", away: "ARI" },
  { week: 18, home: "ARI", away: "SF" },
];

const ArizonaCoordinates = [
  stadiums.BUF,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.SF,
  stadiums.GB,
  stadiums.ARI,
  stadiums.MIA,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.ARI, // BYE
  stadiums.SEA,
  stadiums.MIN,
  stadiums.ARI,
  stadiums.ARI,
  stadiums.CAR,
  stadiums.LAR,
  stadiums.ARI,
];

let animationFrameId = null;
let isAnimating = false;

function createCardinalsFlightPath() {
  return new google.maps.Polyline({
    path: ArizonaCoordinates,
    geodesic: false,
    strokeColor: "#b1063a",
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
function cardinalsCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= ArizonaCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(ArizonaCoordinates.length - 1);
    updateWeek(ArizonaCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = ArizonaCoordinates[index];
  const end = ArizonaCoordinates[index + 1];

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
        cardinalsCamera(map, index + 1);
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

export { createCardinalsFlightPath, cardinalsCamera };
