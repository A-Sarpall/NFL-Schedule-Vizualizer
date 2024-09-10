import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  CAR: "./images/panthers.jpeg",
  NO: "./images/saints.jpeg",
  LAC: "./images/chargers.jpeg",
  LV: "./images/raiders.jpeg",
  CIN: "./images/bengals.jpeg",
  CHI: "./images/bears.jpeg",
  ATL: "./images/falcons.jpeg",
  WSH: "./images/commanders.jpeg",
  DEN: "./images/broncos.jpeg",
  NYG: "./images/giants.jpeg",
  KC: "./images/chiefs.jpeg",
  TB: "./images/buccaneers.jpeg",
  PHI: "./images/eagles.jpeg",
  DAL: "./images/cowboys.jpeg",
  ARI: "./images/cardinals.jpeg",
};

const schedule = [
  { week: 1, home: "NO", away: "CAR" },
  { week: 2, home: "CAR", away: "LAC" },
  { week: 3, home: "LV", away: "CAR" },
  { week: 4, home: "CAR", away: "CIN" },
  { week: 5, home: "CHI", away: "CAR" },
  { week: 6, home: "CAR", away: "ATL" },
  { week: 7, home: "WSH", away: "CAR" },
  { week: 8, home: "DEN", away: "CAR" },
  { week: 9, home: "CAR", away: "NO" },
  { week: 10, home: "CAR", away: "NYG" },
  { week: 11, home: "CAR", away: "CAR" }, //BYE
  { week: 12, home: "CAR", away: "KC" },
  { week: 13, home: "CAR", away: "TB" },
  { week: 14, home: "PHI", away: "CAR" },
  { week: 15, home: "CAR", away: "DAL" },
  { week: 16, home: "CAR", away: "ARI" },
  { week: 17, home: "TB", away: "CAR" },
  { week: 18, home: "ATL", away: "CAR" },
];

const CarolinaCoordinates = [
  stadiums.NO,
  stadiums.CAR,
  stadiums.LV,
  stadiums.CAR,
  stadiums.CHI,
  stadiums.CAR,
  stadiums.WSH,
  stadiums.DEN,
  stadiums.CAR,
  stadiums.GERMANY,
  stadiums.CAR, //BYE
  stadiums.CAR,
  stadiums.CAR,
  stadiums.PHI,
  stadiums.CAR,
  stadiums.CAR,
  stadiums.TB,
  stadiums.ATL,
];

let animationFrameId = null;
let isAnimating = false;

function createPanthersFlightPath() {
  return new google.maps.Polyline({
    path: CarolinaCoordinates,
    geodesic: false,
    strokeColor: "#0085ca",
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
function panthersCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= CarolinaCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(CarolinaCoordinates.length - 1);
    updateWeek(CarolinaCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = CarolinaCoordinates[index];
  const end = CarolinaCoordinates[index + 1];

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
        panthersCamera(map, index + 1);
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

export { createPanthersFlightPath, panthersCamera };
