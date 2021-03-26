
//API url
var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json';
const tagslistMainNav = [ 'portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];  
var portraitAssetsPath = './assets/img/portraits/S/';

// OBJECTS models =============  ----> + to be used with factory
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

        photographerMedia = photographerMedia; // = []
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
        // mediaItemType = type;
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
            photographer.template,
            photographer.photographerMedia
        );
        myphotographers.push(photographer);
    });
    console.log(myphotographers);



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
    console.log(mymedias);
}