const textArea = document.getElementById('text-area');
const submitButton = document.getElementById('submit-button');
const postList = document.getElementById('post-list');
let postCount = 0;
let isEditing = false;

document.cookie = "myCookie=myValue; SameSite=None; Secure";
document.cookie = "myCookie=myValue; SameSite=Strict";

window.addEventListener('load', () => {
    let postId = 0;

    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    for (const post of savedPosts) {
        if (!post.deleted) {
            createPostElement(post.text);
        }
    }

    if (textArea) {
        if (textArea.value.trim() === '') {
            textArea.value = 'Your text here';
            textArea.classList.remove('textarea-filled');
            textArea.classList.add('textarea-default');
        }
    } else {
        console.error('Textarea element not found.');
    }

    textArea.addEventListener('input', () => {
        const postText = textArea.value.trim();

        if (postText === '') {
            textArea.classList.remove('textarea-filled');
            textArea.classList.add('textarea-default');
        } else {
            textArea.classList.remove('textarea-default');
            textArea.classList.add('textarea-filled');
        }
    });

    textArea.addEventListener('focus', () => {
        if (textArea.value === 'Your text here') {
            textArea.value = '';
            textArea.classList.remove('textarea-default');
            textArea.classList.add('textarea-filled');
        }
    });

    textArea.addEventListener('blur', () => {
        if (textArea.value === '') {
            textArea.value = 'Your text here';
            textArea.classList.remove('textarea-filled');
            textArea.classList.add('textarea-default');
        }
    });

    submitButton.addEventListener('click', () => {
        const postText = textArea.value;

        if (postText.trim() === '' || postText === 'Your text here') {
            alert('Post cannot be empty!');
            return;
        }

        postId++;

        const post = { text: postText, id: `post-${postId}` };
        savePostToLocalStorage(post.id, postText);
        createPostElement(postText, post.id);

        textArea.value = 'Your text here';
        textArea.classList.remove('textarea-filled');
        textArea.classList.add('textarea-default');

        window.scrollTo(0, document.body.scrollHeight);

        showToast('Post added');

        const updatedSavedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    });
});


function showToast(message) {
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    const toastBody = document.querySelector('.toast-body');
    toastBody.textContent = message;
    toast.show();
}

function alertWithHeader(header, message) {
    alert(`${header}\n\n${message}`);
}

function createPost() {
    const postText = textArea.value.trim();

    if (postText === '' || postText === 'Your text here') {
        alert('Post cannot be empty!');
        return;
    }

    const post = { text: postText, deleted: false };
    savePostToLocalStorage(postId, text);
    createPostElement(postText);

    textArea.value = '';

    window.scrollTo(0, document.body.scrollHeight);

    showToast('Post added');

    const updatedSavedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const nonDeletedPosts = updatedSavedPosts.filter(post => !post.deleted);
    localStorage.setItem('posts', JSON.stringify(nonDeletedPosts));
}

function savePostToLocalStorage(postId, text) {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    savedPosts.push({ id: postId, text });
    localStorage.setItem('posts', JSON.stringify(savedPosts));
}

