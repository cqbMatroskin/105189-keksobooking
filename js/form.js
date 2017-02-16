'use strict';

var formElement = document.querySelector('.notice__form');
var inputTitleElement = formElement.querySelector('#title');
var inputAddressElement = formElement.querySelector('#address');
var inputPriceElement = formElement.querySelector('#price');
var roomSelectElement = formElement.querySelector('#room_number');
var capacitySelectElement = formElement.querySelector('#capacity');
var timeInSelectElement = formElement.querySelector('#time');
var timeOutSelectElement = formElement.querySelector('#timeout');
var typeSelectElement = formElement.querySelector('#type');

/** массив объектов с парметрами для полей */
var config = [
  {
    element: inputTitleElement,
    attr: {
      required: true,
      maxLength: 100
    }
  },
  {
    element: inputPriceElement,
    attr: {
      required: true,
      min: 1000,
      max: 1000000,

    }
  },
  {
    element: inputAddressElement,
    attr: {
      required: true
    }
  }
];

var TitleLength = {
  MIN_LENGTH: 30,
};

var TIME_IN_ARR = ['12', '13', '14'];
var TIME_OUT_ARR = ['12', '13', '14'];
var QUANTITY_GUESTS = ['0', '3', '3'];
var QUANTITY_ROOM = ['1', '2', '100'];
var HOUSE_TYPE = ['apartment', 'hovel', 'palace'];
var HOUSE_MIN_PRICE = ['1000', '0', '10000'];

/* добавляет аттрибуты всем полям заданным в массиве */
function arrToValidate(arrConfig) {
  var fieldElement;
  var elementAttr;
  for (var i = 0; i < arrConfig.length; i++) {
    fieldElement = arrConfig[i].element;
    elementAttr = arrConfig[i].attr;
    for (var key in elementAttr) {
      if (elementAttr.hasOwnProperty(key)) {
        fieldElement[key] = elementAttr[key];
      }
    }
  }
}

/* синхронизация полей выбора кол-ва комнат и кол-ва мест в комнате */
window.synchronizeFields(capacitySelectElement, roomSelectElement, QUANTITY_GUESTS, QUANTITY_ROOM, 'value');

window.synchronizeFields(roomSelectElement, capacitySelectElement, QUANTITY_ROOM, QUANTITY_GUESTS, 'value');

/* синхронизация полей выбора времени заезда/выезда */
window.synchronizeFields(timeInSelectElement, timeOutSelectElement, TIME_IN_ARR, TIME_OUT_ARR, 'value');

function changeTimeOutSelectHandler() {
  window.synchronizeFields(timeOutSelectElement, timeInSelectElement, TIME_OUT_ARR, TIME_IN_ARR, 'value');
}

window.synchronizeFields(typeSelectElement, inputPriceElement, HOUSE_TYPE, HOUSE_MIN_PRICE, 'min');

/* валидация поля #title */
function validateInputTitleHandler() {
  if (inputTitleElement.value.length < TitleLength.MIN_LENGTH) {
    inputTitleElement.setCustomValidity(getMinLengthMessage(TitleLength.MIN_LENGTH, inputTitleElement.value.length));
  } else {
    inputTitleElement.setCustomValidity('');
  }
}

/* функция вывода кастомной ошибки */
function getMinLengthMessage(number, length) {
  return 'Количество символов не может быть меньше ' + number + '.' + ' Текущая длина ' + length;
}

arrToValidate(config);
validateInputTitleHandler();
timeOutSelectElement.addEventListener('change', changeTimeOutSelectHandler);
inputTitleElement.addEventListener('input', validateInputTitleHandler);
