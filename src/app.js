

//API url
var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
var mediaAssetsPath = './assets/img/';
var portraitAssetsPath = './assets/img/portraits/S/';

// mock data =============  ----> use factory/models
class Photographer {
    constructor(id, name, tagline, portraitName, portraitSrc, url, city, country, price, bottomLikes, template, tagsTemplate, tags, photographerMedia){
        id = id;
        name = name;
        portraitName = portraitName; //  = pic name
        portraitSrc = portraitAssetsPath + portraitName;   // => img src="./assets/img/portraits/S/" + "portraitName"
        city = city;
        country = country;
        tagline = tagline;
        tags = tags;
        tagsTemplate = tagsTemplate; // navtags list - custom html element

        url = url; // set up by router
        price = price; // price/day
        photographerMedia = photographerMedia ; // all media [] that belongs to photographer (array  of 'mediaItems' objects)
        
        bottomLikes = bottomLikes;

        template = template; // photographer home - custom html element
    }
    static getPhotographerTags() {
        tags.forEach( x => console.log('tag==', x));
    }
    static getPhotographerName() {
        return this.name;
    }
}

class MediaItem {
    constructor(mediaId, photograperId, photographerName, image, imageName, imageTitle,imageSrc, imageTags, imageLikes, date, price, photoTemplate ) {
        mediaId = mediaId;
        photograperId = photograperId;
        imageName = image; // ex "Name.jpg"
        imageSrc = imageSrc; //  => img src="./assets/img/" + imageName
        photographerName = photographerName;
        // photographerName = getPhotographerName(); => use in instantiated object
        imageSrc = mediaAssetsPath + photographerName;
        imageTitle = imageTitle;
        // imageTitle = extractImageTitle(imageTitle); => use in instantiated object
        imageTags = imageTags; // image tags
        imageLikes = imageLikes;
        date = date;
        price = price; // image price

        photoTemplate = photoTemplate;

    }
    static extractImageTitle(imageTitle) { 
        // ex : "Fashion_Yellow_Beach.jpg" =>  "Fashion Yellow Beach"
        let processedTitle = '';
        for ( let char of imageTitle ) { 
            if (char === '_') { char = ' '; }
            if ( char === '.' ) { return;  }
            processedTitle+= char;
        }
        console.log('processedTitle=', processedTitle);
        return processedTitle;
    } 
}


// -------------------------------------------------------------------------------
// AT HOMEPAGE OPENING, FETCH RETRIEVES ALL DATA FROM API (PHOTOGRAPHERS DATA ARRAY ONLY) 
// & triggers creation of photographers list
// -------------------------------------------------------------------------------
fetch(url)
    .then(response => response.json())
    .then(json => {
        let photographers = json.photographers;
        // let media = json.media;
        initializePhotographers(photographers);
        // initPhotographerPageView(media);
});


// -------------------------------------------------------------------------------
// AT HOMEPAGE OPENING, THE MAIN NAVIGATION WITH TAGS IS GENERATED
// -------------------------------------------------------------------------------
function initializeMainNav(tagslistMainNav) {
    
    // define parent container (header)
    const mainNavContainer = document.querySelector('#header');
    // generate new navtag from navTags custom html element, with whole tags list as param
    var headerNav = new NavTags(tagslistMainNav);
    // attach component to parent
    mainNavContainer.appendChild(headerNav);
}
// Call init main nav
// ( this method only works if page = loaded, otherwise, mainNavContainer = null
window.onload = () => initializeMainNav(tagslistMainNav);