function createPostElement(text) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('row', 'posts');

    const postId = `post-${postCount}`;

    postCount++;

    postContainer.id = postId;

    const postContentWrapper = document.createElement('div');
    postContentWrapper.style.display = 'flex';
    postContentWrapper.style.paddingLeft = '20px';
    postContentWrapper.style.paddingRight = '20px';

    const avatarCol = document.createElement('div');
    avatarCol.classList.add('col-2', 'avatar-col');

    const avatarImg = document.createElement('img');
    avatarImg.src = 'img/avatar.png';
    avatarImg.width = 40;
    avatarImg.height = 40;
    avatarCol.appendChild(avatarImg);

    const contentCol = document.createElement('div');
    contentCol.classList.add('col-10', 'content-col');

    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const creationDateTime = `${day}.${month}.${year} - ${hours}:${minutes}`;

    const creationDateElement = document.createElement('div');
    creationDateElement.classList.add('creation-date');
    creationDateElement.textContent = creationDateTime;

    const postTextElement = document.createElement('div');
    postTextElement.classList.add('post-text');
    postTextElement.innerHTML = `
    <span style="font: medium 14px Roboto; color: #9B59B6;">Burak ÜNAL</span>` + " " + text;

    contentCol.appendChild(avatarCol);
    contentCol.appendChild(creationDateElement);
    contentCol.appendChild(postTextElement);

    const lineElement = document.createElement('div');
    lineElement.classList.add('line');

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('buttons-wrapper');
    buttonsWrapper.style.height = '20px';

    let likeCount = Math.floor(Math.random() * 100) + 1;
    let dislikeCount = Math.floor(Math.random() * 100) + 1;
    
    const likeButton = document.createElement('div');
    likeButton.classList.add('like-button');
    likeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#C1C8CE" class="feather-thumbs-up">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"></path>
        </svg>
        <span style="font: normal normal normal 14px/16px Roboto; letter-spacing: 0px; color: #C1C8CE;">${likeCount}</span>`;

    const dislikeButton = document.createElement('div');
    dislikeButton.classList.add('dislike-button');
    dislikeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#C1C8CE" class="feather-thumbs-down">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3z"></path>
        </svg>
        <span style="font: normal normal normal 14px/16px Roboto; letter-spacing: 0px; color: #C1C8CE;">${dislikeCount}</span>`;

    let likeClicked = false;
    let dislikeClicked = false;

    likeButton.addEventListener('click', () => {
        if (!likeClicked) {
            likeCount++;
            likeClicked = true;
            if (dislikeClicked) {
                dislikeCount--;
                dislikeClicked = false;
            }
        } else {
            likeCount--;
            likeClicked = false;
        }

        updateLikeDislikeCounts();
        updateLikeDislikeColors();
    });

    dislikeButton.addEventListener('click', () => {
        if (!dislikeClicked) {
            dislikeCount++;
            dislikeClicked = true;
            if (likeClicked) {
                likeCount--;
                likeClicked = false;
            }
        } else {
            dislikeCount--;
            dislikeClicked = false;
        }

        updateLikeDislikeCounts();
        updateLikeDislikeColors();
    });

    function updateLikeDislikeColors() {
        const likeFill = likeClicked ? "#9B59B6" : "#C1C8CE";
        const dislikeFill = dislikeClicked ? "#34495E" : "#C1C8CE";

        likeButton.querySelector('svg').style.fill = likeFill;
        likeButton.querySelector('span').style.color = likeFill;

        dislikeButton.querySelector('svg').style.fill = dislikeFill;
        dislikeButton.querySelector('span').style.color = dislikeFill;
    }

    function updateLikeDislikeCounts() {
        likeButton.querySelector('span').textContent = likeCount;
        dislikeButton.querySelector('span').textContent = dislikeCount;
    }
    
    const editButton = document.createElement('div');
    editButton.classList.add('edit-button');
    editButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34495E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>`;

    editButton.addEventListener('click', () => {
        if (isEditing) {
            return;
        }
    
        isEditing = true;
        const postTextElement = postContainer.querySelector('.post-text');
        const originalText = postTextElement.textContent;
        const postId = postContainer.id;
    
        createEditElements(postTextElement, originalText, postId);
    
        postTextElement.style.display = 'none';
    });
        

    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34495E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>`;

    deleteButton.addEventListener('click', () => {
        deletePostElement(postContainer, text);
    });

    buttonsWrapper.appendChild(likeButton);
    buttonsWrapper.appendChild(dislikeButton);
    buttonsWrapper.appendChild(editButton);
    buttonsWrapper.appendChild(deleteButton);

    postContentWrapper.appendChild(avatarCol);
    postContentWrapper.appendChild(contentCol);

    postContainer.appendChild(postContentWrapper);
    postContainer.appendChild(lineElement);
    postList.appendChild(postContainer);
    postContainer.appendChild(buttonsWrapper);
}

