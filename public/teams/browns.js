import stadiums from "../stadiums.js";

const teamLogos = {
  CLE: "./images/browns.jpeg",
  DAL: "./images/cowboys.jpeg",
  JAX: "./images/jaguars.jpeg",
  NYG: "./images/giants.jpeg",
  LV: "./images/raiders.jpeg",
  WSH: "./images/commanders.jpeg",
  PHI: "./images/eagles.jpeg",
  CIN: "./images/bengals.jpeg",
  BAL: "./images/ravens.jpeg",
  LAC: "./images/chargers.jpeg",
  NO: "./images/saints.jpeg",
  PIT: "./images/steelers.jpeg",
  DEN: "./images/broncos.jpeg",
  KC: "./images/chiefs.jpeg",
  MIA: "./images/dolphins.jpeg",
};

const schedule = [
  { week: 1, home: "CLE", away: "DAL" },
  { week: 2, home: "JAX", away: "CLE" },
  { week: 3, home: "CLE", away: "NYG" },
  { week: 4, home: "LV", away: "CLE" },
  { week: 5, home: "WSH", away: "CLE" },
  { week: 6, home: "PHI", away: "CLE" },
  { week: 7, home: "CLE", away: "CIN" },
  { week: 8, home: "CLE", away: "BAL" },
  { week: 9, home: "CLE", away: "LAC" },
  { week: 10, home: "CLE", away: "CLE" }, //BYE
  { week: 11, home: "NO", away: "CLE" },
  { week: 12, home: "CLE", away: "PIT" },
  { week: 13, home: "DEN", away: "CLE" },
  { week: 14, home: "PIT", away: "CLE" },
  { week: 15, home: "CLE", away: "KC" },
  { week: 16, home: "CIN", away: "CLE" },
  { week: 17, home: "CLE", away: "MIA" },
  { week: 18, home: "BAL", away: "CLE" },
];

const ClevelandCoordinates = [
  stadiums.CLE,
  stadiums.JAX,
  stadiums.CLE,
  stadiums.LV,
  stadiums.WSH,
  stadiums.PHI,
  stadiums.CLE,
  stadiums.CLE,
  stadiums.CLE,
  stadiums.CLE, //BYE
  stadiums.NO,
  stadiums.CLE,
  stadiums.DEN,
  stadiums.PIT,
  stadiums.CLE,
  stadiums.CIN,
  stadiums.CLE,
  stadiums.BAL,
];

function createBrownsFlightPath() {
  return new google.maps.Polyline({
    path: ClevelandCoordinates,
    geodesic: false,
    strokeColor: "#e34911",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
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

  homeImg.src = teamLogos[homeTeam] || "./images/default_home.jpg";
  awayImg.src = teamLogos[awayTeam] || "./images/default_away.jpg";

  console.log(`Home Image Set To: ${homeImg.src}`);
  console.log(`Away Image Set To: ${awayImg.src}`);
}

// Function to update the week display
function updateWeek(weekIndex) {
  const weekElement = document.querySelector(".week h2");
  weekElement.textContent = `Week ${weekIndex + 1}`; // Weeks start from 1
}

// Function to animate the camera along the flight path
function brownsCamera(map, index = 0) {
  if (index >= ClevelandCoordinates.length) return;

  const start = ClevelandCoordinates[index];
  const end = ClevelandCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        brownsCamera(map, index + 1);
      }, 1000); // Wait before moving to the next point
      return;
    }

    const lat = start.lat + (end.lat - start.lat) * (currentStep / totalSteps);
    const lng = start.lng + (end.lng - start.lng) * (currentStep / totalSteps);

    map.panTo(new google.maps.LatLng(lat, lng));
    map.setZoom(7); // Adjust the zoom level as needed

    currentStep++;
    setTimeout(moveCamera, stepDuration);
  }

  moveCamera();
}

export { createBrownsFlightPath, brownsCamera };
