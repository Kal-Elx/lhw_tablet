const DISPLAY_TIME = 5000; // ms to show textbox
const TAGS = ["said", "heard", "show"];
const KEYWORDS = new Set(["Pepper", "keyword"]);
const HAND_ME_THAT_PATH = "../images/hand-me-that/";
const HAND_ME_THAT_SRCS = {"banana" : "banana.jpg", "coffee cup" : "coffee_cup.jpg"};
const HAND_ME_THAT_DESCRIPTIONS = {"banana" : "Banana", "coffee cup" : "Cup of coffee"};

var speechTextBox = document.getElementById("pepper_speech");
var listenTextBox = document.getElementById("pepper_listen");
var imageSection = document.getElementById("img_shower");
var imageSrc = document.getElementById("img_src");
var imageDescription = document.getElementById("img_description");

var socket;
var currentTimeout = null;

// Just for debug. Remove when ROS works.
var speakButton = document.getElementById("speak_button");
var hearButton = document.getElementById("hear_button");
var bananaButton = document.getElementById("banana_button");
var coffeeCupButton = document.getElementById("coffee_cup_button");
speakButton.addEventListener("click", s);
hearButton.addEventListener("click", l);
bananaButton.addEventListener("click", b);
coffeeCupButton.addEventListener("click", c);
function s () { performAction("said", "This is what Pepper said") };
function l () { performAction("heard", "This is what Pepper heard") };
function b () { performAction("show", "banana") };
function c () { performAction("show", "coffee cup") };

function performAction(tag, msg) {
    switch (tag) {
        case "said":
            speak(msg);
            break;
        case "heard":
            listen(msg);
            break;
        case "show":
            show(msg);
            break;
        default:
            alert("Unvalid tag");
            break;
    }
}

function speak(str) {
    // Note: will not work if keyword is followed by something other than space
    words = str.split(" ");
    for (var i = 0; i < words.length; ++i)
        if (KEYWORDS.has(words[i]))
            words[i] = "<span class=\"keyword\">" + words[i] + "</span>";
    
    speechTextBox.innerHTML = "\"" + words.join(" ") + "\"";
    display(speechTextBox);
}

function listen(str) {
    listenTextBox.textContent = str;
    display(listenTextBox);
}

function show(id) {
    imageSrc.src = HAND_ME_THAT_PATH + HAND_ME_THAT_SRCS[id];
    imageDescription.innerText = HAND_ME_THAT_DESCRIPTIONS[id];
    display(imageSection);
}

function display(elem) {
    hideAll();
    elem.hidden = false;

    // Hide after five seconds
    if (currentTimeout != null)
        clearTimeout(currentTimeout);
    currentTimeout = setTimeout(function () { elem.hidden = true; }, DISPLAY_TIME);
}

function hideAll() {
    speechTextBox.hidden = true;
    listenTextBox.hidden = true;
    imageSection.hidden = true;
}