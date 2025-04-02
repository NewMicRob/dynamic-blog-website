// Makes the constants and gets them by the Id
const titleInput = document.getElementById('post-title');
const contentInput = document.getElementById('post-content');
const submitBtn = document.getElementById('submitBtn');
const upSubmitBtn = document.getElementById('upSubmitBtn');
const clearButton = document.getElementById('clearBtn');
const postsContainer = document.getElementById('posted');
const singlePost = document.getElementById('postpost')

//Stores inputs in dom and updates the dom with the new inputs
document.addEventListener('DOMContentLoaded', () => {
    const savedPosts = JSON.parse(getFromLocalStorage('posts')) || [];
    updateDOM(postsContainer, savedPosts);
    if (savedPosts.length > 0) {
        singlePost.innerHTML = `
            <h3>${savedPosts[0].title}</h3>
            <p>${savedPosts[0].content}</p>
        `;
    }
    titleInput.value = '';
    contentInput.value = '';
});

//save button with validation saves the inputs to the dom and combines them then displays them on index page
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (!titleInput.value.trim() || !contentInput.value.trim()) {
        alert('Both title and content are required.');
        return;
    } else {
        alert('Submitted');
    }
    const uniqueId = `post-${Date.now()}-${Math.floor(Math.random() * 100)}`;
    const newPost = { id: uniqueId, title: titleInput.value.trim(), content: contentInput.value.trim() };
    const curPosts = JSON.parse(getFromLocalStorage('posts')) || [];
    curPosts.unshift(newPost);
    saveToLocalStorage('posts', JSON.stringify(curPosts));
    updateDOM(postsContainer, curPosts);
    titleInput.value = '';
    contentInput.value = '';
});

//Clear button on click deletes stored inputs
clearButton.addEventListener('click', () =>{
    localStorage.removeItem('posts');
    updateDOM(postsContainer, []);
    alert('Deleted');
});

//saves the title/content and its value to the storage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
//Gets the title/content and its value form the storage
function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

//Keeps the dom up to date
function updateDOM(element, posts) {
    if (element) {
        element.innerHTML = posts.map(post => `
            <section id="${post.id}">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            </section>
        `).join('');
    }
}

//supposed to get the latest post save the edited post and replace the one in the dom and display the updated post on index
singlePost.addEventListener('input', () => {
    const savedPosts = JSON.parse(getFromLocalStorage('posts')) || [];
    if (savedPosts.length > 0) {
        savedPosts[0].title = singlePost.querySelector('h3').innerText;
        savedPosts[0].content = singlePost.querySelector('p').innerText;
        saveToLocalStorage('posts', JSON.stringify(savedPosts));
    }
});

upSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const savedPosts = JSON.parse(getFromLocalStorage('posts')) || [];
    if (savedPosts.length > 0) {
        const updatedTitle = singlePost.querySelector('h3').innerText.trim();
        const updatedContent = singlePost.querySelector('p').innerText.trim();
        if (!updatedTitle || !updatedContent) {
            alert('Both title and content are required.');
            return;
        }
        savedPosts[0].title = updatedTitle;
        savedPosts[0].content = updatedContent;
        alert('Post Updated');
        saveToLocalStorage('posts', JSON.stringify(savedPosts));
        updateDOM(postsContainer, savedPosts);
        alert('Post updated successfully!');
    } else {
        alert('No posts available to update.');
    }
});

/*
// post.hmtl needs to get(retrieve)the original post from index by its id(randomly generated) then Needs to update using PUT(update), on click event to delete the original post by its id and post.htmls post needs to display where the old id was taken from.
function displayPost(post) {
    const rePost = document.getElementById(`${post.id}`);
    rePost.innerHTML = '';

    post.posts.forEach(singlePost => {
        const posted = document.createElement('div');
        posted.innerHTML = `
            <h3>${singlePost.title}</h3>
            <p>${singlePost.content}</p>
        `;
        rePost.appendChild(posted);
    });
}

// Add click event to navigate to post.html with the selected post ID
postsContainer.addEventListener('click', (event) => {
    const postElement = event.target.closest('section');
    if (postElement) {
        const postId = postElement.id;
        window.location.href = `post.html?id=${postId}`;
    }
});

//Delete Button
function handleDeleteButtonClick(event) {
    const postIdToDelete = event.target.dataset.postId;
    const savedPosts = JSON.parse(getFromLocalStorage('posts')) || [];

    const newPosts = savedPosts.filter(p => p.id !== postIdToDelete); //creates new array without the deleted post.

    saveToLocalStorage('posts', JSON.stringify(newPosts));
    updateDOM(postsContainer, newPosts);
    displayLatestPost(newPosts);

    alert('Post Deleted');

}
*/