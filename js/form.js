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
var pinActive = tokyoMapElement.querySelector('.pin--active');

/** массив объектов с парметрами для полей */
var config = [
  {
    element: inputTitleElement,
    attr: {
      required: true
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
 * @enum {string}
 */
var errorMessages = {
  MIN_PRICE: 'Цена не может быть меньше ',
  MAX_PRICE: 'Цена не может быть больше ',
  MIN_LENGTH: 'Длина заголовка не может быть меньше ',
  MAX_LENGTH: 'Длина заголовка не может быть больше ',
  CURRENT_LENGTH: 'Текущая длина: ',
  SYMBOLS: ' символов.'
};

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
  }
  pinActive = target;
  target.classList.add(ClassList.CLASS_NAME_PIN_ACTIVE);
  dialogElement.classList.remove(ClassList.CLASS_NAME_INVISIBLE);
}

/**
 * закрывает окно .dialog
 * @param {MouseEvent} evt
 */
function closeDialog(evt) {
  evt.preventDefault();
  dialogElement.classList.add(ClassList.CLASS_NAME_INVISIBLE);
}

/** синхронизация полей выбора кол-ва комнат и кол-ва мест в комнате */
function changeSelectCapacity() {
  if (roomSelectElement.value < SelectConfig.room.TWO) {
    capacitySelectElement.value = SelectConfig.guest.ZERO;
  } else {
    capacitySelectElement.value = SelectConfig.guest.THREE;
  }
}

function changeSelectRoom() {
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
function synchronizeSelectTime(evt) {
  var select;
  if (evt.target === timeInSelectElement) {
    select = timeOutSelectElement;
  } else {
    select = timeInSelectElement;
  }
  select.value = evt.target.value;
}

/** синхронизация поля выбора жилья и цены за ночь */
function changeTypeSelect() {
  if (typeSelectElement.value === SelectConfig.typeHousing.apartment) {
    inputPriceElement.min = PriceValue.MIN;
  } else if (typeSelectElement.value === SelectConfig.typeHousing.hovel) {
    inputPriceElement.min = PriceValue.ZERO;
  } else {
    inputPriceElement.min = PriceValue.PALACE;
  }
  inputPriceElement.value = inputPriceElement.min;
}

/** валидация поля #title */
function validateInputTitle() {
  if (inputTitleElement.value.length < config.title.MIN_LENGTH) {
    inputTitleElement.setCustomValidity(errorMessages.MIN_LENGTH + config.title.MIN_LENGTH + errorMessages.SYMBOLS + errorMessages.CURRENT_LENGTH + inputTitleElement.value.length);
  } else if (inputTitleElement.value.length > config.title.MAX_LENGTH) {
    inputTitleElement.setCustomValidity(errorMessages.MAX_LENGTH + config.title.MAX_LENGTH + errorMessages.SYMBOLS + errorMessages.CURRENT_LENGTH + inputTitleElement.value.length);
  } else {
    inputTitleElement.setCustomValidity('');
  }
}

arrToValidate(config);
changeSelectCapacity();
changeTypeSelect();
tokyoMapElement.addEventListener('click', onClickPin);
closeElement.addEventListener('click', closeDialog);
timeInSelectElement.addEventListener('change', synchronizeSelectTime);
timeOutSelectElement.addEventListener('change', synchronizeSelectTime);
roomSelectElement.addEventListener('change', changeSelectCapacity);
inputTitleElement.addEventListener('input', validateInputTitle);
capacitySelectElement.addEventListener('change', changeSelectRoom);
typeSelectElement.addEventListener('change', changeTypeSelect);
