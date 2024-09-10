import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  WSH: "./images/commanders.jpeg",
  TB: "./images/buccaneers.jpeg",
  NYG: "./images/giants.jpeg",
  CIN: "./images/bengals.jpeg",
  ARI: "./images/cardinals.jpeg",
  CLE: "./images/browns.jpeg",
  BAL: "./images/ravens.jpeg",
  CAR: "./images/panthers.jpeg",
  CHI: "./images/bears.jpeg",
  PIT: "./images/steelers.jpeg",
  PHI: "./images/eagles.jpeg",
  DAL: "./images/cowboys.jpeg",
  TEN: "./images/titans.jpeg",
  NO: "./images/saints.jpeg",
  ATL: "./images/falcons.jpeg",
};

// Define the schedule for each week
const schedule = [
  { week: 1, home: "TB", away: "WSH" },
  { week: 2, home: "WSH", away: "NYG" },
  { week: 3, home: "CIN", away: "WSH" },
  { week: 4, home: "ARI", away: "WSH" },
  { week: 5, home: "WSH", away: "CLE" },
  { week: 6, home: "BAL", away: "WSH" },
  { week: 7, home: "WSH", away: "CAR" },
  { week: 8, home: "WSH", away: "CHI" },
  { week: 9, home: "NYG", away: "WSH" },
  { week: 10, home: "WSH", away: "PIT" },
  { week: 11, home: "PHI", away: "WSH" },
  { week: 12, home: "WSH", away: "DAL" },
  { week: 13, home: "WSH", away: "TEN" },
  { week: 14, home: "WSH", away: "WSH" }, //BYE
  { week: 15, home: "NO", away: "WSH" },
  { week: 16, home: "WSH", away: "PHI" },
  { week: 17, home: "WSH", away: "ATL" },
  { week: 18, home: "DAL", away: "WSH" },
];

const WashingtonCoordinates = [
  stadiums.TB,
  stadiums.WSH,
  stadiums.CIN,
  stadiums.ARI,
  stadiums.WSH,
  stadiums.BAL,
  stadiums.WSH,
  stadiums.WSH,
  stadiums.NYG,
  stadiums.WSH,
  stadiums.PHI,
  stadiums.WSH,
  stadiums.WSH,
  stadiums.WSH, // BYE
  stadiums.NO,
  stadiums.WSH,
  stadiums.WSH,
  stadiums.DAL,
];

let animationFrameId = null;
let isAnimating = false;

function createCommandersFlightPath() {
  return new google.maps.Polyline({
    path: WashingtonCoordinates,
    geodesic: false,
    strokeColor: "#5a1514",
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
function commandersCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= WashingtonCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(WashingtonCoordinates.length - 1);
    updateWeek(WashingtonCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = WashingtonCoordinates[index];
  const end = WashingtonCoordinates[index + 1];

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
        commandersCamera(map, index + 1);
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

export { createCommandersFlightPath, commandersCamera };
