let inputs = {
    redLightInput: document.querySelector('.traffic-light-menu-div #red-light-timer-input'),
    yellowLightInput: document.querySelector('.traffic-light-menu-div #yellow-light-timer-input'),
    greenLightInput: document.querySelector('.traffic-light-menu-div #green-light-timer-input')
};

let btns = {
    startLightBtn: document.querySelector('.traffic-light-menu-div #start-light-btn'),
    stopLightBtn: document.querySelector('.traffic-light-menu-div #stop-light-btn')
};

let lightDivs = {
    redLightDivLeft: document.querySelector('.traffic-light-div #red-light-div-left'),
    yellowLightDivLeft: document.querySelector('.traffic-light-div #yellow-light-div-left'),
    greenLightDivLeft: document.querySelector('.traffic-light-div #green-light-div-left'),
    
    redLightDivCenter: document.querySelector('.traffic-light-div #red-light-div-center'),
    yellowLightDivCenter: document.querySelector('.traffic-light-div #yellow-light-div-center'),
    greenLightDivCenter: document.querySelector('.traffic-light-div #green-light-div-center'),
    
    redLightDivRight: document.querySelector('.traffic-light-div #red-light-div-right'),
    yellowLightDivRight: document.querySelector('.traffic-light-div #yellow-light-div-right'),
    greenLightDivRight: document.querySelector('.traffic-light-div #green-light-div-right')
};

const enterKey = 13;
const escapeKey = 27;

let currentTimeout;
let greenLightTime, yellowLightTime, redLightTime;

let trafiicLightImg = document.getElementById('traffic-light-photo');             //for changing traffic light img
let trafficLightSelect = document.getElementById('traffic-light-select');         //for changing traffic light img
let trafficLightWrapper = document.querySelector('.traffic-light-flex-container');//for changing traffic light img

btns.startLightBtn.addEventListener('click', onStartLightBtnClick);
btns.stopLightBtn.addEventListener('click', onStopLightBtnClick);

inputs.redLightInput.addEventListener('input', checkLightInputValidity);
inputs.yellowLightInput.addEventListener('input', checkLightInputValidity);
inputs.greenLightInput.addEventListener('input', checkLightInputValidity);

window.addEventListener('keydown', onKeyDown);

trafficLightSelect.addEventListener('change', (event) => {
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

function redLightOn() {
    lightDivs.redLightDivCenter.style.backgroundColor = 'red';
    lightDivs.greenLightDivRight.style.backgroundColor = 'green';
    lightDivs.greenLightDivLeft.style.backgroundColor = 'green';
    currentTimeout = setTimeout(function() {
        lightDivs.redLightDivCenter.style.backgroundColor = 'black';
        lightDivs.greenLightDivRight.style.backgroundColor = 'black';
        lightDivs.greenLightDivLeft.style.backgroundColor = 'black';
        yellowLightOn('red');
    }, redLightTime * 1000);    
}

function yellowLightOn(previusColor) {
    lightDivs.yellowLightDivCenter.style.backgroundColor = 'yellow';
    lightDivs.yellowLightDivRight.style.backgroundColor = 'yellow';
    lightDivs.yellowLightDivLeft.style.backgroundColor = 'yellow';
    currentTimeout = setTimeout(function() {
        lightDivs.yellowLightDivCenter.style.backgroundColor = 'black';
        lightDivs.yellowLightDivRight.style.backgroundColor = 'black';
        lightDivs.yellowLightDivLeft.style.backgroundColor = 'black';
        previusColor === 'red' ? greenLightOn() : redLightOn();
    }, yellowLightTime * 1000);
}

function greenLightOn() {
    lightDivs.greenLightDivCenter.style.backgroundColor = 'green';
    lightDivs.redLightDivRight.style.backgroundColor = 'red';
    lightDivs.redLightDivLeft.style.backgroundColor = 'red';
    currentTimeout = setTimeout(function() {
        lightDivs.greenLightDivCenter.style.backgroundColor = 'black';
        lightDivs.redLightDivRight.style.backgroundColor = 'black';
        lightDivs.redLightDivLeft.style.backgroundColor = 'black';
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