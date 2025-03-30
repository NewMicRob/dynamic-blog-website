const userTitle = document.getElementById('post-title');
const userMessage = document.getElementById('post-content');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const displayPost = document.getElementById('display-post');
const homeDisplayPost = document.getElementById('home-display-post');

document.addEventListener('DOMContentLoaded', loadDisPost);
submitBtn.addEventListener('click', saveDisplayPost);
clearBtn.addEventListener('click', clearStorage);

function saveDisplayPost() {
    if (userTitle.value && userMessage.value) {
        const post = `${userTitle.value}||${userMessage.value}`;
        let disPost = localStorage.getItem('post') || '';
        disPost += (disPost ? '|||' : '') + post;
        localStorage.setItem('post', disPost);
        displayPost.innerHTML = `${userTitle.value} ${userMessage.value}`;
        homeDisplayPost.innerHTML = `${userTitle.value} ${userMessage.value}`;
    } else {
        alert('Please fill out both fields');
    }
}

//takes the inputs and seperates them into 2 parts and displays them accordingly by title and message 
function loadDisPost() {
    const post = localStorage.getItem('post') || '';
    const posts = post.split('|||').filter(post => post);
    if(displayPost) {
        displayPost.innerHTML = posts.map(post => {
            const part = post.split('||');
            return `<section type='text' id='post'><h2>${part[0] || ''}</h2> <br> ${part[1] || ''}</section>`;
        }).join('<br>');
    }
}


//Clears storage is located on my name on the footer
function clearStorage() {
    localStorage.clear()
    userTitle.value = '';
    userMessage.value = '';
    displayPost.innerHTML = '';
    alert('cleared');
}