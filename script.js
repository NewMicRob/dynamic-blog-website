// Makes the constants and gets them by the Id
const titleInput = document.getElementById('post-title');
const contentInput = document.getElementById('post-content');
const submitBtn = document.getElementById('submitBtn');
const clearButton = document.getElementById('clear-Btn');
const postsContainer = document.getElementById('posted');

//Stores inputs in dom and updates the dom with the new inputs
document.addEventListener('DOMContentLoaded', () => {
    const savedPosts = JSON.parse(getFromLocalStorage('posts')) || [];
    updateDOM(postsContainer, savedPosts);
    titleInput.value = '';
    contentInput.value = '';
});

//Submit button on click stores inputs combines them and gives them a uid and displays 
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const uniqueId = `post-${Date.now()}-${Math.floor(Math.random() * 100)}`;
    const newPost = { id: uniqueId, title: titleInput.value, content: contentInput.value };
    const curPosts = JSON.parse(getFromLocalStorage('posts')) || [];
    curPosts.push(newPost);
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
