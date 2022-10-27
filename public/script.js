const getUsers = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await res.json();
  return users
}

const getPosts = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  const posts = await res.json()
  return posts
}

const loadData = async () => {
  let userData = "";
  let postData = "";
  let selectedUserId;
  let selectedUserName;
  const tableBody = document.getElementById('table_data');
  const postsContainer = document.getElementById('posts_container');

  const users = await getUsers();

  for(let user of users) {
  userData += `<tr id="${user.id}"><td>${user.id}</td><td>${user.name}</td><td>${user.username}</td></tr>`;
  tableBody.innerHTML = userData;
  }

  const displayPosts = (posts) => {
    postData = '';
    posts?.map((post) => {
      postData += `<div class="card mb-3" ><div class="card-title"><h3>${post.title}</h3></div><div class="card-body">${post.body}</div></div>`
    })
    postsContainer.innerHTML = postData;
  }

  const handleClick = async (e) => {
    const element = e.target.parentNode;
    const parent = element.parentNode;
    selectedUserId = element.id;
    selectedUserName = ""
    const posts = await getPosts(selectedUserId);
    const children = [...parent.children];
    const siblings =  children.filter(child => child !== element);

    element.classList.add('highlight');
    for (let sibling of siblings) {
      sibling.classList.remove('highlight')
    }

    for (let user of users) {
      console.log(user.id == selectedUserId)
      if (user.id == selectedUserId) {
        selectedUserName = user.name
      }
    }
    displayPosts(posts);
  }

  const trs = document.getElementsByTagName("tr");

  for (let tr of trs) {
    tr.addEventListener("click", handleClick);
  }

}

loadData()
