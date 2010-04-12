/*
 * JsSlideshow
 * http://github.com/oyvindkinsey/JsSlideshow
 * Copyright(c) 2010, Øyvind Sean Kinsey, http://kinsey.no/ oyvind@kinsey.no.
 *
 * MIT Licensed
 *
 */
function JsSlideshow(config){
    var images = [], target, time, transition, timer, image, steps, i, len, first;
    
    function _fade(opacity){
        opacity = opacity - (1 / steps);
        if (opacity > 0) {
            image.style.opacity = opacity;
            image.style.filter = "alpha(opacity=" + (opacity * 100) + ")";
            timer = window.setTimeout(function(){
                _fade(opacity);
            }, (transition / steps));
        }
        else {
            target.insertBefore(image, target.firstChild);
            image.style.opacity = 1;
            image.style.filter = "alpha(opacity=100)";
            images = target.getElementsByTagName("img");
            image = images[images.length - 1];
            timer = window.setTimeout(function(){
                _fade(1);
            }, time);
        }
    }
    
    target = typeof config.target === "string" ? document.getElementById(config.target) : config.target;
    images = config.images;
    time = config.time;
    transition = config.transition;
    steps = config.steps || 50;
    
    if (config.url) {
        target.onclick = function(){
            window.location = config.url;
        };
        target.style.cursor = "pointer";
    }
    
    for (i = 0, len = images.length; i < len; i++) {
        image = document.createElement("img");
        image.style.position = "absolute";
        image.style.top = "0px";
        image.style.left = "0px";
        image.src = images[i];
        if (first) {
            target.insertBefore(image, target.firstChild);
        }
        else {
            first = image;
            target.appendChild(image);
        }
    }
    image = first;
    timer = window.setTimeout(function(){
        _fade(1);
    }, time);
}
