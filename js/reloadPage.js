// This javascript file lets other javascript files have a common function to run.
// The Submit-function is supposed to be added as an eventlistener.
// The Submit-function, when executed, resets the current page and prints a message to the user,
// as well as creates a button to reload the page.
// useful for submitting forms.

function Submit(buttonText, responseText)
{
    var contentEL = document.querySelector("article.content");
    contentEL.innerHTML = "";
    var responseEL = document.createElement("div");
    responseEL.className = "response";
    responseEL.innerHTML = responseText+"<br>";
    var backButtonEL = document.createElement("button");
    backButtonEL.className = "orderButton";
    backButtonEL.innerText = buttonText;
    backButtonEL.addEventListener("click", Reload);
    responseEL.appendChild(backButtonEL);
    contentEL.appendChild(responseEL);
}
function Reload()
{
    window.location.href = "";
}