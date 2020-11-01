function Order(buttonText, responseText)
{
    articleEL.innerHTML = "";
    var responseEL = document.createElement("div");
    responseEL.className = "response";
    responseEL.innerHTML = responseText+"<br>";
    var backButtonEL = document.createElement("button");
    backButtonEL.className = "orderButton";
    backButtonEL.innerText = buttonText;
    backButtonEL.addEventListener("click", Reload);
    responseEL.appendChild(backButtonEL);
    articleEL.appendChild(responseEL);
}
function Reload()
{
    window.location.href = "";
}