document.addEventListener('DOMContentLoaded', function () {
    const username = 'Raghvendra-Verma';
    let currentPage = 1;
    let perPage = 10;
    let totalPages = 0;
    
    const userProfileContainer = document.getElementById('userProfile');
    const profileDetailsContainer = document.getElementById('profileDetails');
    const perPageSelect = document.getElementById('perPage');
    const loader = document.getElementById('loader');
    const repositoryList = document.getElementById('repositoryList');
    const paginationNumbersContainer = document.getElementById('paginationNumbers');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    //function to fetch user profile
    function fetchUserProfile() {
        // Replace with your actual GitHub API endpoint for user profile
        const profileUrl = `https://api.github.com/users/${username}`;
    
        fetch(profileUrl)
          .then(response => response.json())
          .then(data => {
            updateProfileUI(data);
          })
          .catch(error => {
            console.error('Error fetching user profile:', error);
          });
      }

    //function to update user profile 
    function updateProfileUI(userProfile) {
        userProfileContainer.innerHTML = '';
        profileDetailsContainer.innerHTML = '';
    
        const profilePhoto = document.createElement('div');
        profilePhoto.className = 'user-profile';
        profilePhoto.innerHTML = `<img src="${userProfile.avatar_url}" alt="Profile Photo">`;
        userProfileContainer.appendChild(profilePhoto);
    
        const profileDetails = document.createElement('div');
        profileDetails.className = 'profile-details';
        profileDetails.innerHTML = `
          <h2>${userProfile.name || userProfile.login}</h2>
          <p>${userProfile.bio || 'No bio available'}</p>
        `;
        profileDetailsContainer.appendChild(profileDetails);
      } 
      

     //fetchRepositories function
     https://github.com/Raghvendra-Verma
  
    function fetchRepositories() {
      loader.style.display = 'block';
  
      // Replace with your actual GitHub API endpoint
      const apiUrl = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${perPage}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          loader.style.display = 'none';
          updateUI(data);
          updatePagination(data.length);
        })
        .catch(error => {
          console.error('Error fetching repositories:', error);
          loader.style.display = 'none';
        });
    }
  
    //updateUI function

    function updateUI(repositories) {
      repositoryList.innerHTML = '';
  
      repositories.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.className = 'repository-item';
        const languages = repo.language ? repo.language.split(" ") : []; // Assuming languages are space-separated

        listItem.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description available'}</p>
          <p>${languages.map(language => `<button class="language-button">${language}</button>`).join('')}</p>
        `;
        repositoryList.appendChild(listItem);
      });
    }
  
    //updatePagination function

    function updatePagination(totalRepositories) {
      totalPages = Math.ceil(totalRepositories / perPage);
      paginationNumbersContainer.innerHTML = '';
  
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = 'pagination-number';
        button.dataset.page = i;
        button.addEventListener('click', handlePaginationClick);
        paginationNumbersContainer.appendChild(button);
      }

      // Update pagination buttons state
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
    }
  
     //handlePagination function

    function handlePaginationClick(event) {
      currentPage = parseInt(event.target.dataset.page);
      fetchRepositories();
    }

    paginationNumbersContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('pagination-number')) {
          handlePaginationClick(event);
        }
      });

    perPageSelect.addEventListener('change', function () {
        perPage = parseInt(perPageSelect.value);
        currentPage = 1;
        fetchRepositories();
      });

prevPageButton.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      fetchRepositories();
    }
  });
  
    nextPageButton.addEventListener('click', function () {
        if (currentPage < totalPages) {
          currentPage++;
          fetchRepositories();
        }
      });
  
    // Initial load
    fetchUserProfile();
    fetchRepositories();
  });
  