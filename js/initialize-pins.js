'use strict';

(function initializePins() {
  var pinsMapElement = document.querySelector('.tokyo__pin-map');
  var pinActive = pinsMapElement.querySelector('.pin--active');
  var errorElement = document.querySelector('.error');
  var similarApartments = [];
  var showCard = window.showCard;
  var utils = window.utils;
  var load = window.load;
  var renderPin = window.renderPin;

  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var ClassName = {
    INVISIBLE: 'invisible',
    PIN_ACTIVE: 'pin--active',
    PIN: 'pin'
  };

  /* обработчик нажатия клавиши по пину */
  function pinsMapKeyDownHandler(evt) {
    if (evt.keyCode === utils.KeyCodes.ENTER) {
      showCard(function () {
        pinActive.focus();
      });
      selectPin(utils.getClosestElement(evt.target, '.' + ClassName.PIN));
    }
  }

  /* обработчик клика по пину */
  function pinsMapClickHandler(evt) {
    showCard();
    selectPin(utils.getClosestElement(evt.target, '.' + ClassName.PIN));
  }

  /*
  * удаляет класс у неактивного элемента
  * добаляет класс target-у
  * показывает диалоговое окно
  */
  function selectPin(target) {
    if (pinActive) {
      pinActive.classList.remove(ClassName.PIN_ACTIVE);
      pinActive.setAttribute('aria-checked', false);
    }
    pinActive = target;
    pinActive.classList.add(ClassName.PIN_ACTIVE);
    pinActive.setAttribute('aria-checked', true);
  }

  /* сохраняет в массив первые три индекса */
  function dataLoad(data) {
    similarApartments = data;
    var arr = similarApartments.slice(0, 3);
    arr.forEach(function (element) {
      pinsMapElement.appendChild(renderPin(element));
    });
  }

  /* выводит ошибку на экран */
  function onErrorLoad(err) {
    errorElement.classList.remove('invisible');
    errorElement.textContent = err;
  }

  load(DATA_URL, dataLoad, onErrorLoad);
  pinsMapElement.addEventListener('click', pinsMapClickHandler);
  pinsMapElement.addEventListener('keydown', pinsMapKeyDownHandler);
  utils.selectorMatches();
}());
