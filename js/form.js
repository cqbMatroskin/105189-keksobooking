'use strict';

(function () {
  var formElement = document.querySelector('.notice__form');
  var inputTitleElement = formElement.querySelector('#title');
  var inputAddressElement = formElement.querySelector('#address');
  var inputPriceElement = formElement.querySelector('#price');
  var roomSelectElement = formElement.querySelector('#room_number');
  var capacitySelectElement = formElement.querySelector('#capacity');
  var timeInSelectElement = formElement.querySelector('#time');
  var timeOutSelectElement = formElement.querySelector('#timeout');
  var typeSelectElement = formElement.querySelector('#type');
  var MIN_TITLE_LENGTH = 30;

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
    arrConfig.forEach(function (fieldConfig) {
      fieldElement = fieldConfig.element;
      elementAttr = fieldConfig.attr;
      Object.keys(elementAttr).forEach(function (key) {
        fieldElement[key] = elementAttr[key];
      });
    });
  }

  /* двусторонняя синхронизация полей */
  function syncValues(element, value) {
    element.value = value;
  }

  /* Одностороння синхронизация значения первого поля с минимальным значением второго */
  function syncValueWithMin(element, value) {
    element.min = value;
  }

  /* валидация поля #title */
  function validateInputTitleHandler() {
    if (inputTitleElement.value.length < MIN_TITLE_LENGTH) {
      inputTitleElement.setCustomValidity(getMinLengthMessage(MIN_TITLE_LENGTH, inputTitleElement.value.length));
    } else {
      inputTitleElement.setCustomValidity('');
    }
  }

  /* функция вывода кастомной ошибки */
  function getMinLengthMessage(number, length) {
    return 'Количество символов не может быть меньше ' + number + '.' + ' Текущая длина ' + length;
  }

  /* расстановка атрибутов для полей указанных в массиве config */
  arrToValidate(config);

  /* валидация поля заголовка при загрузке страницы */
  validateInputTitleHandler();

  /* валидация поля заголовка при изменении */
  inputTitleElement.addEventListener('input', validateInputTitleHandler);

  /* синхронизация полей выбора кол-ва комнат и кол-ва мест в комнате */
  window.synchronizeFields(capacitySelectElement, roomSelectElement, QUANTITY_GUESTS, QUANTITY_ROOM, syncValues);
  window.synchronizeFields(roomSelectElement, capacitySelectElement, QUANTITY_ROOM, QUANTITY_GUESTS, syncValues);

  /* синхронизация полей выбора времени заезда/выезда */
  window.synchronizeFields(timeInSelectElement, timeOutSelectElement, TIME_IN_ARR, TIME_OUT_ARR, syncValues);
  window.synchronizeFields(timeOutSelectElement, timeInSelectElement, TIME_OUT_ARR, TIME_IN_ARR, syncValues);

  /* синхронизация поля типа жилья с полем цены */
  window.synchronizeFields(typeSelectElement, inputPriceElement, HOUSE_TYPE, HOUSE_MIN_PRICE, syncValueWithMin);
}());
