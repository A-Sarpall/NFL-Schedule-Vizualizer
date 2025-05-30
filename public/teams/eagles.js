import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  PHI: "./images/eagles.jpeg",
  GB: "./images/packers.jpeg",
  ATL: "./images/falcons.jpeg",
  NO: "./images/saints.jpeg",
  TB: "./images/buccaneers.jpeg",
  CLE: "./images/browns.jpeg",
  NYG: "./images/giants.jpeg",
  CIN: "./images/bengals.jpeg",
  JAX: "./images/jaguars.jpeg",
  DAL: "./images/cowboys.jpeg",
  WSH: "./images/commanders.jpeg",
  LAR: "./images/rams.jpeg",
  BAL: "./images/ravens.jpeg",
  CAR: "./images/panthers.jpeg",
  PIT: "./images/steelers.jpeg",
};

const schedule = [
  { week: 1, home: "PHI", away: "GB" },
  { week: 2, home: "PHI", away: "ATL" },
  { week: 3, home: "NO", away: "PHI" },
  { week: 4, home: "TB", away: "PHI" },
  { week: 5, home: "PHI", away: "PHI" }, //BYE
  { week: 6, home: "PHI", away: "CLE" },
  { week: 7, home: "NYG", away: "PHI" },
  { week: 8, home: "CIN", away: "PHI" },
  { week: 9, home: "PHI", away: "JAX" },
  { week: 10, home: "DAL", away: "PHI" },
  { week: 11, home: "PHI", away: "WSH" },
  { week: 12, home: "LAR", away: "PHI" },
  { week: 13, home: "BAL", away: "PHI" },
  { week: 14, home: "PHI", away: "CAR" },
  { week: 15, home: "PHI", away: "PIT" },
  { week: 16, home: "WSH", away: "PHI" },
  { week: 17, home: "PHI", away: "DAL" },
  { week: 18, home: "PHI", away: "NYG" },
];

const PhiladelphiaCoordinates = [
  stadiums.BRAZIL,
  stadiums.PHI,
  stadiums.NO,
  stadiums.TB,
  stadiums.PHI, //BYE
  stadiums.PHI,
  stadiums.NYG,
  stadiums.CIN,
  stadiums.PHI,
  stadiums.DAL,
  stadiums.PHI,
  stadiums.LAR,
  stadiums.BAL,
  stadiums.PHI,
  stadiums.PHI,
  stadiums.WSH,
  stadiums.PHI,
  stadiums.PHI,
];

let animationFrameId = null;
let isAnimating = false;

function createEaglesFlightPath() {
  return new google.maps.Polyline({
    path: PhiladelphiaCoordinates,
    geodesic: false,
    strokeColor: "#004d56",
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
function eaglesCamera(map, index = 0) {
  const teamSelect = document.getElementById("team-select");

  // Disable the dropdown menu before the animation starts
  teamSelect.disabled = true;

  // Check if we have finished the entire flight path
  if (index >= PhiladelphiaCoordinates.length - 1) {
    // Update for the final week
    updateTeamLogos(PhiladelphiaCoordinates.length - 1);
    updateWeek(PhiladelphiaCoordinates.length - 1);

    // Re-enable the dropdown menu when the animation is complete
    teamSelect.disabled = false;
    return;
  }

  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }

  const start = PhiladelphiaCoordinates[index];
  const end = PhiladelphiaCoordinates[index + 1];

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
        eaglesCamera(map, index + 1);
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

export { createEaglesFlightPath, eaglesCamera };