// -------------------------------------------------------------------------------
// INIT PHOTOGRAPHERS LIST - HOME - all by default, then eventually sorted by tag
// -------------------------------------------------------------------------------
function initializePhotographers(photographers) {

    photographers.forEach( photographer => { // generate new photographer object to attach data to

        newPhotographer = new Photographer();
        newPhotographer.id = photographer.id;
        newPhotographer.name = photographer.name;
        newPhotographer.city = photographer.city;
        newPhotographer.country = photographer.country;
        newPhotographer.tagline = photographer.tagline;
        newPhotographer.tags = photographer.tags;
        newPhotographer.price = photographer.price;
        newPhotographer.url = photographer.url;
        newPhotographer.bottomLikes = 567789;

        newPhotographer.portraitName = photographer.portrait;
        newPhotographer.portraitSrc = portraitAssetsPath + newPhotographer.portraitName;
        
        // generate new navtags html template and inject data
        newPhotographer.tagsTemplate = new NavTags(newPhotographer.tags);
        // inside navTag class template, 
        // each navTag has an event listener that calls 'updateHomepageView(tag)' method

        // generate new photographer html template and inject data
        newPhotographer.template = new PhotographerTemplateHome();

        // define where each generated photographer component will be rooted (= section #photographersList)
        const photographerContainer = document.querySelector('#photographersList');
        // attach each new created component to this section
        photographerContainer.appendChild(newPhotographer.template);
    })
}



