


// ======  ( MOCK DATA )// ======  ( MOCK DATA ) 
    const photographerName = 'test';
    const id = 45;
    const idPicUrl = "assets/img/Photographers_ID_photos/S/EllieRoseWilkens_S.jpg";
    const photographerPageUrl = "";
    const photographerLocation = "Paris";
    const photographerTagline = "get shit done";
    const photographerPrice = 78 + "€";
    const photographerTags = ['portrait', 'paysage'];
    const photographerLikes = 78;
    
    const galleryPath = "assets/img/Ellie Rose";// + photographerName;
    const galleryImgsSize = "S" || "XL"; // ===> depends on context (photographer page or lightbox)
    const photoName = "/Architecture_Connected_Curves_S";
    
    const photographerGallery = [
        galleryPath + galleryImgsSize + "/Architecture_Connected_Curves_S",
        "assets/img/Ellie Rose/S/Architecture_Connected_Curves_S",
        "assets/img/Ellie Rose/S/Architecture_Connected_Curves_S",
        "assets/img/Ellie Rose/S/Architecture_Connected_Curves_S",
        "assets/img/Ellie Rose/S/Architecture_Connected_Curves_S"
    ]


// ----------------------------------------------------
// PHOTOGRAPHER CUSTOM HTML ELEMENT - HOME
// ----------------------------------------------------
class PhotographerTemplateHome extends HTMLElement {
    constructor() {
        super();

        // uses photographer model -------

        // link component to main stylesheet  ============> does not work in webpack
        const styleHome = document.createElement('link');
        styleHome.setAttribute('rel', 'stylesheet');
        styleHome.setAttribute('href', '../css/style.css');

        // create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // create component main container div
        const photographerWrapperHome = document.createElement('div');

        // set main container div attributes/properties
        photographerWrapperHome.setAttribute('class', 'photographer photographer--home');
        photographerWrapperHome.setAttribute('id', 'photographer-'+ photographerName); // + name
        photographerWrapperHome.setAttribute('aria-label', photographerName + ' presentation');


        // create clickable photographer main presentation block (name+pic)
        const photographerMainBlock = photographerWrapperHome.appendChild(document.createElement('div'));
        photographerMainBlock.setAttribute('class', 'photographer__main-block');
        photographerMainBlock.innerHTML = `
            <a href="${photographerPageUrl}" aria-label="go to ${photographerName} page">
                <img class="photographer__pic home" src="${idPicUrl}" alt="${photographerName} presentation picture" id="${photographerName}-pres-picture">
                <h2 class="photographer__name home" id="${photographerName}">${photographerName}</h2>
            </a>
            `;
        
        // create photographer infos block main presentation block
        const photographerInfosBlock = photographerWrapperHome.appendChild(document.createElement('div'));
        photographerInfosBlock.setAttribute('class', 'photographer__text-infos');
        photographerInfosBlock.setAttribute('aria-label', 'photographer infos');
        photographerInfosBlock.innerHTML = `
                    <h3 class="photographer__location home" id="${photographerName}-location">${photographerLocation}</h3>
                    <h4 class="photographer__tagline home" id="${photographerName}-tagline">${photographerTagline}</h4>
                    <h5 class="photographer__price home" id="${photographerName}-price">${photographerPrice}</h5>
                    <div class="photographer__tags-list tags-list home" id="${photographerName}-tags">
                        <a href="" class="nav-tag" id="nav-tag">rerere</a>
                        <a href="" class="nav-tag" id="nav-tag">rerere</a>
                        <a href="" class="nav-tag" id="nav-tag">Ibvvv</a>
                    </div>
        `;

        // Attach stylesheet to component
        shadow.appendChild(styleHome);
        // Attach the created elements to the shadow dom
        shadow.appendChild(photographerWrapperHome);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('photographer-component-home', PhotographerTemplateHome);



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
        photographerWrapperPage.setAttribute('id', 'photographer-'+ photographerName); // + name
        photographerWrapperPage.setAttribute('aria-label', photographerName + ' presentation');


        // create photographer main presentation block (top infos + bottom likes / price)

        photographerWrapperPage.innerHTML = `
            <img class="photographer__pic page" src="${idPicUrl}" alt="${photographerName} presentation picture" id="${photographerName}-pres-picture">
            <div class="photographer__text-infos">
                <h1 class="photographer__name page" id="${photographerName}">${photographerName}</h1>
                <h2 class="photographer__location page" id="${photographerLocation}">${photographerLocation}</h2>
                <h3 class="photographer__tagline page" id="${photographerName}-tagline">${photographerTagline}</h3>
                <div class="photographer__tags-list tags-list page" id="${photographerTags}"></div>
            </div>

            <div class="photographer__bottom-infos" id="bottom-infos">
                <h4 class="photographer__likes" id="${photographerLikes}">${photographerLikes}</h4>
                <h4 class="photographer__price" id="${photographerPrice}">${photographerPrice}</h4>
            </div>
        `;

        // create component container SECTION for GALLERY
        const galleryWrapper = document.createElement('section');
        // set GALLERY SECTION container +  attributes/properties
        galleryWrapper.setAttribute('class', 'gallery-wrapper');
        galleryWrapper.setAttribute('id', 'gallery-section-'+ photographerName);
        galleryWrapper.setAttribute('aria-label', photographerName + ' gallery collection');

        // Gallery section consists of a ul element (which imgs content are generated separately
        const photoList = galleryWrapper.appendChild(document.createElement('ul'));
        photoList.setAttribute('class', 'gallery');
        photoList.setAttribute('id', photographerName + '-gallery-list');
        galleryWrapper.setAttribute('aria-label', photographerName + ' photo gallery');

        //  HERE: APPEND PHOTO-LIST LI ELEMENTS  / 


        // Attach stylesheet to component
        shadow2.appendChild(stylePage);
        // Attach the created elements to the shadow dom
        shadow2.appendChild(photographerWrapperPage);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('photographer-component-page', PhotographerTemplatePage);
