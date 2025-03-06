// Get the current page URL
const currentPage = window.location.pathname.split("/").pop();

// Select all the links in the navbar
const navbarLinks = document.querySelectorAll('.nav-link');

// Loop through each link and check if it matches the current page
navbarLinks.forEach(link => {
  // If the link's href matches the current page, add the 'active' class
  if (link.href.includes(currentPage)) {
    link.classList.add('active');
  }
});

//newsapi
//thesportsdb 
news = {
  nkey: '05eacc42b6f212118cc8dc76f7d5f150',
  fetchNews: function () {
    fetch("https://gnews.io/api/v4/top-headlines?category=sports&lang=en&max=10&q=football%20soccer%20champions%20league&apikey=" + this.nkey)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.displayNews(data)
      })
  },
  displayNews: function (data) {
    // Getting containers
    const leftContainer = document.querySelector('.lnew');
    const firstDiv = document.querySelector('.first');
    const secondDiv = document.querySelector('.second');
    const thirdDiv = document.querySelector('.third');
    const fourthDiv = document.querySelector('.fourth');

    // // Clearing previous content
    leftContainer.innerHTML = " ";
    firstDiv.innerHTML = " ";
    secondDiv.innerHTML = " ";
    thirdDiv.innerHTML = " ";
    fourthDiv.innerHTML = " ";

    // Left news section
    const leftArticle = data.articles[1];

    const leftImage = document.createElement('img');
    leftImage.src = leftArticle.image || "placeholder.jpg";
    leftImage.alt = leftArticle.title;
    leftImage.href = leftArticle.url;
    const leftTitle = document.createElement('h2');
    leftTitle.textContent = leftArticle.title;

    const leftDesc = document.createElement('p');
    leftDesc.textContent = leftArticle.description || "No description available.";

    const leftButton = document.createElement('a');
    leftButton.textContent = "Read more";
    leftButton.classList.add('lButton');
    leftButton.href = leftArticle.url;
    leftButton.target = "_blank";

    leftContainer.appendChild(leftImage);
    leftContainer.appendChild(leftTitle);
    leftContainer.appendChild(leftDesc);
    leftContainer.appendChild(leftButton);
    // Right news section
    const rightDivs = [firstDiv, secondDiv, thirdDiv, fourthDiv];

    for (let i = 2; i <= 5; i++) {
      const article = data.articles[i];
      const div = rightDivs[i - 2];
      const content = document.createElement('div')
      const image = document.createElement('img');
      image.src = article.image || "placeholder.jpg";
      image.alt = article.title;

      const title = document.createElement('h3');
      title.textContent = article.title;

      const desc = document.createElement('p');
      desc.textContent = article.description || "No description available.";

      const button = document.createElement('a');
      button.textContent = "Read more";
      button.classList.add('rButton');
      button.href = article.url;
      button.target = "_blank";

      content.appendChild(image);
      content.appendChild(title);
      content.appendChild(desc);
      div.appendChild(content);
      div.appendChild(button);

    }
  }
}
if (window.location.pathname.endsWith('/home')) {
  news.fetchNews();
}




