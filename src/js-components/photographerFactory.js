import Photographer from './photographer-model';


// Define skeleton for factory
function PhotographerFactory() {}

// Define prototypes & utilities for factory
PhotographerFactory.prototype.photographerClass = Photographer; // what the factory is going to generate as a default class

PhotographerFactory.prototype.createPhotographer = function (properties) {  // factory method for creating new instances 
    // if ( options.whatever === "xxx") { this.photographerClass = yyyy } etc
    return new this.photographerClass(properties);
}
// 3/ Create an instance of factory that makes photographers
var photographerFact = new PhotographerFactory();
var photog = photographerFact.createPhotographer(properties);