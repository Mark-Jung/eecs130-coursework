// Global Variables:
const serverURL = 'https://eecs130hw7server.herokuapp.com/';
let activeCardID = -1
let appPhotos;
let Gusers;


// functions:
const loadCardListView = (imagesFromServer) => {
    // save to a global variable so this data will be
    // accessible to the other functions:
    appPhotos = imagesFromServer;
    
    //clear out old cards (if there are any):
    document.querySelector('.cards').innerHTML = '';

    // create new ones (based on photos list)
    let i = 0;
    for (image of appPhotos) {
        const template = `
            <li class="card" data-index="${i}">
                <div class="image" style="background-image:url('${image.image_url}')"></div>
            </li>`;
        i++;
        document.querySelector('.cards').innerHTML += template;
    }
    attachEventHandlers();
};

const showFiltered = () => {
    var e = document.querySelector("#users");
    var selected = e.value;
    if (selected === "0") {
        getImagesFromServer();
    } else {
        fetch(serverURL + 'photos/?user_id=' + selected)
            .then((response) => {
                return response.json();
            })
            .then(loadCardListView);
    }
}

const buildUserMenu = (users) => {
    document.querySelector('#users').innerHTML = '';

    const all = `
        <option class="dropdownOption" value="0">All</option>
    `;
    document.querySelector('#users').innerHTML += all;
    for (user of users) {
        const template = `
            <option class="dropdownOption" value="${user.id}">${user.username}</option>
        `;
        document.querySelector('#users').innerHTML += template;
    }
    document.querySelector('#users').addEventListener("change", showFiltered)
}

const getImagesFromServer = () => {
    fetch(serverURL + 'photos')
        .then((response) => {
            return response.json();
        })
        .then(loadCardListView);
};

const getUsersFromServer = () =>{
    fetch(serverURL + 'users')
        .then((response) => {
            return response.json()
        })
        .then(buildUserMenu);
};

const getCurrentPhoto = () => {
    return appPhotos[activeCardID];
};

const fetchComments = () => {
    const photoItem = getCurrentPhoto();
    fetch(serverURL + 'comments/?photo_id=' + photoItem.id)
        .then((response) => {
            return response.json()
        })
        .then(loadCardDetailView);
}

const loadCardDetailView = (comments) => {
    const container = document.querySelector('.preview_box');
    const photoItem = getCurrentPhoto();
    const imageURL = `url("${photoItem.image_url}")`;
    container.querySelector('.featured_image').style.backgroundImage = imageURL;
    container.querySelector('.caption').innerHTML = getPhotoDetailTemplate(photoItem, comments);

    // update CSS:
    container.classList.add('active');
    document.querySelector('main').style.overflow = 'hidden';
    document.querySelector('#like').onclick = likePhoto;
};

const showPhotoDetail = (e) => {
    activeCardID = parseInt(e.target.parentElement.getAttribute('data-index'));
    fetchComments();
};

const formatDate = (date) => {
    date = new Date(date)
    return date.toDateString();
};

const getPhotoDetailTemplate = (photoItem, comments) => {
    let template = `
        <h2 class="title">${photoItem.title}</h2>
        <p class="handle">@${photoItem.username}</p>
        <p class="likes">Likes: ${photoItem.likes}</p>
        <p class="date">${formatDate(photoItem.date)}</p>
        <button id="like">
            <div>
                like
            </div>
        </button>`;
    template += `
    <div class="comments">
        <h3>Comments</h3>
    </div>`;
    for (comment of comments) {
        let commentMold = `
        <br/>
        <div>${comment.username} on ${formatDate(comment.date)}</div>
        <br/>
        <div>${comment.text}</div>
        <br/>
        <br/>
        `

        template += commentMold
    }
    return template
};

const likePhoto = (e) => {
    const photoItem = getCurrentPhoto();
    fetch(serverURL + 'photos/' + photoItem.id, {
       method: 'PATCH',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           "likes": photoItem.likes + 1
       })
   })
   .then(response => response.json())
   .then(data => {
       appPhotos[activeCardID] = data;
       document.querySelector('.likes').innerHTML = data.likes;
   });

}

const hidePhoto = (e) => {
    const container = document.querySelector('.preview_box');
    container.classList.remove('active');
    document.querySelector('main').style.overflow = 'auto';
};

const showNextPhoto = (e) => {
    ++activeCardID;
    if (activeCardID >= appPhotos.length) { activeCardID = 0; }
    loadCardDetailView();
};

const showPreviousPhoto = (e) => {
    --activeCardID;
    if (activeCardID < 0) { activeCardID = appPhotos.length - 1; }
    loadCardDetailView();
};
const attachEventHandlers = () => {
    for (card of document.querySelectorAll('.image')) {
        card.onclick = showPhotoDetail;
    }
    document.querySelector('.close').onclick = hidePhoto;
    document.querySelector('.featured_image').onclick = showNextPhoto;
    // document.querySelector('.caption').onclick = showNextPhoto;
    document.querySelector('.next').onclick = showNextPhoto;
    document.querySelector('.prev').onclick = showPreviousPhoto;
};


// Initialize
getImagesFromServer();
getUsersFromServer();