import stadiums from "../stadiums.js";

// Map stadiums to their respective team logos
const teamLogos = {
  PIT: "./images/steelers.jpeg",
  ATL: "./images/falcons.jpeg",
  DEN: "./images/broncos.jpeg",
  LAC: "./images/chargers.jpeg",
  IND: "./images/colts.jpeg",
  DAL: "./images/cowboys.jpeg",
  LV: "./images/raiders.jpeg",
  NYJ: "./images/jets.jpeg",
  NYG: "./images/giants.jpeg",
  WSH: "./images/commanders.jpeg",
  BAL: "./images/ravens.jpeg",
  CLE: "./images/browns.jpeg",
  CIN: "./images/bengals.jpeg",
  PHI: "./images/eagles.jpeg",
  KC: "./images/chiefs.jpeg",
};

const schedule = [
  { week: 1, home: "ATL", away: "PIT" },
  { week: 2, home: "DEN", away: "PIT" },
  { week: 3, home: "PIT", away: "LAC" },
  { week: 4, home: "IND", away: "PIT" },
  { week: 5, home: "PIT", away: "DAL" },
  { week: 6, home: "LV", away: "PIT" },
  { week: 7, home: "PIT", away: "NYJ" },
  { week: 8, home: "PIT", away: "NYG" },
  { week: 9, home: "PIT", away: "PIT" }, //BYE
  { week: 10, home: "WSH", away: "PIT" },
  { week: 11, home: "PIT", away: "BAL" },
  { week: 12, home: "CLE", away: "PIT" },
  { week: 13, home: "CIN", away: "PIT" },
  { week: 14, home: "PIT", away: "CLE" },
  { week: 15, home: "PHI", away: "PIT" },
  { week: 16, home: "BAL", away: "PIT" },
  { week: 17, home: "PIT", away: "KC" },
  { week: 18, home: "PIT", away: "CIN" },
];

const PittsburghCoordinates = [
  stadiums.ATL,
  stadiums.DEN,
  stadiums.PIT,
  stadiums.IND,
  stadiums.PIT,
  stadiums.LV,
  stadiums.PIT,
  stadiums.PIT,
  stadiums.PIT, // BYE
  stadiums.WSH,
  stadiums.PIT,
  stadiums.CLE,
  stadiums.CIN,
  stadiums.PIT,
  stadiums.PHI,
  stadiums.BAL,
  stadiums.PIT,
  stadiums.PIT,
];

function createSteelersFlightPath() {
  return new google.maps.Polyline({
    path: PittsburghCoordinates,
    geodesic: false,
    strokeColor: "#e7a81e",
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
function steelersCamera(map, index = 0) {
  if (index >= PittsburghCoordinates.length) return;

  const start = PittsburghCoordinates[index];
  const end = PittsburghCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        steelersCamera(map, index + 1);
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

export { createSteelersFlightPath, steelersCamera };
