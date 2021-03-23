

//API url
var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  


// mock data =============  ----> use factory/models
class Photographer {
    constructor(id, name, tagline, portrait, portraitUrl, url, city, country, price, template, tagsTemplate, tags){
        id = id;
        name = name;
        portrait = portrait;
        portraitUrl = portraitUrl;
        city = city;
        country = country;
        tagline = tagline;
        tags = tags;
        tagsTemplate = tagsTemplate;
        // likes = likes; // as coming from json api
        url = url;
        price = price;
        // gallery = gallery;

        template = template;
    }
    getPhotographerTags(id) {
        tags.forEach( x => console.log('tag==', x));
    } 
}


// -------------------------------------------------------------------------------
// AT HOMEPAGE OPENING, FETCH RETRIEVES ALL DATA FROM API & triggers creation of photographers list
// -------------------------------------------------------------------------------
fetch(url)
    .then(response => response.json())
    .then(json => {
        let photographers = json.photographers;
        let media = json.media;
        initializePhotographers(photographers);
});

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
        newPhotographer.portrait = photographer.portrait;

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
            <a href="" aria-label="go to ${newPhotographer.name} page">
                <img class="photographer__pic home" src="${newPhotographer.portraitUrl}" alt="${newPhotographer.name} presentation picture" id="${newPhotographer.name}-pres-picture">
                <h2 class="photographer__name home" id="${newPhotographer.name}">${newPhotographer.name}</h2>
            </a>
            `;
        
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
            <img class="photographer__pic page" src="${newPhotographer.portraitUrl}" alt="${newPhotographer.name} presentation picture" id="${newPhotographer.name}-pres-picture">
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



// when user clicks on a tag ( main navigation or photographer tagslist)
// the homepage view is updated, to display a list of photographers 
// sorted by clicked tag name 
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
        let media = json.media;
        filterPhotographers(photographers, sortingTerm);
    });  
}
function filterPhotographers(photographers, sortingTerm){ 
        var filtered = photographers.filter(x => x.tags.includes(sortingTerm));
        initializePhotographers(filtered);
}
















