//this script uses JSONPlaceholder: https://jsonplaceholder.typicode.com/
//tt demonstrates using both fetch() and XMLHttpRequest to get data

document.getElementById('loadUsersBtn').addEventListener('click', loadUsers);
document.getElementById('loadPostsBtn').addEventListener('click', loadPosts);

//fetch() example: get users from JSONPlaceholder
function loadUsers() {
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = ''; //clear previous content

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) throw new Error("Failed to fetch users.");
        return response.json();
    })
    .then(users => {
        users.forEach(user => {
            const div = document.createElement('div');
            div.className = 'user';
            div.innerHTML = `
                <strong>${user.name}</strong><br/>
                <em>${user.email}</em><br/>
                ${user.address.city}, ${user.address.street}
            `;
            usersContainer.appendChild(div);
        });
    })
    .catch(err => {
        usersContainer.innerHTML = `<p>Error loading users: ${err.message}</p>`;
    });
}

//XMLHttpRequest example: get posts for a specific user ID (from JSONPlaceholder)
function loadPosts() {
    const userId = document.getElementById('userIdInput').value;
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; //clear previous content

    if (!userId || userId < 1 || userId > 10) {
        postsContainer.innerHTML = `<p>Please enter a valid user ID (1-10).</p>`;
        return;
    }
        
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/posts?userId=${userId}`, true);
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            const posts = JSON.parse(xhr.responseText);
            posts.forEach(post => {
                const div = document.createElement('div');
                div.className = 'post';
                div.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p>`;
                postsContainer.appendChild(div);
            });
        } else {
            postsContainer.innerHTML = `<p>Error loading posts: ${xhr.statusText}</p>`;
        }
    };

    xhr.onerror = function () {
        postsContainer.innerHTML = `<p>Network error occurred while loading posts.</p>`;
    };

    xhr.send();
}

/*
  fetch() vs. XMLHttpRequest:

  fetch() is generally better to use, as it is more modern and the promise chain is extremely useful for parsing errors.
  However, XMLHttpRequests are older, so if the system being worked on doesn't have access to fetch() for some reason, then XMLHttpRequests should do the job.
*/