// leages api: https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueId}&s=${season}
// matches api: https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=${team1}_vs_${team2}
// teams api: https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamName}
matches = {
  fetchMatches: function (team1, team2) {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=' + team1 + '_vs_' + team2)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.displayMatches(data)
      })
  },
  displayMatches: function (data) {
    const matchesForm = document.querySelector('#matchesForm');
    const matchSection = document.querySelector('#results');
    const matchContainer = document.querySelector('.results');
    // Clear any existing error message before processing new results
    const existingErrorMessage = matchesForm.querySelector('p');
    if (existingErrorMessage) {
      matchesForm.removeChild(existingErrorMessage);
    }


    if (!data.event || data.event.length === 0) {

      errorMessage = document.createElement('p');
      errorMessage.textContent = "No matches found.";
      errorMessage.style.color = "#f87069";
      matchesForm.appendChild(errorMessage);

      return;
    }

    matchContainer.innerHTML = "";
    matchSection.style.display = "block";
    matchContainer.style.display = "flex";
    setTimeout(() => {
      window.scrollBy({ top: 600, left: 0, behavior: "smooth" });
    }, 500);

    data.event.slice(0, 10).forEach(match => {
      const matchDiv = document.createElement('div');
      matchDiv.classList.add('result');
      const firstTeam = document.createElement('div');
      const secondTeam = document.createElement('div');
      const matchInfo = document.createElement('div');
      const matchScore = document.createElement('div');

      firstTeam.classList.add('firstTeam');
      secondTeam.classList.add('secondTeam');
      matchInfo.classList.add('matchInfo');
      matchScore.classList.add('matchScore');

      const firstTeamName = document.createElement('h3');
      const secondTeamName = document.createElement('h3');

      const firstTeamScore = document.createElement('h2');
      const secondTeamScore = document.createElement('h2');
      const scoreDash = document.createElement('h3');


      const firstTeamLogo = document.createElement('img');
      const secondTeamLogo = document.createElement('img');

      const leagueName = document.createElement('h3');
      const matchDate = document.createElement('h3');
      const matchSeason = document.createElement('h4');


      firstTeamLogo.src = match.strHomeTeamBadge || 'assets/default-club-logo.png';
      secondTeamLogo.src = match.strAwayTeamBadge || 'assets/default-club-logo.png';
      firstTeamName.textContent = match.strHomeTeam;
      secondTeamName.textContent = match.strAwayTeam;
      firstTeamScore.textContent = match.intHomeScore;
      secondTeamScore.textContent = match.intAwayScore;
      scoreDash.textContent = "-";
      leagueName.textContent = match.strLeague;
      matchDate.textContent = match.dateEvent;
      matchSeason.textContent = match.strSeason;

      firstTeam.appendChild(firstTeamLogo);
      firstTeam.appendChild(firstTeamName);
      secondTeam.appendChild(secondTeamLogo);
      secondTeam.appendChild(secondTeamName);
      matchInfo.appendChild(leagueName);
      matchInfo.appendChild(matchSeason);
      matchInfo.appendChild(matchScore);
      matchInfo.appendChild(matchDate);
      matchScore.appendChild(firstTeamScore);
      matchScore.appendChild(scoreDash);
      matchScore.appendChild(secondTeamScore);
      matchDiv.appendChild(firstTeam);
      matchDiv.appendChild(matchInfo);
      matchDiv.appendChild(secondTeam);
      matchContainer.appendChild(matchDiv);

    })
  }
}
if (window.location.pathname.endsWith('/matches')) {
  const matchesForm = document.querySelector('#matchesForm');
  matchesForm.addEventListener('submit', event => {
    event.preventDefault();
    const team1 = matchesForm.team1;
    const team2 = matchesForm.team2;
    matches.fetchMatches(team1.value, team2.value);
    matchesForm.reset();
  })
}



//This function is written to get the current season
const getCurrentSeason = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

  // Most leagues run from August to May, so if the current month is August or later, the season is the current year + 1
  if (currentMonth >= 8) {
    return `${currentYear}-${currentYear + 1}`;
  } else {
    return `${currentYear - 1}-${currentYear}`;
  }
};

