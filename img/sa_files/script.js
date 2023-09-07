const textArea = document.getElementById('text-area');
const submitButton = document.getElementById('submit-button');
const postList = document.getElementById('post-list');
let likeCount = Math.floor(Math.random() * 100) + 1;
let dislikeCount = Math.floor(Math.random() * 100) + 1;
let isEditing = false;

document.cookie = "myCookie=myValue; SameSite=None; Secure";
document.cookie = "myCookie=myValue; SameSite=Strict";

window.addEventListener('load', () => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    for (const post of savedPosts) {
        if (!post.deleted) {
            createPostElement(post.text);
        }
    }

    if (textArea) { // Check if textArea is not null
        if (textArea.value.trim() === '') {
            textArea.classList.remove('textarea-filled');
            textArea.classList.add('textarea-default');
        }
    } else {
        console.error('Textarea element not found.');
    }

});


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

textArea.addEventListener('focus ', () => {
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

function showToast(message) {
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    const toastBody = document.querySelector('.toast-body');
    toastBody.textContent = message;
    toast.show();
}

submitButton.addEventListener('click', () => {
    const postText = textArea.value;

    if (postText.trim() === '' || postText === 'Your text here') {
        alert('Post cannot be empty!');
        return;
    }

    const post = { text: postText };
    savePostToLocalStorage(post);
    createPostElement(postText);

    textArea.value = 'Your text here';
    textArea.classList.remove('textarea-filled');
    textArea.classList.add('textarea-default');

    window.scrollTo(0, document.body.scrollHeight);

    showToast('Post added');

    const updatedSavedPosts = JSON.parse(localStorage.getItem('posts')) || [];
});

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
    savePostToLocalStorage(post);
    createPostElement(postText);

    textArea.value = '';

    window.scrollTo(0, document.body.scrollHeight);

    showToast('Post added');

    const updatedSavedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const nonDeletedPosts = updatedSavedPosts.filter(post => !post.deleted);
    localStorage.setItem('posts', JSON.stringify(nonDeletedPosts));
}

function savePostToLocalStorage(post) {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    savedPosts.push(post);
    localStorage.setItem('posts', JSON.stringify(savedPosts));
}

function createPostElement(text) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('row', 'posts');
    postContainer.style.paddingTop = '20px';
    postContainer.style.paddingBottom = '10px';

    const postContentWrapper = document.createElement('div');
    postContentWrapper.style.display = 'flex';
    postContentWrapper.style.paddingLeft = '20px';
    postContentWrapper.style.paddingRight = '20px';

    const avatarCol = document.createElement('div');
    avatarCol.classList.add('col-2', 'avatar-col');

    const avatarImg = document.createElement('img');
    avatarImg.src = '/img/avatar.png';
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
    postTextElement.style.textAlign = "left";
    postTextElement.style.wordWrap = 'break-word'; 
    postTextElement.style.font = "normal normal normal 14px/16px Roboto";
    postTextElement.style.letterSpacing = "0px";
    postTextElement.style.color = "#5D6D7E";
    postTextElement.innerHTML = `
    <span style="font: medium 14px/16px Roboto; color: #9B59B6;">Jane Doe</span>` + " " + text;

    contentCol.appendChild(avatarCol);
    contentCol.appendChild(creationDateElement);
    contentCol.appendChild(postTextElement);

    const lineElement = document.createElement('hr');
    lineElement.style.border = '1px solid #EAECEE';
    lineElement.style.opacity = '1';
    lineElement.style.marginTop = '10px';

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('buttons-wrapper');
    buttonsWrapper.style.display = 'flex';
    buttonsWrapper.style.justifyContent = 'space-between';

    const likeButton = document.createElement('div');
    likeButton.classList.add('like-button');
    likeButton.style.marginRight = '0';
    likeButton.style.textAlign = 'left';
    likeButton.style.cursor = "pointer";
    likeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#C1C8CE" class="feather-thumbs-up">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"></path>
        </svg>
        <span style="font: normal normal normal 14px/16px Roboto; letter-spacing: 0px; color: #C1C8CE;">${likeCount}</span>`;

    const dislikeButton = document.createElement('div');
    dislikeButton.classList.add('dislike-button');
    dislikeButton.style.marginRight = 'auto';
    dislikeButton.style.marginLeft = '15px';
    dislikeButton.style.textAlign = 'left';
    dislikeButton.style.cursor = "pointer";
    dislikeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#C1C8CE" class="feather-thumbs-down">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3z"></path>
        </svg>
        <span style="font: normal normal normal 14px/16px Roboto; letter-spacing: 0px; color: #C1C8CE;">${dislikeCount}</span>`;

    let likeClicked = false;
    let dislikeClicked = false;
    let isLiked = false;
    let isDisliked = false;

    likeButton.addEventListener('click', () => {
        if (!isLiked) {
            likeCount++;
            isLiked = true;
            likeButton.classList.add('liked');
            updateLikeDislikeCounts(likeButton, dislikeButton);
            updateLikeDislikeColors(likeButton, dislikeButton);
        } else {
            likeCount--;
            isLiked = false;
            likeButton.classList.remove('liked');
            updateLikeDislikeCounts(likeButton, dislikeButton);
            updateLikeDislikeColors(likeButton, dislikeButton);
        }
    });

    dislikeButton.addEventListener('click', () => {
        if (!isDisliked) {
            dislikeCount++;
            isDisliked = true;
            dislikeButton.classList.add('disliked');
            updateLikeDislikeCounts(likeButton, dislikeButton);
            updateLikeDislikeColors(likeButton, dislikeButton);
        } else {
            dislikeCount--;
            isDisliked = false;
            dislikeButton.classList.remove('disliked');
            updateLikeDislikeCounts(likeButton, dislikeButton);
            updateLikeDislikeColors(likeButton, dislikeButton);
        }
    });

    function updateLikeDislikeColors(likeButton, dislikeButton) {
        const likeFill = likeButton.classList.contains('liked') ? "#9B59B6" : "#C1C8CE";
        const dislikeFill = dislikeButton.classList.contains('disliked') ? "#34495E" : "#C1C8CE";

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
    editButton.style.marginLeft = 'auto';
    editButton.style.marginRight = '10px';
    editButton.style.cursor = "pointer";
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
        createEditElements(postTextElement, originalText);

        editButton.style.pointerEvents = 'none';
        editButton.style.opacity = '0.5';
    });

    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete-button');
    deleteButton.style.marginLeft = '0';
    deleteButton.style.cursor = "pointer";
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

    showToast('Post deleted');
}

