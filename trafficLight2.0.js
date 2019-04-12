const inputs = {
    redLightInput: document.querySelector('.traffic-light-menu-div .red-light-timer-input'),
    yellowLightInput: document.querySelector('.traffic-light-menu-div .yellow-light-timer-input'),
    greenLightInput: document.querySelector('.traffic-light-menu-div .green-light-timer-input')
};

const btns = {
    startLightBtn: document.querySelector('.traffic-light-menu-div .start-light-btn'),
    stopLightBtn: document.querySelector('.traffic-light-menu-div .stop-light-btn')
};

const lightDivs = {
    redLightDivLeft: document.querySelector('.traffic-light-div .left-part .red-circle'),
    yellowLightDivLeft: document.querySelector('.traffic-light-div .left-part .yellow-circle'),
    greenLightDivLeft: document.querySelector('.traffic-light-div .left-part .green-circle'),
    
    redLightDivCenter: document.querySelector('.traffic-light-div .center-part .red-circle'),
    yellowLightDivCenter: document.querySelector('.traffic-light-div .center-part .yellow-circle'),
    greenLightDivCenter: document.querySelector('.traffic-light-div .center-part .green-circle'),
    
    redLightDivRight: document.querySelector('.traffic-light-div .right-part .red-circle'),
    yellowLightDivRight: document.querySelector('.traffic-light-div .right-part .yellow-circle'),
    greenLightDivRight: document.querySelector('.traffic-light-div .right-part .green-circle')
};

const enterKey = 13;
const escapeKey = 27;

let currentTimeout;
let greenLightTime, yellowLightTime, redLightTime;

//for changing traffic light img
let trafiicLightImg = document.querySelector('.traffic-light-div .traffic-light-photo');
let trafficLightSelect = document.querySelector('.traffic-light-menu-div .traffic-light-select');
let trafficLightWrapper = document.querySelector('.traffic-light-flex-container');

btns.startLightBtn.addEventListener('click', onStartLightBtnClick);
btns.stopLightBtn.addEventListener('click', onStopLightBtnClick);

inputs.redLightInput.addEventListener('input', checkLightInputValidity);
inputs.yellowLightInput.addEventListener('input', checkLightInputValidity);
inputs.greenLightInput.addEventListener('input', checkLightInputValidity);

window.addEventListener('keydown', onKeyDown);

trafficLightSelect.addEventListener('change', event => {
    const {value} = event.target;
    if (value === 'another') {
        trafiicLightImg.style.backgroundImage = 'url(img/2.png)'; 
        trafficLightWrapper.classList.add('png2');
        trafficLightWrapper.classList.remove('png1');
    } else {
        trafiicLightImg.style.backgroundImage = 'url(img/1.png)'; 
        trafficLightWrapper.classList.add('png1');
        trafficLightWrapper.classList.remove('png2');
    }
});

function setElementBackgroundColor(element, color) {
    element.style.backgroundColor = color;
}

function redLightOn() {
    setElementBackgroundColor(lightDivs.redLightDivCenter, 'red');
    setElementBackgroundColor(lightDivs.greenLightDivRight, 'green');
    setElementBackgroundColor(lightDivs.greenLightDivLeft, 'green');
    currentTimeout = setTimeout(function() {
        setElementBackgroundColor(lightDivs.redLightDivCenter, 'black');
        setElementBackgroundColor(lightDivs.greenLightDivRight, 'black');
        setElementBackgroundColor(lightDivs.greenLightDivLeft, 'black');
        yellowLightOn('red');
    }, redLightTime * 1000);    
}

function yellowLightOn(previusColor) {
    setElementBackgroundColor(lightDivs.yellowLightDivCenter, 'yellow');
    setElementBackgroundColor(lightDivs.yellowLightDivRight, 'yellow');
    setElementBackgroundColor(lightDivs.yellowLightDivLeft, 'yellow');
    currentTimeout = setTimeout(function() {
        setElementBackgroundColor(lightDivs.yellowLightDivCenter, 'black');
        setElementBackgroundColor(lightDivs.yellowLightDivRight, 'black');
        setElementBackgroundColor(lightDivs.yellowLightDivLeft, 'black');
        previusColor === 'red' ? greenLightOn() : redLightOn();
    }, yellowLightTime * 1000);
}

function greenLightOn() {
    setElementBackgroundColor(lightDivs.greenLightDivCenter, 'green');
    setElementBackgroundColor(lightDivs.redLightDivRight, 'red');
    setElementBackgroundColor(lightDivs.redLightDivLeft, 'red');
    currentTimeout = setTimeout(function() {
        setElementBackgroundColor(lightDivs.greenLightDivCenter, 'black');
        setElementBackgroundColor(lightDivs.redLightDivRight, 'black');
        setElementBackgroundColor(lightDivs.redLightDivLeft, 'black');
        yellowLightOn('green');
    }, greenLightTime * 1000);
}

function onStartLightBtnClick() {
    onStopLightBtnClick();
    btns.stopLightBtn.disabled = false;
    redLightTime = inputs.redLightInput.value;
    yellowLightTime = inputs.yellowLightInput.value; 
    greenLightTime = inputs.greenLightInput.value;
    redLightOn();
} 

function onStopLightBtnClick() {
    btns.stopLightBtn.disabled = true;
    clearTimeout(currentTimeout);
    for (let lightDiv in lightDivs) {
        lightDivs[lightDiv].style.backgroundColor = 'black';
    }
}

function checkLightInputValidity() {
    if (!inputs.redLightInput.validity.valid || 
        !inputs.yellowLightInput.validity.valid || 
        !inputs.greenLightInput.validity.valid) {
        btns.startLightBtn.disabled = true;
    } else {
        btns.startLightBtn.disabled = false;
    }
}

function onKeyDown(e) {
    if (e.keyCode == enterKey) {
        onStartLightBtnClick();
    } else if (e.keyCode == escapeKey) {
        onStopLightBtnClick();
    }
}