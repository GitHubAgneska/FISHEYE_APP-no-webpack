
const navTags = ['portrait', 'paysage']; /* mock data  */


class NavTags extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode:'open'});
        // create nav section
        const navTagsTemplate = document.createElement('nav');
        navTagsTemplate.setAttribute('class', 'header__nav tags-list home');

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
            navTagItem.setAttribute('href', "");

            var navTagItemContent = document.createTextNode(navTags[i]);
            navTagItem.appendChild(navTagItemContent);
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



// draft ================================================
/* var navTagListItem = document.createElement('li');
var navTagItem = document.createElement('a');
navTagListItem.appendChild(navTagItem);
navTagItem.setAttribute('class', 'nav-tag');
navTagItem.setAttribute('id', navTags[i]+'-nav-tag');

var navTagItemContent = document.createTextNode(navTags[i]);
navTagItem.appendChild(navTagItemContent);
navTagsTemplateUl.appendChild(navTagItem); */
// ================================================ draft 