// ---------------------------------------------------------------------------------------
// PHOTOGRAPHER CUSTOM HTML ELEMENT - HOME : how each photographer component is generated
// ---------------------------------------------------------------------------------------
class PhotographerTemplateHome extends HTMLElement {
    constructor() {
        super();

        // uses photographer model -------

        // link component to main stylesheet  ============> does not work in webpack
        const styleHome = document.createElement('link');
        styleHome.setAttribute('rel', 'stylesheet');
        styleHome.setAttribute('href', './css/style.css');

        // create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // create photographer component main container div
        const photographerWrapperHome = document.createElement('div');

        // set photographer main container div attributes/properties
        photographerWrapperHome.setAttribute('class', 'photographer photographer--home');
        photographerWrapperHome.setAttribute('id', 'photographer-'+ newPhotographer.name); // + name
        photographerWrapperHome.setAttribute('aria-label', newPhotographer.name + ' presentation');


        // create clickable photographer main presentation block (name+pic)
        const photographerMainBlock = photographerWrapperHome.appendChild(document.createElement('div'));
        photographerMainBlock.setAttribute('class', 'photographer__main-block');
        photographerMainBlock.innerHTML = `
            <a aria-label="go to ${newPhotographer.name} page">
                <img class="photographer__pic home" src="${newPhotographer.portraitSrc}" alt="${newPhotographer.name} presentation picture" id="${newPhotographer.name}-pres-picture">
                <h2 class="photographer__name home" id="${newPhotographer.name}">${newPhotographer.name}</h2>
            </a>
            `;
        // add event listener on this block, that calls the photographer page with id as param
        photographerMainBlock.addEventListener('click', function() { initPhotographerPageView(newPhotographer.id)});
        
        // create photographer infos block main presentation block
        const photographerInfosBlock = photographerWrapperHome.appendChild(document.createElement('div'));
        photographerInfosBlock.setAttribute('class', 'photographer__text-infos');
        photographerInfosBlock.setAttribute('aria-label', 'photographer infos');
        photographerInfosBlock.innerHTML = `
                    <h3 class="photographer__location home" id="${newPhotographer.name}-location">${newPhotographer.city}, ${newPhotographer.country}</h3>
                    <h4 class="photographer__tagline home" id="${newPhotographer.name}-tagline">${newPhotographer.tagline}</h4>
                    <h5 class="photographer__price home" id="${newPhotographer.name}-price">${newPhotographer.price}</h5>
        `;

        // generate new tagslists custom element template (using Navtags custom html element)
        const photographerTagsList = new NavTags();
        // inject data into it ====> done as attribute setting IN Navtag class

        // attach navtags component to photographer profile
        photographerWrapperHome.appendChild(photographerTagsList);

        // Attach stylesheet to component
        shadow.appendChild(styleHome);
        // Attach the created elements to the shadow dom
        shadow.appendChild(photographerWrapperHome);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('photographer-component-home', PhotographerTemplateHome);

// ----------------------------------------------------
// ----------------------------------------------------


// ----------------------------------------------------
// PHOTOGRAPHER INFOS CUSTOM HTML ELEMENT - PHOTOGRAPHER PAGE
// ----------------------------------------------------
class PhotographerTemplatePageInfos extends HTMLElement {
    constructor() {
        super();

        // link component to main stylesheet  ============> does not work in webpack
        const stylePage = document.createElement('link');
        stylePage.setAttribute('rel', 'stylesheet');
        stylePage.setAttribute('href', './css/style.css');


        // create a shadow root
        const shadow2 = this.attachShadow({mode: 'open'});

        // create component main container SECTION
        const photographerWrapperPageinfos = document.createElement('section');

        // set main SECTION container +  attributes/properties
        photographerWrapperPageinfos.setAttribute('class', 'photographer photographer--page');
        photographerWrapperPageinfos.setAttribute('id', 'photographer-'+ newPhotographer.name); // + name
        photographerWrapperPageinfos.setAttribute('aria-label', newPhotographer.name + ' presentation');


        // create photographer main presentation block (top infos + bottom likes / price)
        photographerWrapperPageinfos.innerHTML = `
            <img class="photographer__pic page" src="${newPhotographer.portraitSrc}" alt="${newPhotographer.name} presentation picture" id="${newPhotographer.name}-pres-picture">
            <div class="photographer__text-infos">
                <h1 class="photographer__name page" id="${newPhotographer.name}">${newPhotographer.name}</h1>
                <h2 class="photographer__location page" id="${newPhotographer.city}">${newPhotographer.city}, ${newPhotographer.country}</h2>
                <h3 class="photographer__tagline page" id="${newPhotographer.name}-tagline">${newPhotographer.tagline}</h3>
                <div class="photographer__tags-list tags-list page" id="${newPhotographer.tags}"></div>
            </div>

            <div class="photographer__bottom-infos" id="bottom-infos">
                <h4 class="photographer__likes" id="${newPhotographer.bottomLikes}">${newPhotographer.bottomLikes}</h4>
                <h4 class="photographer__price" id="${newPhotographer.price}">${newPhotographer.price}</h4>
            </div>
        `;

        // Attach stylesheet to component
        shadow2.appendChild(stylePage);
        // Attach the created elements to the shadow dom
        shadow2.appendChild(photographerWrapperPageInfos);
        }
    }
    // register custom element in the built-in CustomElementRegistry object
    customElements.define('photographer-component-page-infos', PhotographerTemplatePageInfos);  





// ----------------------------------------------------
// CUSTOM ELEMENT TEMPLATE FOR NAVTAGS
// ----------------------------------------------------
class NavTags extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode:'open'});

        // create nav section
        const navTagsTemplate = document.createElement('nav');
        navTagsTemplate.setAttribute('class', 'header__nav tags-list home');

        // IF navTags component is generated to populate HOME MAIN NAV

        
        // ELSE IF navTags component is generated to populate PHOTOGRAPHER TAGS LIST
        // const navTags = this.attributes.newPhotographer[tags].value;
        // const navTags = newPhotographer.tags;
        const navTags = tagslistMainNav;

        // attach  attributes passed by context ----------------------------- * 
        navTagsTemplate.setAttribute('navTags', navTags);


        // link component to main stylesheet  ============> ! does not work in webpack
        const navstyle = document.createElement('link');
        navstyle.setAttribute('rel', 'stylesheet');
        navstyle.setAttribute('href', './css/style.css');

        // populate nav section with tags, list depending on context :
        // (home nav or photographer profile tags nav)
        for (let i = 0; i < navTags.length; i++)  {
            var navTagItem = document.createElement('a');
            navTagItem.setAttribute('class', 'nav-tag');
            navTagItem.setAttribute('id', navTags[i]+'-nav-tag');
            // navTagItem.setAttribute('href', "");

            // ADD to <a> tag :
            // event listener click => will call updateView function,
            // & passing name of tag as parameter (example : 'portrait')
            navTagItem.addEventListener('click', function() { updateHomePageView(navTags[i])}, false);
            

            var navTagItemContent = document.createTextNode('#' + navTags[i]);
            navTagItem.appendChild(navTagItemContent);

            // ADD to <a> tag : span element for accessibility ( visually hidden )
            var spanAccessibility = document.createElement('span');
            spanAccessibility.setAttribute('class', 'visuallyHidden') // => TO REVIEW : not necessary if 'visuallyHidden' is a mixin 
            var spanAccessibilityContent = document.createTextNode(navTags[i]); // attach navTag name to span
            spanAccessibility.appendChild(spanAccessibilityContent);

            //attach span to navtag
            navTagItem.appendChild(spanAccessibility);

            navTagsTemplate.appendChild(navTagItem);
        };
        // Attach stylesheet to component
        shadowRoot.appendChild(navstyle);
        // Attach the created elements to the shadow dom
        shadowRoot.appendChild(navTagsTemplate); 
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('nav-tags-component', NavTags);


