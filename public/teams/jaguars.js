import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  JAX: "./images/jaguars.jpeg",
  MIA: "./images/dolphins.jpeg",
  CLE: "./images/browns.jpeg",
  BUF: "./images/bills.jpeg",
  HOU: "./images/texans.jpeg",
  IND: "./images/colts.jpeg",
  CHI: "./images/bears.jpeg",
  NE: "./images/patriots.jpeg",
  GB: "./images/packers.jpeg",
  PHI: "./images/eagles.jpeg",
  MIN: "./images/vikings.jpeg",
  DET: "./images/lions.jpeg",
  TEN: "./images/titans.jpeg",
  NYJ: "./images/jets.jpeg",
  LV: "./images/raiders.jpeg",
};

const schedule = [
  { week: 1, home: "MIA", away: "JAX" },
  { week: 2, home: "JAX", away: "CLE" },
  { week: 3, home: "BUF", away: "JAX" },
  { week: 4, home: "HOU", away: "JAX" },
  { week: 5, home: "JAX", away: "IND" },
  { week: 6, home: "JAX", away: "CHI" },
  { week: 7, home: "JAX", away: "NE" },
  { week: 8, home: "JAX", away: "GB" },
  { week: 9, home: "PHI", away: "JAX" },
  { week: 10, home: "JAX", away: "MIN" },
  { week: 11, home: "DET", away: "JAX" },
  { week: 12, home: "JAX", away: "JAX" }, //BYE
  { week: 13, home: "JAX", away: "HOU" },
  { week: 14, home: "TEN", away: "JAX" },
  { week: 15, home: "JAX", away: "NYJ" },
  { week: 16, home: "LV", away: "JAX" },
  { week: 17, home: "JAX", away: "TEN" },
  { week: 18, home: "IND", away: "JAX" },
];

const JacksonvilleCoordinates = [
  stadiums.MIA,
  stadiums.JAX,
  stadiums.BUF,
  stadiums.HOU,
  stadiums.JAX,
  stadiums.UKTOT,
  stadiums.UKWEM,
  stadiums.JAX,
  stadiums.PHI,
  stadiums.JAX,
  stadiums.DET,
  stadiums.JAX, // BYE
  stadiums.JAX,
  stadiums.TEN,
  stadiums.JAX,
  stadiums.LV,
  stadiums.JAX,
  stadiums.IND,
];

let animationFrameId = null;
let isAnimating = false;

function createJaguarsFlightPath() {
  return new google.maps.Polyline({
    path: JacksonvilleCoordinates,
    geodesic: false,
    strokeColor: "#ce9d1d",
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
function jaguarsCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= JacksonvilleCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(JacksonvilleCoordinates.length - 1);
    updateWeek(JacksonvilleCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = JacksonvilleCoordinates[index];
  const end = JacksonvilleCoordinates[index + 1];

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
        jaguarsCamera(map, index + 1);
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

export { createJaguarsFlightPath, jaguarsCamera };
