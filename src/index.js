
// temporary for tests
// USE IIFE to run this chunk of code 
var indexStart = (function(){

    // =============================IIFE variables are private
    // Retrieve data from API
    //------------------------------
    //API url
    var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
    
    // define variables to store incoming data  ----> use factory/models
    var dataFromApi = {};
    var photographers = [];
    var media = [];
    
    // mock data =============  ----> use factory/models
        class Photographer {
            constructor(id, name, idPic, url, city, country){
                id = id;
                name = name;
                idPic = idPic;
                city = city;
                country = country;
                tagline = tagline;
                tags = tags;
                // likes = likes; // as coming from json api
                url = url;
                price = price;
                gallery = gallery;
            }
            getPhotographerTags(id) {
                tags.forEach( x => console.log('tag==', x));
            }
        }

    /*  var photographer1 = new Photographer('Ellie Rose',5,{ 
                                                                photographerId: 5,
                                                                tags: ['xx', 'yy'],
                                                                likes: 78,
                                                                price: 78,
                                                                image: "xx.jpg"
                                                            } ); */
    // ======================
    
    return { // ============== makes methods public for other parts of app to call BUT result returned still 



        // GET ALL DATA FROM API ====================================
        // ( colon, for this part of iife is an object )





        

        
        
        
        // For each photographer from api, generate profile using factory and custom html template
        // HERE : use OPTIONS / PARAMS  to determine WHICH PAGE the profile/template is generated for,
        // for profile HOME ≠ Photographer page (media = not required on homepage + template slightly different)
        generatePhotographerProfile: function (homepage, page){
        // function generatePhotographerProfile(homepage, page){
            photographers.forEach(profile => {
                if (homepage) {  /* generate HOME  profile */ }
                if (page) {  /* generate PAGE  profile */ }
            })
        },
        
        
        
        
        // POST FORM CONTACT ----------- // Default options are marked with *
        postFormData: async function(url='', data = {}) {
        // async function postFormData(url='', data = {}) {
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
    }
        /* postFormData('SOMEURL', { answer: 42 })
            .then(data => {  console.log(data); // JSON data parsed by `data.json()` call  
        }); */
}());

var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
    
// define variables to store incoming data  ----> use factory/models
var dataFromApi = {};
var photographers = [];
var media = [];



// ( PURE PROMISES SYNTAX ( ≠ AWAIT SYNTAX ))
async function getAllDataFromApi() {

    try {
        fetch(url)
            .then(response => response.json())
            .then( data =>  {                    // will run at some point in the future when the response has been returned
                Object.assign(dataFromApi,data); // all data object
                photographers.push(data.photographers); // only photographers array
                media.push(data.media); // only media array
                // eventually HERE : function to use 'dataFromApi, photographers, media'  - e.g : call function that triggers components creation
                // but, here we don't need all data at the same time (different pages/different needs),
                // so instead, return variables that will then be called independently -- ?
                // or different functions to dispatch data according to needs -- ? 
            })

            return [dataFromApi, photographers, media];
    } catch (error) { console.log(error);}
}


async function getPhotographerInfos(id) {

    await getAllDataFromApi();  // wait for async data to come through
    // console.log(photographers); ----- OK
    // photographers.forEach(x => console.log(x));  ----- NOT OK
}



fetch(url)
    .then(response => { response.blob(); })
    .then(blob =>  {
    // Convert the blob to an object URL — this is basically a temporary internal URL
    // that points to an object stored inside the browser
        let objectURL = URL.createObjectURL(blob);
    // invoke showProduct
        showProduct(objectURL, product);
    });




window.onload = () =>  { 
    //getAllDataFromApi();
    // console.log(photographers);console.log(media);console.log(dataFromApi);
    getPhotographerInfos(243);
}






