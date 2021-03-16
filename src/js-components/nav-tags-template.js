
const navTags = ['portrait', 'paysage']; /* mock data  */


class NavTags extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode:'open'});
        const navTagsTemplate = document.createElement('nav');
        const navTagsTemplateUl = navTagsTemplate.appendChild(document.createElement('ul'));

        // link component to main stylesheet  ============> ! does not work in webpack
        const navstyle = document.createElement('link');
        navstyle.setAttribute('rel', 'stylesheet');
        navstyle.setAttribute('href', '../css/style.css');

        for (let i = 0; i < navTags.length; i++)  {
            var navTagListItem = document.createElement('li');
            navTagListItem.innerHTML = `
                <a href="" class="nav-tag" id="${navTags[i]}+'-nav-tag'">${navTags[i]}</a>
            `;
            navTagsTemplateUl.appendChild(navTagListItem);
        };
        // Attach stylesheet to component
        shadowRoot.appendChild(navstyle);
        // Attach the created elements to the shadow dom
        shadowRoot.appendChild(navTagsTemplateUl); 
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