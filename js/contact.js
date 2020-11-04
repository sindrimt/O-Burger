// DEPENDS ON submitImplementation.js TO WORK!

var reloadText = "Your mail has been sent! We will respond as soon as possible.";
var reloadButtonText = "Back to contact page";

var bodyEL = document.querySelector("body");
var buttonEL = document.querySelector("#contactSend");
var contentEL = document.getElementsByClassName("content")[0];
buttonEL.type = "button";  // This button is made out of button
buttonEL.addEventListener("click", function () { Submit(reloadButtonText, reloadText); });