// --------------------------------------------------------------------------------------------------------
// when user clicks on a tag ( main navigation or photographer tagslist)
// the homepage view is updated, to display a list of photographers 
// sorted by clicked tag name 
// --------------------------------------------------------------------------------------------------------
function updateHomePageView(navTag) {
    // store tag name for sorting
    var sortingTerm = navTag;

    // define homepage content
    const photographersList = document.querySelector('.photographers');
    // remove eveything that's displayed by default
    while (photographersList.firstChild) {photographersList.removeChild(photographersList.firstChild)}

    // re-fetch all data & use existing 'initializePhotographers(photographers)'
    // but with an additional parameter 'tag' (=searchterm)
    fetch(url)
    .then(response => response.json())
    .then(json => {
        let photographers = json.photographers;
        filterPhotographers(photographers, sortingTerm);
    });  
}

function filterPhotographers(photographers, sortingTerm){ 
        var filtered = photographers.filter(x => x.tags.includes(sortingTerm));
        initializePhotographers(filtered);
}


// --------------------------------------------------------------------------------------------------------
// ON HOMEPAGE : when user clicks on a photographer profile, 
// that triggers a new view : the photographer own page
// IDEALLY, photographer data in use on home page is REUSED in this page ( from CACHE ? )
// + another call to API is made to RETRIEVE MEDIA DATA FOR THIS PHOTOGRAPHER
// --------------------------------------------------------------------------------------------------------


function initPhotographerPageView(photographerId) {

    console.log('id==',photographerId );
    let photographerInfos;

    // rerieve info data for this photographer
    fetch(url)
        .then(response => response.json())
        .then(json => {
            let photographers = json.photographers;
            findPhotographerInfo(photographers, photographerId);
        })

    function findPhotographerInfo(photographers, photographerId) {
        photographers.forEach(photographer => {
            if (photographer.id === photographerId ) { 
                photographerInfos = photographer; 
                newPhotographer = new Photographer();
                newPhotographer.id = photographer.id;
                newPhotographer.name = photographer.name;
                newPhotographer.city = photographer.city;
                newPhotographer.country = photographer.country;
                newPhotographer.tagline = photographer.tagline;
                newPhotographer.tags = photographer.tags;
                newPhotographer.price = photographer.price;
                newPhotographer.url = photographer.url;
                newPhotographer.bottomLikes = 567789;
                newPhotographer.portraitName = photographer.portrait;
                newPhotographer.portraitSrc = portraitAssetsPath + newPhotographer.portraitName;
                
                // generate new navtags html template and inject data
                newPhotographer.tagsTemplate = new NavTags(newPhotographer.tags);
                // inside navTag class template, 
                // each navTag has an event listener that calls 'updateHomepageView(tag)' method
        
                // generate new photographer html template and inject data
                newPhotographer.template = new PhotographerTemplatePageInfos();
        
                // define where each generated photographer component will be rooted (= section #photographersList)
                const photographerInfosContainer = document.querySelector('#photographer-content');
                // attach each new created component to this section
                photographerInfosContainer.appendChild(newPhotographer.template);
            }
        })

    }





    fetchMedia(photographerId);

    // fetch only media data for one photographer at the time (id)
    function fetchMedia(photographerId) {
        fetch(url)
        .then(response => response.json())
        .then(json => { 
            let media = json.media;
            sendMediaDataToPhotographerGallery(media, photographerId);
        })
    }


    function sendMediaDataToPhotographerGallery(media, photographerId){

        var photographerMedia = []; // array of objects 'itemMedia' where objects are pushed

        media.forEach(itemOfMedia => {  // loop through media array from api: for each object 'itemMedia'
        // find matching id btw media & photographer to retrieve array of objects 'itemMedia'
            if (itemOfMedia.photographerId === photographerId ) {
                photographerMedia.push(itemOfMedia); // push each media object to array
            }
        })

        // generate new img item object for each img of array
        photographerMedia.forEach(pic => {
            image = new MediaItem();
            image.mediaId = pic.mediaId;
            image.photograperId = photographerId; /* pic.photograperId; */
            image.imageName = pic.image;
            image.photographerName = newPhotographer.name;
            image.imageSrc = mediaAssetsPath + image.imageName;

            image.imageTitle = image.imageName;
            // image.imageTitle = image.extractImageTitle(image.imageName);
            image.imageLikes = pic.likes;
            image.date = pic.date;
            image.price = pic.price;
            image.imageTags = pic.tags;

            image.template = new PhotoItemTemplate();
        })
        // define host for gallery component
        const galleryWrapperSection = document.getElementById('gallery-section');
        // render gallery 
        galleryWrapperSection.appendChild(photographerMedia)
    }
}