function createEditElements(postTextElement, originalText) {
    const elementToEdit = postTextElement;
    const editContainer = document.createElement('div');
    editContainer.classList.add('edit-container');

    const editTextArea = document.createElement('textarea');
    editTextArea.classList.add('edit-textarea');
    editTextArea.value = originalText;

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.textContent = 'Cancel';

    const saveButton = document.createElement('button');
    saveButton.classList.add('save-button');
    saveButton.textContent = 'Submit';

    editContainer.appendChild(editTextArea);
    editContainer.appendChild(cancelButton);
    editContainer.appendChild(saveButton);

    const editButton = postTextElement.parentElement.querySelector('.edit-button');

    function finishEditing() {
        if (editButton) {
            editButton.style.pointerEvents = 'auto';
            editButton.style.opacity = '1';
            editButton.disabled = false;
        }
    }

    saveButton.addEventListener('click', () => {
        const newText = editTextArea.value.trim();
        if (newText !== null) {
          const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
          const originalText = postTextElement.textContent;
          savedPosts.forEach(post => {
            if (post.text === originalText) {
              post.text = newText;
            }
          });
          localStorage.setItem('posts', JSON.stringify(savedPosts));
          postTextElement.textContent = newText;
          showToast('Post updated');
          finishEditing();
          editContainer.remove();
        }
      });
     

    cancelButton.addEventListener('click', () => {
        finishEditing();
        editContainer.remove();
    });

    postTextElement.parentElement.insertBefore(editContainer, postTextElement);
}