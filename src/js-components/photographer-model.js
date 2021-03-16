
// BEFORE ES6 SYNTAX
/* function PhotographerModel(properties) {

    this.photographerName = properties.photographerName;
    this.idPicUrl = properties.idPicUrl;
    this.photographerPageUrl = properties.photographerPageUrl;
    this.photographerLocation = properties.photographerLocation;
    this.photographerTagline = properties.photographerTagline;
    this.photographerPrice = properties.photographerPrice;
    this.photographerTagsList = properties.photographerTagsList;
    this.photographerLikes = properties.photographerLikes;
    this.photographerPics = properties.photographerPics;
} */


// SINCE ES6 CLASS SYNTAX ('function' is suppressed, 'construtor' comes in )
class Photographer {
    constructor(id, name, idPic, url, city, country){
        id = id;
        name = name;
        idPic = idPic;
        city = city;
        country = country;
        tagline = tagline;
        tags = tags;
        likes = likes; // as coming from json api
        url = url;
        price = price;
        gallery = gallery;
    }

    getPhotographerTags(id) {
        tags.forEach( x => console.log('tag==', x));
    }
}


class Photo { 
    constructor(photoId, photoUrl, photoTitle, photoPrice, PhotoLikes) {
        photoId = photoId;
        photoUrl = photoUrl;
        photoTitle = photoTitle;
        photoPrice = photoPrice;
        PhotoLikes = PhotoLikes;
    }
    addLike() { this.PhotoLikes+=1 };
    getLikes() { return this.PhotoLikes }; // as modified by user after 'addLike()' 
}