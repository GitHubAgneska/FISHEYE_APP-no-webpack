
// Retrieve data from API
//------------------------------

//API url
var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';

// define variables to store incoming data  ----> use factory/models
var dataFromApi = {};
var photographers = [];
var media = [];

// mock data =============  ----> use factory/models
    var photographer = { 
        name: 'Ellie Rose',
        id: 5,
        media:
        { 
            photographerId: 5,
            tags: ['xx', 'yy'],
            likes: 78,
            price: 78,
            image: "xx.jpg"
        } 
    };
// ======================


// GET ALL DATA FROM API ====================================
// ( PURE PROMISES SYNTAX ( ≠ AWAIT SYNTAX ))
function getDataFromApi() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            dataFromApi = data; // all data object
            photographers = data.photographers; // only photographers array
            media = data.media; // only media array
    }) 
}

// ATTACH MEDIA DATA from api to corresponding photographer, using photographer id as param
function getPhotographerMedia(id) {
    photographer.id = id;
    media.forEach(mediaElement => {
        if (mediaElement.photographerId === photographer.id) {
            photographer.media = mediaElement;
            console.log('full photographer with media == ', photographer);
        }
    })
}


// For each photographer from api, generate profile using factory and custom html template
// HERE : use OPTIONS / PARAMS  to determine WHICH PAGE the profile/template is generated for,
// for profile HOME ≠ Photographer page (media = not required on homepage + template slightly different)
function generatePhotographerProfile(homepage, page){
    photographers.forEach(profile => {
        if (homepage) {  /* generate HOME  profile */ }
        if (page) {  /* generate PAGE  profile */ }
    })
}







// POST FORM CONTACT ----------- // Default options are marked with *
async function postFormData(url='', data = {}) {
    const response = await fetch(url, {
        method: 'POST',              // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',                // no-cors, *cors, same-origin
        cache: 'no-cache',           // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',  // include, *same-origin, omit
        headers: {
            'Content-type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',             // manual, *follow, error
        referrerPolicy: 'no-referrer',  // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)      // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

postFormData('SOMEURL', { answer: 42 })
    .then(data => {  console.log(data); // JSON data parsed by `data.json()` call  
});






window.onload =  getDataFromApi();




// HOMEPAGE : photographers list
//------------------------------


// For each photographer of list, generate new photographer component
// using class Photographer
//------------------------------const navTags = ['portrait', 'paysage'];

