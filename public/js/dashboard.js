const logout = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
        console.log('logged out')
    } else {
        alert(response.statusText);
        console.log('still logged in')
    }
};

if (document.getElementById('logout')) {
    document.getElementById('logout').addEventListener('click', logout);
}

const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-content').value.trim();


    if (title && content) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
}


const delButtonHandler = async (event) => {

    if (event.target.hasAttribute('data-id')) {
        // need to access the id of the post. seems to be the common theme throughout this project kms :)
        const id = event.target.getAttribute('data-id');
        console.log( id);
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

// const upButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');


//         const response = await fetch(`/api/projects/${id}`, {
//             method: 'PUT',
//         });
//     }
// }

const newCommentHandler = async (event) => {

    event.preventDefault();

    const comment = document.querySelector('#comment-content').value.trim();


    const post_id = document.querySelector('#postId').value;
    console.log("in dashboard js" + " " + post_id)
    if (comment) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to leave comment');
        }
    }
}

const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

if (document.querySelector('.login-form')) {
    document.querySelector('.login-form')
        .addEventListener('submit', loginFormHandler);

    document
        .querySelector('.signup-form')
        .addEventListener('submit', signupFormHandler);

}
if (document.querySelector('.new-post-form')) {
    document
        .querySelector('.new-post-form')
        .addEventListener('submit', newFormHandler);
}
if (document.querySelector('.post-list')) {
    document
        .querySelector('.post-list')
        .addEventListener('click', delButtonHandler);
}
if (document.querySelector('.new-comment-form')) {
    console.log("WORKING")
    document
        .querySelector('.new-comment-form')
        .addEventListener('submit', newCommentHandler);
}