function deletePostElement(postContainer, postText) {

    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = savedPosts.filter(post => post.text !== postText);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    postContainer.remove();

    location.reload();

}

function createEditElements(postTextElement, originalText, postId) {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    const postIdParts = postId.split('-');
    const currentPostNumber = parseInt(postIdParts[1]);
    const newPostNumber = currentPostNumber + 1;
    postId = `post-${newPostNumber}`;

    const adjustedPostNumber = newPostNumber - 1;

    const postContainerId = `post-${adjustedPostNumber}`;
 
    const postContainer = document.getElementById(postContainerId);

    postContainer.classList.add('editing');

    setTimeout(() => {
    postContainer.style.height = '200px';
    }, 10);

    const spanElement = document.createElement('span');
    spanElement.style.font = 'medium 14px/16px Roboto';
    spanElement.style.color = '#9B59B6';
    spanElement.textContent = 'Burak ÜNAL';

    const postIndexToUpdate = savedPosts.findIndex(post => post.id === postId);

    const elementToEdit = postTextElement;

    const editContainer = document.createElement('div');
    editContainer.classList.add('edit-container');

    const editTextArea = document.createElement('textarea');
    editTextArea.classList.add('edit-textarea');

    originalText = originalText.trim();

    editTextArea.value = originalText;

    if (originalText.includes("Burak ÜNAL")) {
        editTextArea.value = originalText.replace("Burak ÜNAL", "");
    }

    editContainer.appendChild(spanElement);
    editContainer.appendChild(editTextArea);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons-div');
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.justifyContent = 'space-between';

    const iconButtonsDiv = document.createElement('div');
    iconButtonsDiv.classList.add('icon-buttons');
    iconButtonsDiv.style.width = 'auto'; 

    const actionButtonsDiv = document.createElement('div');
    actionButtonsDiv.classList.add('action-buttons');
    actionButtonsDiv.style.width = 'auto';

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.textContent = 'Cancel';

    const updateButton = document.createElement('button');
    updateButton.classList.add('update-button');
    updateButton.textContent = 'Update';

    const attachSVG = document.createElement('div');
    attachSVG.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34495E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
        </svg>
    `;

    attachSVG.style.display = 'inline-block';

    const smileSVG = document.createElement('div');
    smileSVG.style.marginLeft = '10px';
    smileSVG.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34495E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
    `;

    smileSVG.style.display = 'inline-block';

    iconButtonsDiv.appendChild(attachSVG);
    iconButtonsDiv.appendChild(smileSVG);

    actionButtonsDiv.appendChild(cancelButton);
    actionButtonsDiv.appendChild(updateButton);

    buttonsDiv.appendChild(iconButtonsDiv);
    buttonsDiv.appendChild(actionButtonsDiv);

    editContainer.appendChild(buttonsDiv);

    buttonsDiv.style.width = '100%';
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.gap = '10px';

    postTextElement.parentElement.appendChild(editContainer);

    updateButton.addEventListener('click', () => {
        const updatedText = editTextArea.value;
    
        if (!updatedText.trim()) {
            alert("Post cannot be empty!");
            return;
        }
    
        savedPosts[postIndexToUpdate].text = updatedText;
    
        localStorage.setItem('posts', JSON.stringify(savedPosts));
    
        postTextElement.textContent = updatedText;
    
        showToast('Post updated');
    
        editContainer.remove();

        postContainer.classList.remove('editing');
    
        location.reload();
    });
    

    cancelButton.addEventListener('click', () => {
        editContainer.remove();

        postContainer.classList.remove('editing'); 

        location.reload();
    });

    postTextElement.parentElement.appendChild(editContainer);
}
