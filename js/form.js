'use strict';

var tokyoMapElement = document.querySelector('.tokyo__pin-map');
var dialogElement = document.querySelector('.dialog');
var closeElement = dialogElement.querySelector('.dialog__close');
var closeElementButton = closeElement.querySelector('.dialog__close img');
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

/**
 * @enum {number}
 */
var PriceValue = {
  ZERO: 0,
  MIN: 1000,
  PALACE: 10000,
};

var TitleLength = {
  MIN_LENGTH: 30,
};

var SelectConfig = {
  room: {
    ONE: 1,
    TWO: 2,
    ONE_HUNDRED: 100
  },
  guest: {
    THREE: 3,
    ZERO: 0
  },
  typeHousing: {
    apartment: 'apartment',
    hovel: 'hovel',
    palace: 'palace'
  }
};

/**
 * @enum {Object<string>}
 */
var ClassList = {
  CLASS_NAME_INVISIBLE: 'invisible',
  CLASS_NAME_PIN_ACTIVE: 'pin--active'
};

/**
 * @enum {Object<number>}
 */
var KeyCodeLib = {
  ESCAPE: 27,
  ENTER: 13
};

/**
 * добавляет аттрибуты всем полям заданным в массиве
 * @param {Array} arrConfig
 */
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

/**
 * проверяет совпадает ли evt.keyCode и клавиша переданная вторым аргументом
 * @param {KeyboardEvent} evt
 * @param {number} key
 * @return {boolean}
 */
function isActivateEvent(evt, key) {
  return evt.keyCode && evt.keyCode === key;
}

/**
 * handler для клика по пину
 * @param {MouseEvent} evt
 */
function clickPinHandler(evt) {
  if (getPinElement(evt.target)) {
    selectPin(getPinElement(evt.target));
  }
}

/**
 * handler для нажатия Enter по пину
 * @param {KeyboardEvent} evt
 */
function keyDownPinHandler(evt) {
  if (isActivateEvent(evt, KeyCodeLib.ENTER)) {
    selectPin(getPinElement(evt.target));
  }
}

/**
 * @param {HTMLDivElement|HTMLImageElement} target
 * @return {HTMLDivElement}
 */
function getPinElement(target) {
  return getClosestElement(target, '.pin');
}

/**
 * если переданный элемент не соответствует классу,
 * поднимаемся к родителю и проверяем его
 * @param {HTMLDivElement} element
 * @param {string} className
 * @return {HTMLDivElement|null}
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
 * удаляет класс у неактивного элемента
 * добаляет класс target-у
 * показывает элемент .dialog
 * @param {HTMLDivElement} target
 */
function selectPin(target) {
  if (target.classList.contains(ClassList.CLASS_NAME_PIN_ACTIVE)) {
    return;
  } else if (pinActive) {
    pinActive.classList.remove(ClassList.CLASS_NAME_PIN_ACTIVE);
    pinActive.setAttribute('aria-checked', false);
  }
  pinActive = target;
  target.classList.add(ClassList.CLASS_NAME_PIN_ACTIVE);
  pinActive.setAttribute('aria-checked', true);
  dialogElement.classList.remove(ClassList.CLASS_NAME_INVISIBLE);
  closeElementButton.setAttribute('aria-hidden', false);
}

/**
 * закрывает окно .dialog
 * @param {MouseEvent} evt
 */
function closeDialogHandler(evt) {
  evt.preventDefault();
  dialogElement.classList.add(ClassList.CLASS_NAME_INVISIBLE);
  closeElementButton.setAttribute('aria-hidden', true);
}

function keyDownToCloeDialog(evt) {
  evt.preventDefault();
  if (isActivateEvent(evt, KeyCodeLib.ENTER)) {
    dialogElement.classList.add(ClassList.CLASS_NAME_INVISIBLE);
    closeElementButton.setAttribute('aria-hidden', true);
  }
}

/** синхронизация полей выбора кол-ва комнат и кол-ва мест в комнате */
function changeSelectCapacityHandler() {
  if (roomSelectElement.value < SelectConfig.room.TWO) {
    capacitySelectElement.value = SelectConfig.guest.ZERO;
  } else {
    capacitySelectElement.value = SelectConfig.guest.THREE;
  }
}

function changeSelectRoomHandler() {
  if (capacitySelectElement.value < SelectConfig.guest.THREE) {
    roomSelectElement.value = SelectConfig.room.ONE;
  } else {
    roomSelectElement.value = SelectConfig.room.TWO;
  }
}

/**
 * синхронизация полей выбора времени заезда/выезда
 * @param {MouseEvent} evt
 */
function synchronizeSelectTimeHandler(evt) {
  var select;
  if (evt.target === timeInSelectElement) {
    select = timeInSelectElement;
  } else {
    select = timeOutSelectElement;
  }
  select.value = evt.target.value;
}

/** синхронизация поля выбора жилья и цены за ночь */
function changeTypeSelectHandler() {
  if (typeSelectElement.value === SelectConfig.typeHousing.apartment) {
    inputPriceElement.min = PriceValue.MIN;
  } else if (typeSelectElement.value === SelectConfig.typeHousing.hovel) {
    inputPriceElement.min = PriceValue.ZERO;
  } else {
    inputPriceElement.min = PriceValue.PALACE;
  }
}

/** валидация поля #title */
function validateInputTitleHandler() {
  if (inputTitleElement.value.length < TitleLength.MIN_LENGTH) {
    inputTitleElement.setCustomValidity(getMinLengthMessage(TitleLength.MIN_LENGTH, inputTitleElement.value.length));
  } else {
    inputTitleElement.setCustomValidity('');
  }
}

/**
 * функция вывода кастомной ошибки
 * @param {number} number
 * @param {number} length
 * @return {string}
 */
function getMinLengthMessage(number, length) {
  return 'Количество символов не может быть меньше ' + number + '.' + ' Текущая длина ' + length;
}

arrToValidate(config);
changeSelectCapacityHandler();
changeTypeSelectHandler();
validateInputTitleHandler();
tokyoMapElement.addEventListener('click', clickPinHandler);
tokyoMapElement.addEventListener('keydown', keyDownPinHandler);
closeElement.addEventListener('click', closeDialogHandler);
closeElement.addEventListener('keydown', keyDownToCloeDialog);
timeInSelectElement.addEventListener('change', synchronizeSelectTimeHandler);
timeOutSelectElement.addEventListener('change', synchronizeSelectTimeHandler);
roomSelectElement.addEventListener('change', changeSelectCapacityHandler);
inputTitleElement.addEventListener('input', validateInputTitleHandler);
capacitySelectElement.addEventListener('change', changeSelectRoomHandler);
typeSelectElement.addEventListener('change', changeTypeSelectHandler);
