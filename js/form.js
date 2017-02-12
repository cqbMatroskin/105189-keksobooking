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

var EventType = {
  CLICK: 'click'
};

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

var ClassName = {
  INVISIBLE: 'invisible',
  PIN_ACTIVE: 'pin--active',
  PIN: 'pin'
};

var KeyCode = {
  ESCAPE: 27,
  ENTER: 13
};

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

/* проверяет совпадает ли evt.keyCode с клавишей Enter */
function pinActivate(evt) {
  return evt.keyCode === KeyCode.ENTER || evt.type === EventType.CLICK;
}

/* вызывает функцию активации по нажатию или клику на .pin */
function pinHandler(evt) {
  if (pinActivate(evt)) {
    selectPin(getClosestElement(evt.target, '.' + ClassName.PIN));
  }
}

/*
 * если переданный элемент не соответствует классу,
 * поднимаемся к родителю и проверяем его
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

/*
 * удаляет класс у неактивного элемента
 * добаляет класс target-у
 * показывает диалоговое окно
 */
function selectPin(target) {
  if (target.classList.contains(ClassName.PIN_ACTIVE)) {
    return;
  } else if (pinActive) {
    pinActive.classList.remove(ClassName.PIN_ACTIVE);
    pinActive.setAttribute('aria-checked', false);
  }
  pinActive = target;
  pinActive.classList.add(ClassName.PIN_ACTIVE);
  pinActive.setAttribute('aria-checked', true);
  toggleDialog(true);
}

function toggleDialog(flag) {
  dialogElement.classList.toggle(ClassName.INVISIBLE, !flag);
  dialogElement.setAttribute('aria-hidden', !flag);
  if (flag) {
    closeElement.addEventListener('click', сloseDialogHandler);
    document.addEventListener('keydown', keyDownToCloseDialog);
  } else {
    closeElement.removeEventListener('click', сloseDialogHandler);
    document.removeEventListener('keydown', keyDownToCloseDialog);
  }
}

/* закрывает диалоговое окно по клику */
function сloseDialogHandler(evt) {
  evt.preventDefault();
  toggleDialog(false);
}

/* закрывает диалоговое окно при нажатии Esc */
function keyDownToCloseDialog(evt) {
  if (evt.keyCode === KeyCode.ESCAPE) {
    toggleDialog(false);
  }
}

/* синхронизация полей выбора кол-ва комнат и кол-ва мест в комнате */
function changeSelectCapacityHandler() {
  if (roomSelectElement.value < SelectConfig.room.TWO) {
    capacitySelectElement.value = SelectConfig.guest.ZERO;
  } else {
    capacitySelectElement.value = SelectConfig.guest.THREE;
  }
}

/* синхронизация селекта выбора комнаты с селектом количества мест */
function changeSelectRoomHandler() {
  if (capacitySelectElement.value < SelectConfig.guest.THREE) {
    roomSelectElement.value = SelectConfig.room.ONE;
  } else {
    roomSelectElement.value = SelectConfig.room.TWO;
  }
}

/* синхронизация полей выбора времени заезда/выезда */
function synchronizeSelectTimeHandler(evt) {
  var select;
  if (evt.target === timeInSelectElement) {
    select = timeInSelectElement;
  } else {
    select = timeOutSelectElement;
  }
  select.value = evt.target.value;
}

/* синхронизация поля выбора жилья и цены за ночь */
function changeTypeSelectHandler() {
  if (typeSelectElement.value === SelectConfig.typeHousing.apartment) {
    inputPriceElement.min = PriceValue.MIN;
  } else if (typeSelectElement.value === SelectConfig.typeHousing.hovel) {
    inputPriceElement.min = PriceValue.ZERO;
  } else {
    inputPriceElement.min = PriceValue.PALACE;
  }
}

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
changeSelectCapacityHandler();
changeTypeSelectHandler();
validateInputTitleHandler();
tokyoMapElement.addEventListener('click', pinHandler);
tokyoMapElement.addEventListener('keydown', pinHandler);
timeInSelectElement.addEventListener('change', synchronizeSelectTimeHandler);
timeOutSelectElement.addEventListener('change', synchronizeSelectTimeHandler);
roomSelectElement.addEventListener('change', changeSelectCapacityHandler);
inputTitleElement.addEventListener('input', validateInputTitleHandler);
capacitySelectElement.addEventListener('change', changeSelectRoomHandler);
typeSelectElement.addEventListener('change', changeTypeSelectHandler);
