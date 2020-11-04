//Elements from index.html
var bodyEL = document.querySelector("body");
var contentEL = document.querySelector("article.content");

//Left button
var lButton = document.createElement("button");
lButton.id = "lButton";
bodyEL.appendChild(lButton);

var timeoutVar;

//Right button
var RButton = document.createElement("button");
RButton.id = "RButton";
bodyEL.appendChild(RButton);

//Array with the img sources
var imgs = [
            '../imgs/index/happyHour.png',
            '../imgs/index/studentDiscount.png',
            '../imgs/index/shakeBanner.png',
            'https://media.tenor.com/images/5b61a360d83b8fccc05f5060b048c6e1/tenor.gif'
        ];

//Sets a base cooldown between each image change.
cooldown = 3000;
//Sets the first image as the first in the img list
count = 0;

//Changes the slides
function changeSlide(change) {
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

    document.getElementById('img1').src = imgs[count];
    // If the user clicked the left or right button, the timer for next slide should be reset.
    // Removes timeout.
    clearTimeout(timeoutVar);
    // Sets the timeout to the set cooldown
    timeoutVar = setTimeout("NextSlide()", cooldown);
    
}
function NextSlide() {changeSlide(1);}
function PrevSlide() {changeSlide(-1);}
// Clicks the left button => previous slide
lButton.addEventListener("click", PrevSlide);
// Clicks the right button => next slide
RButton.addEventListener("click", NextSlide)

// Runs slideshow for the first time
changeSlide(0);