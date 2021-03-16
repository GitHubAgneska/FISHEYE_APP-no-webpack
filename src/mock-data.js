


// ======  ( MOCK DATA )

const photographerTest = {
    
    photographerName = 'test',
    id = 45,
    idPicUrl = "assets/img/Photographers_ID_photos/S/EllieRoseWilkens_S.jpg",
    photographerPageUrl = "",
    photographerLocation = "Paris",
    photographerTagline = "get shit done",
    photographerPrice = 78 + "€",
    photographerTags = ['portrait', 'paysage'],
    photographerLikes = 78,
    
    galleryPath = "assets/img/Ellie Rose",// + photographerName,
    galleryImgsSize = "S" || "XL", // ===> depends on context (photographer page or lightbox)
    photoName = "/Architecture_Connected_Curves_S",
    
    photographerGallery = [
        galleryPath + galleryImgsSize + "/Architecture_Connected_Curves_S",
        "assets/img/Ellie Rose/S/Architecture_Connected_Curves_S",
        "assets/img/Ellie Rose/S/Architecture_Connected_Curves_S",
        "assets/img/Ellie Rose/S/Architecture_Connected_Curves_S",
        "assets/img/Ellie Rose/S/Architecture_Connected_Curves_S"
    ]
}


// photographerGallery.forEach(photo =>  // generate html chunk from photo-template )
