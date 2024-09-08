import stadiums from "../stadiums.js";

const teamLogos = {
  CIN: "./images/bengals.jpeg",
  NE: "./images/patriots.jpeg",
  KC: "./images/chiefs.jpeg",
  WSH: "./images/commanders.jpeg",
  CAR: "./images/panthers.jpeg",
  BAL: "./images/ravens.jpeg",
  NYG: "./images/giants.jpeg",
  CLE: "./images/browns.jpeg",
  PHI: "./images/eagles.jpeg",
  LV: "./images/raiders.jpeg",
  LAC: "./images/chargers.jpeg",
  PIT: "./images/steelers.jpeg",
  DAL: "./images/cowboys.jpeg",
  TEN: "./images/titans.jpeg",
  DEN: "./images/broncos.jpeg",
};

const schedule = [
  { week: 1, home: "CIN", away: "NE" },
  { week: 2, home: "KC", away: "CIN" },
  { week: 3, home: "CIN", away: "WSH" },
  { week: 4, home: "CAR", away: "CIN" },
  { week: 5, home: "CIN", away: "BAL" },
  { week: 6, home: "NYG", away: "CIN" },
  { week: 7, home: "CLE", away: "CIN" },
  { week: 8, home: "CIN", away: "PHI" },
  { week: 9, home: "CIN", away: "LV" },
  { week: 10, home: "BAL", away: "CIN" },
  { week: 11, home: "LAC", away: "CIN" },
  { week: 12, home: "CIN", away: "CIN" }, // BYE
  { week: 13, home: "CIN", away: "PIT" },
  { week: 14, home: "DAL", away: "CIN" },
  { week: 15, home: "TEN", away: "CIN" },
  { week: 16, home: "CIN", away: "CLE" },
  { week: 17, home: "CIN", away: "DEN" },
  { week: 18, home: "PIT", away: "CIN" },
];

const CincinnatiCoordinates = [
  stadiums.CIN,
  stadiums.KC,
  stadiums.CIN,
  stadiums.CAR,
  stadiums.CIN,
  stadiums.NYG,
  stadiums.CLE,
  stadiums.CIN,
  stadiums.CIN,
  stadiums.BAL,
  stadiums.LAC,
  stadiums.CIN, //BYE
  stadiums.CIN,
  stadiums.DAL,
  stadiums.TEN,
  stadiums.CIN,
  stadiums.CIN,
  stadiums.PIT,
];

function createBengalsFlightPath(map) {
  const flightPath = new google.maps.Polyline({
    path: CincinnatiCoordinates,
    geodesic: false,
    strokeColor: "#df3f00",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);

  return flightPath;
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
function bengalsCamera(map, index = 0) {
  if (index >= CincinnatiCoordinates.length) return;

  const start = CincinnatiCoordinates[index];
  const end = CincinnatiCoordinates[index + 1];
  const totalSteps = 300; // Number of steps for the animation
  const stepDuration = 1; // Time per step in milliseconds

  updateTeamLogos(index);
  updateWeek(index);

  let currentStep = 0;

  function moveCamera() {
    if (currentStep >= totalSteps) {
      setTimeout(() => {
        bengalsCamera(map, index + 1);
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

export { createBengalsFlightPath, bengalsCamera };
