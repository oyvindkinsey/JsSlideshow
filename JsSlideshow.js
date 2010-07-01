/*
 * JsSlideshow
 * http://github.com/oyvindkinsey/JsSlideshow
 * Copyright(c) 2010, Øyvind Sean Kinsey, http://kinsey.no/ oyvind@kinsey.no.
 *
 * MIT Licensed
 *
 */
function JsSlideshow(config){
    var index = 0, target, time, transition, timer, steps, image;
    
    function _fade(opacity){
        opacity = opacity - (1 / steps);
        if (opacity > 0) {
            // keep fading
            image.style.opacity = opacity;
            image.style.filter = "alpha(opacity=" + (opacity * 100) + ")";
            timer = window.setTimeout(function(){
                _fade(opacity);
            }, (transition / steps));
        }
        else {
            // slide
            var prevIndex = index;
            if (++index == config.images.length) {
                index = 0;
            }
            if (config.listeners.slide) {
                config.listeners.slide(config.images[prevIndex], config.images[index]);
            }
            var prevImage = image;
            image = config.images[index].dom;
            // move the image to the back
            target.insertBefore(prevImage, target.firstChild);
            // reset the opacity
            prevImage.style.opacity = 1;
            prevImage.style.filter = "alpha(opacity=100)";
            // start a new slide
            timer = window.setTimeout(function(){
                _fade(1);
            }, time);
        }
    }
    
    target = typeof config.target === "string" ? document.getElementById(config.target) : config.target;
    
    time = config.time;
    transition = config.transition;
    steps = config.steps || 50;
    
    if (config.url) {
        target.onclick = function(){
            window.location = config.url;
        };
        target.style.cursor = "pointer";
    }
    if (!config.listeners) {
        config.listeners = {};
    }
    // load the images
    for (var i = 0, len = config.images.length; i < len; i++) {
        image = document.createElement("img");
        image.style.position = "absolute";
        image.style.top = "0px";
        image.style.left = "0px";
        image.src = config.images[i].url;
        image.title = config.images[i].title;
        target.insertBefore(image, target.firstChild);
        config.images[i].dom = image;
    }
    image = config.images[0].dom;
    //start a slide
    if (config.listeners.slide) {
        config.listeners.slide(null, config.images[index]);
    }
    timer = window.setTimeout(function(){
        _fade(1);
    }, time);
}
