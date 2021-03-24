

//API url
var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
var mediaAssetsPath = './assets/img/';
var portraitAssetsPath = './assets/img/portraits/S/';

// mock data =============  ----> use factory/models
class Photographer {
    constructor(id, name, tagline, portrait, portraitSrc, url, city, country, price, template, tagsTemplate, tags, photographerMedia){
        id = id;
        name = name;
        portrait = portrait; //  = pic name
        portraitSrc = portraitAssetsPath + portrait;   // => img src="./assets/img/portraits/S/" + name
        city = city;
        country = country;
        tagline = tagline;
        tags = tags;
        tagsTemplate = tagsTemplate; // navtags list - custom html element

        url = url; // set up by router
        price = price; // price/day
        photographerMedia = photographerMedia ; // all media [] that belongs to photographer (array  of 'mediaItems' objects)
        
        template = template; // photographer home - custom html element
    }
    getPhotographerTags() {
        tags.forEach( x => console.log('tag==', x));
    }
    getPhotographerName() {
        return this.name;
    }
}

class MediaItem {
    constructor(mediaId, photograperId, image, tags, likes, date, price) {
        mediaId = mediaId;
        photograperId = photograperId;
        imageName = image; // ex "Name.jpg"
        imageSrc = imageSrc; //  => img src="./assets/img/" + imageName
        let name = Photographer.getPhotographerName();
        imageSrc = mediaAssetsPath + name;
        imageTitle = extractImageTitle(imageTitle);
        tags = tags; // image tags
        likes = likes;
        date = date;
        price = price; // image price

    }
    extractImageTitle(imageTitle) { 
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
        initializePhotographers(photographers);
});

// fetch only media data
function fetchMedia() {
    fetch(url)
    .then(response => response.json())
    .then(json => { 
        let media = json.media;
        initializePhotographerMedia(media);  
})
}

function findImageInAssets() {}




// -------------------------------------------------------------------------------
// AT HOMEPAGE OPENING, THE MAIN NAVIGATION WITH TAGS IS GENERATED
// -------------------------------------------------------------------------------
function initializeMainNav(tagslistMainNav) {
    
    // define parent container (header)
    // const headerWrapper = document.getElementsByClassName('header-wrapper');
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

        // newPhotographer.portrait = fetchBlob(newPhotographer.id);
        newPhotographer.portraitSrc = photographer.portraitSrc;

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

// -------------------------------------------------------------------------------
// INIT PHOTOGRAPHER MEDIA - PHOTOGRAPHER PAGE 
// -------------------------------------------------------------------------------
// function can only be called for a photographer, with an id param
function initializePhotographerMedia(media, id) {
    var photographerId;
    var photographerMedia = []; // array of objects 'itemMedia' where objects are pushed
    var mediaItem; // object

    if ( id === undefined ) { id = 0;  } else { photographerId = id; }

    media.forEach(itemOfMedia => {  // loop through media array from api: for each object 'itemMedia'
        // find matching id btw media & photographer to retrieve array of objects 'itemMedia'
        if (itemOfMedia.photographerId === photographerId ) {
            mediaItem = new MediaItem(); // new object media to store incoming data
            mediaItem.id = itemOfMedia.id;
            mediaItem.image = itemOfMedia.image; // ex: "name.jpg" => img src="./assets/img/name/"
            mediaItem.date = itemOfMedia.date;
            mediaItem.likes = itemOfMedia.likes;
            mediaItem.tags = itemOfMedia.tags;
            mediaItem.price = itemOfMedia.price;
        }
        photographerMedia.push(mediaItem); // push each media object to array
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
// PHOTOGRAPHER CUSTOM HTML ELEMENT - PHOTOGRAPHER PAGE
// ----------------------------------------------------

class PhotographerTemplatePage extends HTMLElement {
    constructor() {
        super();

        // link component to main stylesheet  ============> does not work in webpack
        const stylePage = document.createElement('link');
        stylePage.setAttribute('rel', 'stylesheet');
        stylePage.setAttribute('href', './css/style.css');


        // create a shadow root
        const shadow2 = this.attachShadow({mode: 'open'});

        // create component main container SECTION
        const photographerWrapperPage = document.createElement('section');

        // set main SECTION container +  attributes/properties
        photographerWrapperPage.setAttribute('class', 'photographer photographer--page');
        photographerWrapperPage.setAttribute('id', 'photographer-'+ newPhotographer.name); // + name
        photographerWrapperPage.setAttribute('aria-label', newPhotographer.name + ' presentation');


        // create photographer main presentation block (top infos + bottom likes / price)

        photographerWrapperPage.innerHTML = `
            <img class="photographer__pic page" src="${newPhotographer.portraitSrc}" alt="${newPhotographer.name} presentation picture" id="${newPhotographer.name}-pres-picture">
            <div class="photographer__text-infos">
                <h1 class="photographer__name page" id="${newPhotographer.name}">${newPhotographer.name}</h1>
                <h2 class="photographer__location page" id="${newPhotographer.city}">${newPhotographer.city}, ${newPhotographer.country}</h2>
                <h3 class="photographer__tagline page" id="${newPhotographer.name}-tagline">${newPhotographer.tagline}</h3>
                <div class="photographer__tags-list tags-list page" id="${photographerTags}"></div>
            </div>

            <div class="photographer__bottom-infos" id="bottom-infos">
                <h4 class="photographer__likes" id="${photographerLikes}">${photographerLikes}</h4>
                <h4 class="photographer__price" id="${newPhotographer.price}">${newPhotographer.price}</h4>
            </div>
        `;

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

        //  HERE: APPEND PHOTO-LIST LI ELEMENTS  / 


        // Attach stylesheet to component
        shadow2.appendChild(stylePage);
        // Attach the created elements to the shadow dom
        shadow2.appendChild(photographerWrapperPage);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('photographer-component-page', PhotographerTemplatePage);

// ----------------------------------------------------
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
function initPhotographerPageView(id) {
    var photographerId = id;

    fetchMedia();



}
















