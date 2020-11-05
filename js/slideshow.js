//Elements from index.html
var bodyEL = document.querySelector("body");
var contentEL = document.querySelector("article.content");

var slideshowEL = document.getElementById("slideshow");
var slideImgEL = document.createElement("img");
slideImgEL.id = "slide";
slideImgEL.alt = "Slideshow";
slideshowEL.appendChild(slideImgEL);
//Left button
var lButton = document.createElement("button");
lButton.id = "lButton";
slideshowEL.appendChild(lButton);

var timeoutVar;
var phoneWidth = 600;  // Width, in pixels, before slideshow stops
//Right button
var RButton = document.createElement("button");
RButton.id = "rButton";
slideshowEL.appendChild(RButton);

//Array with the img sources
var imgs = [

            '../imgs/index/happyHourBanner.png',
            '../imgs/index/studentDiscountBanner.png',
            '../imgs/index/shakeBanner.png',
        ];

//Sets a base cooldown between each image change.
cooldown = 3000;
//Sets the first image as the first in the img list
count = 0;

//Changes the slides
function changeSlide(change) {
    // If the user clicked the left or right button, the timer for next slide should be reset.
    // Removes timeout.
    clearTimeout(timeoutVar);
    // Sets the timeout to the set cooldown
    timeoutVar = setTimeout("NextSlide()", cooldown);

    // vw is the width, in pixels, of the user's viewport
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw < phoneWidth)
    {  // Either mobile user or small window. This effectively disables slideshow and just displays the current image
      // However, if the page just got loaded, the current image is not rendered yet. This must be taken care of.
      if (!slideImgEL.hasAttribute("src")) slideImgEL.src = imgs[count];
      return;
    }
    count += change;

    /*Checks if the place in the list if count is before the first element in the list.
      If so, sets the count to the last element in the list*/
    if (count < 0) {
        count = imgs.length-1;
    }
    
    /*Checks if the place in the list if count is greater than the last element in the list.
      If so, sets the count to the first element in the list*/
    else if (count >= imgs.length) {
         count = 0;
    } 

    slideImgEL.src = imgs[count];
    
}
function NextSlide() {changeSlide(1);}
function PrevSlide() {changeSlide(-1);}
// Clicks the left button => previous slide
lButton.addEventListener("click", PrevSlide);
// Clicks the right button => next slide
RButton.addEventListener("click", NextSlide)

// Runs slideshow for the first time
changeSlide(0);