'use strict';

var CLASS_NAME_INVISIBLE = 'invisible';
var CLASS_NAME_PIN_ACTIVE = 'pin--active';

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
var pinActive = tokyoMapElement.querySelector('.pin--active');
var submitBtn = document.querySelector('.form__submit');

/** объект с парметрами для полей */
var config = {
  REQUIRED: true,
  price: {
    ZERO: 0,
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

var errorMessages = {
  MIN_PRICE: 'Цена не может быть меньше ',
  MAX_PRICE: 'Цена не может быть больше '
};

/** добавляет аттрибуты всем полям */
function addValidateAttr() {
  inputTitleElement.required = config.REQUIRED;
  inputAddressElement.required = config.REQUIRED;
  inputPriceElement.required = config.REQUIRED;
  inputTitleElement.minLength = config.title.MIN_LENGTH;
  inputTitleElement.maxLength = config.title.MAX_LENGTH;
  inputPriceElement.min = config.price.MIN;
  inputPriceElement.max = config.price.MAX;
}

/**
 * если переданный элемент не соответствует классу,
 * поднимаемся к родителю и проверяем его
 * @param {Element} element
 * @param {string} className
 * @return {Element|null}
 */
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

/**
 * передает event.target в getClosestElement
 * pin является результатом выполнения getClosestElement
 * @param {MouseEvent} evt
 */
function onClickPin(evt) {
  var target = evt.target;
  var pin = getClosestElement(target, '.pin');
  if (pin) {
    selectPin(pin);
  }
}

/**
 * удаляет класс у неактивного элемента
 * добаляет класс target-у
 * показывает элемент .dialog
 * @param {object} target
 */
function selectPin(target) {
  if (pinActive) {
    pinActive.classList.remove(CLASS_NAME_PIN_ACTIVE);
  }
  pinActive = target;
  target.classList.add(CLASS_NAME_PIN_ACTIVE);
  dialogElement.classList.remove(CLASS_NAME_INVISIBLE);
}

function closeDialog(evt) {
  evt.preventDefault();
  dialogElement.classList.add(CLASS_NAME_INVISIBLE);
}

function changeSelectCapacity() {
  if (roomSelectElement.value < selectConfig.room.TWO) {
    capacitySelectElement.value = selectConfig.guest.ZERO;
  } else {
    capacitySelectElement.value = selectConfig.guest.THREE;
  }
}

function changeSelectRoom() {
  if (capacitySelectElement.value < selectConfig.guest.THREE) {
    roomSelectElement.value = selectConfig.room.ONE;
  } else {
    roomSelectElement.value = selectConfig.room.TWO;
  }
}

function synchronizeSelectTime(evt) {
  if (evt.target === timeInSelectElement) {
    timeOutSelectElement.value = evt.target.value;
  } else {
    timeInSelectElement.value = evt.target.value;
  }
}

function changeTypeSelect() {
  if (typeSelectElement[0].selected) {
    inputPriceElement.min = config.price.MIN;
  } else if (typeSelectElement[1].selected) {
    inputPriceElement.min = config.price.ZERO;
  } else {
    inputPriceElement.min = config.price.PALACE;
  }
  inputPriceElement.value = inputPriceElement.min;
}

/** кастомное сообщение для валидации цены за жилье */
function validateInputPrice() {
  if (!inputPriceElement.validity.valid) {
    if (inputPriceElement.validity.rangeUnderflow) {
      inputPriceElement.setCustomValidity(errorMessages.MIN_PRICE + inputPriceElement.min);
    }
    if (inputPriceElement.validity.rangeOverflow) {
      inputPriceElement.setCustomValidity(errorMessages.MAX_PRICE + config.price.MAX);
    }
  }
}

addValidateAttr();
changeSelectCapacity();
tokyoMapElement.addEventListener('click', onClickPin);
closeElement.addEventListener('click', closeDialog);
timeInSelectElement.addEventListener('change', synchronizeSelectTime);
timeOutSelectElement.addEventListener('change', synchronizeSelectTime);
roomSelectElement.addEventListener('change', changeSelectCapacity);
capacitySelectElement.addEventListener('change', changeSelectRoom);
typeSelectElement.addEventListener('change', changeTypeSelect);
submitBtn.addEventListener('click', validateInputPrice);
submitBtn.addEventListener('submit', validateInputPrice);
