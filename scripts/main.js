const input = document.getElementById("spanCountInput");
const display = document.getElementById("display");
const message = document.getElementById("message");
const button = document.getElementById("goToLastButton");


var baseHeight;
var renderedSpanCount;
var currentSpanCount = 0;
var timeout = null;

input.oninput = (e) => {
    reset();
    document.body.onscroll = () => {
        renderList();
    }
    currentSpanCount = e.target.value;
    if (currentSpanCount > 0) {
        baseHeight = window.innerHeight;
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
    let span = document.createElement("span");
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
function reset() {
    if (timeout) {
        clearTimeout(timeout);
    }
    message.innerText = '';
    display.innerHTML = '';
    renderedSpanCount = 0;
}