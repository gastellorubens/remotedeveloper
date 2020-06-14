const input = document.getElementById("spanCountInput");
const display = document.getElementById("display");
const message = document.getElementById("message");
const button = document.getElementById("goToLastButton");

var baseHeight;
var renderedSpanCount;
var currentSpanCount = 0;
var timeout = null;

document.body.onscroll = () => {
    renderList();
}

input.oninput = (e) => {
    if (timeout) {
        clearTimeout(timeout);
    }
    message.innerText = '';
    currentSpanCount = e.target.value;
    console.log(currentSpanCount);
    renderedSpanCount = 0;
    displayClear();
    if (currentSpanCount > 0) {
        baseHeight = window.innerHeight;
        // if (baseHeight < document.body.scrollHeight) {
        //     button.disabled = false;
        //     button.onclick = () => {
        //         while (currentSpanCount > renderedSpanCount) {
        //             renderList();
        //         }
        //     }
        // }
        timeout = setTimeout(renderList, 700);
    }
    else {
        message.innerText = "Значение должно быть больше нуля."
    }
}
function renderList() {
    while (document.body.scrollHeight == baseHeight && currentSpanCount > renderedSpanCount) {
        appendElementToDisplay(renderedSpanCount++);
    }

    baseHeight = document.body.scrollHeight;

}

function createListElement(id) {
    let li = document.createElement("li");
    let span = document.createElement("span")
    span.id = id;
    span.innerText = getRandomValue();
    li.appendChild(span);
    return li;
}
function appendElementToDisplay(liId) {
    display.appendChild(createListElement(liId));

}
function getRandomValue(minInclusive = 0, maxExlusive = 10) {
    let random = Math.random() * (maxExlusive - minInclusive) + minInclusive;
    return Math.floor(random);
}
function displayClear() {
    display.innerHTML = '';
}