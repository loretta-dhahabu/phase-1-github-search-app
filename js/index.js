const form = document.querySelector("#github-form");
const searchName = document.getElementById( "search" );
const userContainer = document.getElementById("user-list");
const repoList = document.getElementById( "repos-list" );

document.addEventListener( "DOMContentLoaded", () =>
{
    const form = document.querySelector( "#github-form" );
    form.addEventListener( "submit", ( eventFuction ) =>
    {
        eventFuction.preventDefault();
        const searchName = document.getElementById( "search" ).value;
        searchUserProfiles( searchName );
        form.reset();
    })
} )

// //Create GET request to API based on user input
function searchUserProfiles ( searchName )
{
    fetch( `https://api.github.com/search/users?q=${searchName}`,
    {
        method: "GET",
        headers: {
            Accept: "application / vnd.github.v3 + json",
        },
    } )
        .then( ( response ) => response.json() )
        .then( ( data ) =>
        {
            const allData = data.message;
            console.log( allData );
            allData.forEach( ( user ) =>
            {
                userList( user );
            } );
        } );
    
}
 //list of users

function userList(user) {
  const userContainer = document.querySelector("#user-list");
     console.log(user);
     const userCard = document.createElement("li");
     userCard.innerHTML = `<h2>${user.login}</h2> <img src = '${user.avatar_url}' /> <p><a href = '${user.url}'>GitHub Profile</a></P`;
     //Create listener on all user names
     userCard.querySelector("h2").addEventListener("click", () => {
       fetchUserRepos(user.login);
       //Clear out user list except selected
       document.getElementById("user-list").innerHTML = "";
       renderUser(user);
     });

     document.getElementById("user-list").appendChild(userCard);
   
}
//GET request of the selected user
function userRepos(userName) {
  fetch(`https://api.github.com/users/${userName}/repos`, {
    method: "GET",
    headers: {
    //   "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
      .then( ( data ) =>
      {
          data.forEach( ( repo ) =>
      {
        reposList(repo);
      });
    });
}

function reposList(repo) {
  const reposContainer = document.querySelector("#repos-list");
  const repos = document.createElement("li");
  const url = document.createElement("a");
  url.innerText = repo.html_url;
  url.href = repo.html_url;
  repos.append(url);
  reposContainer.appendChild( repos );
    console.log( repo );
}

   

   // function renderRepo(repo) {
   //   //Clear out user list except user

   //   console.log(repo);
   //   const repoCard = document.createElement("li");
   //   repoCard.innerHTML = `
   //         <h2><a href ='${repo.git_url}'>Repository Name: ${repo.name}</a></h2>
   //         <h3>Languages Used: ${repo.language}</h3>
   //         `;

   //document.getElementById("repos-list").appendChild(repoCard);
 


