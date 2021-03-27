
//API url
var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
var portraitAssetsPath = './assets/img/portraits/S/';


// OBJECTS models =============  ----> + to be used with factory
class Photographer {
    constructor(id, name, tagline, portraitName, portraitSrc, url, city, country, price, bottomLikes, template, tagsTemplate, tags){
        
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
        bottomLikes = bottomLikes;

        template = template; // photographer home - custom html element
    }
}

function PhotographerFactory() {
    this.create = ( id, name, ...args) => {
        return new Photographer(id, name, ...args);
    }
}



class MediaItem {
    constructor(id, photograperId, tags, likes, date, price) {
        id = id;
        photograperId = photograperId;
        tags = tags;
        likes = likes;
        date = date;
        price = price;
    }
}

function MediaItemFactory() {
    this.create = ( id, photograperId, ...args) => {
        return new MediaItem(id, photograperId, ...args);
    }
}



fetch(url)
    .then(response => response.json())
    .then(json => {
        let photographers = json.photographers;
        let media = json.media;
        initializeApp(photographers, media);
});

let myphotographers = [];
let mymedias= [];

function initializeApp(photographers, media) {

    let photographerFactory = new PhotographerFactory();
    let mediaItemFactory = new MediaItemFactory();

    photographers.forEach( photographer => {

        photographerFactory.create(
            photographer.id,
            photographer.name,
            photographer.tagline,
            photographer.portraitName,
            photographer.portraitSrc,
            photographer.url,
            photographer.city, photographer.country,
            photographer.price,
            photographer.bottomLikes,
            photographer.tags, photographer.tagsTemplate,
            photographer.template = new PhotographerTemplateHome(photographer.id),
            photographer.photographerMedia = []
        );
        myphotographers.push(photographer);
    });
    // console.log('myphotographers=',myphotographers);


    media.forEach(mediaItem => { 

        mediaItemFactory.create(
            mediaItem.id,
            mediaItem.photographerId,
            mediaItem.likes,
            mediaItem.date,
            mediaItem.price,
            mediaItem.tags
        );

        mymedias.push(mediaItem);
    });
    // console.log('mymedias==', mymedias);

    myphotographers.forEach(photog => { 
        mymedias.forEach(med => { 
            if (photog.id === med.photographerId) {
                photog.photographerMedia.push(med);
            }
        })
    })
    console.log('myphotographers=',myphotographers);


    //html templates
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
            photographerWrapperHome.setAttribute('id', 'photographer-'+ photographer.name); // + name
            photographerWrapperHome.setAttribute('aria-label', photographer.name + ' presentation');


            // create clickable photographer main presentation block (name+pic)
            const photographerMainBlock = photographerWrapperHome.appendChild(document.createElement('div'));
            photographerMainBlock.setAttribute('class', 'photographer__main-block');
            photographerMainBlock.innerHTML = `
                <a aria-label="go to ${photographer.name} page">
                    <img class="photographer__pic home" src="${photographer.portraitSrc}" alt="${photographer.name} presentation picture" id="${photographer.name}-pres-picture">
                    <h2 class="photographer__name home" id="${photographer.name}">${photographer.name}</h2>
                </a>
                `;

            // add event listener on this block, that calls the photographer page with id as param
            photographerMainBlock.addEventListener('click', function(e) { initPhotographerPageView(e, photographer.id); }, false); // ------ TO REVIEW : always same LAST ID of api IS PASSED
            
            // create photographer infos block main presentation block
            const photographerInfosBlock = photographerWrapperHome.appendChild(document.createElement('div'));
            photographerInfosBlock.setAttribute('class', 'photographer__text-infos');
            photographerInfosBlock.setAttribute('aria-label', 'photographer infos');
            photographerInfosBlock.innerHTML = `
                        <h3 class="photographer__location home" id="${photographer.name}-location">${photographer.city}, ${photographer.country}</h3>
                        <h4 class="photographer__tagline home" id="${photographer.name}-tagline">${photographer.tagline}</h4>
                        <h5 class="photographer__price home" id="${photographer.name}-price">${photographer.price}</h5>
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
}