import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  IND: "./images/colts.jpeg",
  HOU: "./images/texans.jpeg",
  GB: "./images/packers.jpeg",
  CHI: "./images/bears.jpeg",
  PIT: "./images/steelers.jpeg",
  JAX: "./images/jaguars.jpeg",
  TEN: "./images/titans.jpeg",
  MIA: "./images/dolphins.jpeg",
  MIN: "./images/vikings.jpeg",
  BUF: "./images/bills.jpeg",
  NYJ: "./images/jets.jpeg",
  DET: "./images/lions.jpeg",
  NE: "./images/patriots.jpeg",
  DEN: "./images/broncos.jpeg",
  NYG: "./images/giants.jpeg",
};

// Define the schedule for each week
const schedule = [
  { week: 1, home: "IND", away: "HOU" },
  { week: 2, home: "GB", away: "IND" },
  { week: 3, home: "IND", away: "CHI" },
  { week: 4, home: "IND", away: "PIT" },
  { week: 5, home: "JAX", away: "IND" },
  { week: 6, home: "TEN", away: "IND" },
  { week: 7, home: "IND", away: "MIA" },
  { week: 8, home: "HOU", away: "IND" },
  { week: 9, home: "MIN", away: "IND" },
  { week: 10, home: "IND", away: "BUF" },
  { week: 11, home: "NYJ", away: "IND" },
  { week: 12, home: "IND", away: "DET" },
  { week: 13, home: "NE", away: "IND" },
  { week: 14, home: "IND", away: "IND" }, //BYE
  { week: 15, home: "DEN", away: "IND" },
  { week: 16, home: "IND", away: "TEN" },
  { week: 17, home: "NYG", away: "IND" },
  { week: 18, home: "IND", away: "JAX" },
];

const IndianapolisCoordinates = [
  stadiums.IND,
  stadiums.GB,
  stadiums.IND,
  stadiums.IND,
  stadiums.JAX,
  stadiums.TEN,
  stadiums.IND,
  stadiums.HOU,
  stadiums.MIN,
  stadiums.IND,
  stadiums.NYJ,
  stadiums.IND,
  stadiums.NE,
  stadiums.IND, // BYE
  stadiums.DEN,
  stadiums.IND,
  stadiums.NYG,
  stadiums.IND,
];

let animationFrameId = null;
let isAnimating = false;

function createColtsFlightPath() {
  return new google.maps.Polyline({
    path: IndianapolisCoordinates,
    geodesic: false,
    strokeColor: "#003b7b",
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
function coltsCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= IndianapolisCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(IndianapolisCoordinates.length - 1);
    updateWeek(IndianapolisCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = IndianapolisCoordinates[index];
  const end = IndianapolisCoordinates[index + 1];

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
        coltsCamera(map, index + 1);
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

export { createColtsFlightPath, coltsCamera };
