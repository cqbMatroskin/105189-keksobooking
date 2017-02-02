'use strict';
var tokyoMapElement = document.querySelector('.tokyo__pin-map');
var dialogElement = document.querySelector('.dialog');
var closeElement = dialogElement.querySelector('.dialog__close');
var formElement = document.querySelector('.notice__form');
var inputTitleElement = formElement.querySelector('#title');
var inputAddressElement = formElement.querySelector('#address');
var inputPriceElement = formElement.querySelector('#price');
var roomSelectElement = formElement.querySelector('#room_number');
var capacitySelectElement = formElement.querySelector('#capacity');
var timeInSelectElement = formElement.querySelector('#time');
var timeOutSelectElement = formElement.querySelector('#timeout');
var typeSelectElement = formElement.querySelector('#type');

var config = {
  REQUIRED: true,
  price: {
    MIN: 1000,
    MAX: 1000000,
    PALACE: 10000
  },
  title: {
    MIN_LENGTH: 30,
    MAX_LENGTH: 100
  }
};

var selectConfig = {
  room: {
    ONE: 1,
    TWO: 2,
    ONE_HUNDRED: 100
  },
  guest: {
    THREE: 3,
    ZERO: 0
  }
};

function completeOnLoad() {
  addValidateAttr();
  changeCapacitySelect();
}

function addValidateAttr() {
  inputTitleElement.required = config.REQUIRED;
  inputAddressElement.required = config.REQUIRED;
  inputPriceElement.required = config.REQUIRED;
  inputTitleElement.minLength = config.title.MIN_LENGTH;
  inputTitleElement.maxLength = config.title.MAX_LENGTH;
  inputPriceElement.min = config.price.MIN;
  inputPriceElement.max = config.price.MAX;
}

function getClosestElement(element, className) {
  while (element) {
    if (element.matches(className)) {
      return element;
    } else {
      element = element.parentElement;
    }
  }
  return null;
}

function onClickPin(evt) {
  var target = evt.target;
  var pin = getClosestElement(target, '.pin');
  if (pin) {
    selectPin(pin);
  }
}

function selectPin(target) {
  var pinActive = tokyoMapElement.querySelector('.pin--active');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
  target.classList.add('pin--active');
  dialogElement.classList.remove('invisible');
}

function closeDialog(evt) {
  evt.preventDefault();
  dialogElement.classList.add('invisible');
}

function changeCapacitySelect() {
  if (roomSelectElement.value < selectConfig.room.TWO) {
    capacitySelectElement.value = selectConfig.guest.ZERO;
  } else {
    capacitySelectElement.value = selectConfig.guest.THREE;
  }
}

function changeRoomSelect() {
  if (capacitySelectElement.value < selectConfig.guest.THREE) {
    roomSelectElement.value = selectConfig.room.ONE;
  } else {
    roomSelectElement.value = selectConfig.room.TWO;
  }
}

function synchronizeSelectTime(evt) {
  for (var i = 0; i < timeInSelectElement.length; i++) {
    if (evt.target === timeInSelectElement) {
      timeOutSelectElement[i].selected = timeInSelectElement[i].selected;
    } else {
      timeInSelectElement[i].selected = timeOutSelectElement[i].selected;
    }
  }
}

function changeTypeSelect() {
  var cheap = inputPriceElement.value < config.price.MIN;
  var apartment = inputPriceElement.value >= config.price.MIN && inputPriceElement.value < config.price.PALACE;
  if (cheap) {
    typeSelectElement[1].selected = true;
  } else if (apartment) {
    typeSelectElement[0].selected = true;
  } else {
    typeSelectElement[2].selected = true;
  }
}

completeOnLoad();
tokyoMapElement.addEventListener('click', onClickPin);
closeElement.addEventListener('click', closeDialog);
timeInSelectElement.addEventListener('change', synchronizeSelectTime);
timeOutSelectElement.addEventListener('change', synchronizeSelectTime);
roomSelectElement.addEventListener('change', changeCapacitySelect);
capacitySelectElement.addEventListener('change', changeRoomSelect);
inputPriceElement.addEventListener('input', changeTypeSelect);

