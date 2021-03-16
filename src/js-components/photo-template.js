// ======  ( MOCK DATA )// ======  ( MOCK DATA ) 
const photoId = 56;
const photoTitle = "amazing sun";
const photoPrice = 8999;
const photoLikes = 89;
const photoUrl = "assets/img/Photographers_ID_photos/S/EllieRoseWilkens_S.jpg";


// how each photo of photographer gallery will be generated as a html template
class PhotoItemTemplate extends HTMLElement {
    constructor() {
        super();

        // link component to main stylesheet  ============> does not work in webpack
        const stylePhoto = document.createElement('link');
        stylePhoto.setAttribute('rel', 'stylesheet');
        stylePhoto.setAttribute('href', '../css/style.css');

        // create a shadow root
        const shadow4 = this.attachShadow({mode: 'open'});

        // retrieve existing  'UL' list parent SECTION  element
        const galleryWrapperSection = document.getElementById('gallery-section');
        
        // append content to UL
        
        const photoItem = galleryWrapperSection.appendChild(document.createElement('div'));
        photoItem.innerHTML = `

        <li class="photo-item" id="${photoId}">
            <a aria-label="enlarge photo" href="">
                <img src="${photoUrl}" alt="${photoTitle}">
            </a>
            <div class="photo-infos" aria-label="photo infos">
                <h5 class="photo-title" id="photo-title">${photoTitle}</h5>
                <h5 class="photo-price" id="photo-price">${photoPrice}</h5>
                <h5 class="photo-likes" id="photo-likes">${photoLikes}</h5>
                <button>
                    <img class="like-icon" src="../assets/icons/heart-icon.png" alt="heart icon">
                </button>
            </div>
        </li>
    `;

    // Attach stylesheet to component
    shadow4.appendChild(stylePhoto);
    // Attach the created elements to the shadow dom
    shadow4.appendChild(photoItem);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('photo-component', PhotoItemTemplate);
