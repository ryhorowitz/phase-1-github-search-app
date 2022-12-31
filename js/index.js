const userURL = 'https://api.github.com/search/users?q='

document.addEventListener('DOMContentLoaded', () => {
  // The index.html file has a form with a search input. When the form is submitted, it should take the value
  const searchForm = document.querySelector('#github-form')
  const username = document.querySelector('#search')
  const userList = document.querySelector('#user-list')

  function fetchUsers() {

    fetch(userURL + username.value)
      .then(res => res.json())
      .then(users => {
        appendUsers(users)
      })
      .catch(e => console.error(e.message))
  }

  function appendUsers(users) {
    const { items } = users
    items.forEach(profile => {
      const { login, avatar_url, html_url, repos_url } = profile

      const userLi = document.createElement('li')
      userLi.id = login
      userLi.innerHTML = `
      <div>
      <h2>${login}</h2>
      <h5>${html_url}</h5>
      <img src='${avatar_url}' width="100" height="100">
    </div>`
      // console.log(userLi)
      userList.appendChild(userLi)
      // Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.    
      userLi.addEventListener('click', () => {
        console.log('clicked')
        //get req to 
        fetch(repos_url)
        .then(res => res.json())
        .then(repos => {
          //create and orderedList
          const repoList = document.createElement('ol')
          repoList.id = `${login}-repos` 
          userLi.append(repoList)
          console.log(repos) //arr of objs, each obj has a name prop
          repos.forEach( repo => {
            const { name, url, stargazers_count } = repo
            console.log( name, url, stargazers_count)
            //add li
            const repoLi = document.createElement('li')
            repoLi.id = name
            repoLi.innerHTML = `
            <div>
              <p>Repo Name: ${name}   Stargazers: ${stargazers_count}</p>
              <p>url: ${url}</p>
            </div>`
            repoList.appendChild(repoLi)

          })
        })
        .catch(e => console.error(e.message))
    })
    })
  }

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchUsers()
  })


})