// ----------------------------------------------------
// CUSTOM ELEMENT TEMPLATE FOR IMAGES FROM GALLERY
// ----------------------------------------------------

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
        const galleryWrapperSection = document.createElement('ul');
        galleryWrapperSection.setAttribute('id', 'gallery-section');
        
        // const galleryWrapperSection = document.getElementById('gallery-section');
        
        // append content to UL
        const photoItem = document.createElement('div');
        photoItem.innerHTML = `

        <li class="photo-item" id="${image.mediaId}">
            <a aria-label="enlarge photo" href="">
                <img src="${image.imageSrc}" alt="${image.imageTitle}">
            </a>
            <div class="photo-infos" aria-label="photo infos">
                <h5 class="photo-title" id="photo-title">${image.imageTitle}</h5>
                <h5 class="photo-price" id="photo-price">${image.price}</h5>
                <h5 class="photo-likes" id="photo-likes">${image.imageLikes}</h5>
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
    // attach each photo item to gallery
    galleryWrapperSection.appendChild(photoItem);
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('photo-component', PhotoItemTemplate);

// ----------------------------------------------------
// PHOTOGRAPHER GALLERY CUSTOM HTML ELEMENT - PHOTOGRAPHER PAGE
// ----------------------------------------------------
class PhotographerTemplatePageGallery extends HTMLElement {

    constructor() {
        super();
        // create component container SECTION for GALLERY
        const galleryWrapper = document.createElement('section');
        // set GALLERY SECTION container +  attributes/properties
        galleryWrapper.setAttribute('class', 'gallery-wrapper');
        galleryWrapper.setAttribute('id', 'gallery-section-'+ newPhotographer.name);
        galleryWrapper.setAttribute('aria-label', newPhotographer.name + ' gallery collection');

        // Gallery section consists of a ul element (which imgs content are generated separately
        const photoList = galleryWrapper.appendChild(document.createElement('ul'));
        photoList.setAttribute('class', 'gallery');
        photoList.setAttribute('id', newPhotographer.name + '-gallery-list');
        galleryWrapper.setAttribute('aria-label', newPhotographer.name + ' photo gallery');

        //  HERE: APPEND PHOTO-LIST LI ELEMENTS (GALLERY = list of imgs) / 


        // Attach stylesheet to component
        shadow2.appendChild(stylePage);
        // Attach the created elements to the shadow dom
        shadow2.appendChild(photographerWrapperPage);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('photographer-component-page-gallery', PhotographerTemplatePageGallery);