const leagues = {
  fetchLeagues: function (leagueId, season) {
    const tableBody = document.querySelector('#table-body');
    tableBody.innerHTML = "<tr><td colspan='11'>Loading...</td></tr>"; // Show loading message

    let url = `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueId}`;
    if (season) {
      url += `&s=${season}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        leagues.displayLeagues(data);
      })
      .catch(error => {
        console.error('Error fetching league data:', error);
        tableBody.innerHTML = "<tr><td colspan='11'>Failed to load data. Please try again.</td></tr>"; // Show error message
      });
  },
  displayLeagues: function (data) {
    const tableBody = document.querySelector('#table-body');
    tableBody.innerHTML = "";

    // Check that data.table is an array of objects
    if (!data || !Array.isArray(data.table)) {
      console.error('Invalid data format:', data);
      return;
    }

    data.table.forEach(team => {
      const row = `
        <tr>
          <th>${team.intRank}</th>
          <td><img src="${team.strBadge}" class="team-logo" alt="${team.strTeam}" style="width: 30px; height: 30px; cursor:pointer"></td>
          <td><button class="fav-btn"><img src="assets/heart.png" width="30px" height="30px"></button></td>
          <td>${team.strTeam}</td>
          <td>${team.intPlayed}</td>
          <td>${team.intWin}</td>
          <td>${team.intDraw}</td>
          <td>${team.intLoss}</td>
          <td class="hide-on-mobile">${team.intGoalsFor}</td>
          <td class="hide-on-mobile">${team.intGoalsAgainst}</td>
          <td class="hide-on-mobile">${team.intGoalDifference}</td>
          <td>${team.intPoints}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Select only logos within the table to avoid conflicts
    const logos = tableBody.querySelectorAll('.team-logo');

    // Add event listener to each favorite button
    const favButtons = tableBody.querySelectorAll(".fav-btn");
    favButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const teamName = logos[index].alt;
        const teamLogo = logos[index].src;
        leagues.addToFavorites(teamName, teamLogo);
      });
    });

    // Add event listeners to logos for modal functionality
    logos.forEach(logo => {
      logo.addEventListener('click', () => {
        const teamName = logo.getAttribute('alt');
        const logoUrl = logo.getAttribute('src');
        leagues.showModal(logoUrl, teamName);
      });
    });
  },
  showModal: function (logoUrl, teamName) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalLogo = document.getElementById('modal-logo');
    const addToFavoritesButton = document.getElementById('add-to-favorites');
    const closeModalButton = document.getElementById('close-modal');

    // Set the modal logo
    modalLogo.src = logoUrl;
    modalOverlay.style.display = 'flex';

    // Add to Favorites action inside modal
    addToFavoritesButton.onclick = () => {
      leagues.addToFavorites(teamName, logoUrl);
    };

    // Close the modal
    closeModalButton.onclick = () => {
      modalOverlay.style.display = 'none';
    };
  },
  addToFavorites: function (teamName, teamLogo) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the team is already in favorites
    if (!favorites.some(team => team.teamName === teamName)) {
      favorites.push({ teamName, teamLogo });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.showAlert(`${teamName} added to favorites!`);
    } else {
      this.showAlert(`${teamName} is already in your favorites!`);
    }
  },
  showAlert: function (message) {
    const alertBox = document.getElementById('customAlert');
    document.getElementById('alertMessage').innerText = message;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.opacity = '1', 10);
    setTimeout(() => this.closeAlert(), 1500);
  },
  closeAlert: function () {
    const alertBox = document.getElementById('customAlert');
    alertBox.style.opacity = '0';
    setTimeout(() => alertBox.style.display = 'none', 500);
  },
  displayFavorites: function () {
    const favoritesPage = document.getElementById('favorites');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorite-clubs');

    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
      favoritesContainer.innerHTML = 'Add teams to favorite to see them here';
      favoritesPage.style.height = '80vh'
    }

    favorites.forEach(team => {
      const teamCard = document.createElement('div');
      teamCard.classList.add('team-card');
      const teamLogo = document.createElement('img');
      teamLogo.src = team.teamLogo;
      teamLogo.alt = team.teamName;
      teamLogo.classList.add('team-logo');
      const teamNameElem = document.createElement('h3');
      teamNameElem.textContent = team.teamName;
      const cardButton = document.createElement('button');
      cardButton.innerHTML = "Remove";

      cardButton.addEventListener("click", function () {
        favorites = favorites.filter(element => element.teamName !== team.teamName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        leagues.displayFavorites();
      });

      favoritesPage.style.height = 'auto';
      teamCard.appendChild(teamLogo);
      teamCard.appendChild(teamNameElem);
      teamCard.appendChild(cardButton);

      favoritesContainer.appendChild(teamCard);
    });
  }
};



if (window.location.pathname.endsWith('/tables')) {
  const leagueSelection = document.querySelector('#choose-league');
  const prevSeasonButton = document.querySelector('#prev-season');
  const nextSeasonButton = document.querySelector('#next-season');
  const leagueSeason = document.querySelector('#league-season');

  let currentSeason = getCurrentSeason(); // Initialize with the current season

  // Function to update the season display and fetch data
  const updateSeason = (newSeason) => {
    currentSeason = newSeason;
    leagueSeason.textContent = currentSeason; // Update the displayed season
    const leagueId = leagueSelection.value;
    leagues.fetchLeagues(leagueId, newSeason); // Fetch data for the new season
  };

  // Event listener for league selection change
  leagueSelection.addEventListener('change', event => {
    const leagueId = event.target.value;
    leagues.fetchLeagues(leagueId, currentSeason); // Fetch data for the selected league and current season
  });

  // Event listener for previous season button
  prevSeasonButton.addEventListener('click', (e) => {
    e.preventDefault();
    const [startYear, endYear] = currentSeason.split('-').map(Number); // Split the season into years
    const newSeason = `${startYear - 1}-${endYear - 1}`; // Decrease both years by 1
    updateSeason(newSeason); // Update the season and fetch data
  });

  // Event listener for next season button
  nextSeasonButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentSeason === getCurrentSeason()) {
      return;
    }
    const [startYear, endYear] = currentSeason.split('-').map(Number); // Split the season into years
    const newSeason = `${startYear + 1}-${endYear + 1}`; // Increase both years by 1
    updateSeason(newSeason); // Update the season and fetch data
  });

  // Load a default league on page load
  leagueSeason.textContent = currentSeason; // Set the initial season display
  leagues.fetchLeagues(4335, currentSeason); // Fetch data for La Liga (ID: 4335) and the current season
}


if (window.location.pathname.endsWith('/favorites')) {
  leagues.displayFavorites();
}


// Activating email form
function sendMail(e) {
  e.preventDefault();
  let parmameters = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  }
  emailjs.send('FootyZone', 'template_dh2ra9i', parmameters)
    .then(() => {
      alert('Email Sent!');
      e.target.form.reset();
    })
}