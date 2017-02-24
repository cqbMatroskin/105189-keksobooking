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

  var PinSize = {
    WIDTH: 56,
    HEIGHT: 75
  };

  /* обработчик клика по пину */
  function focusPin() {
    pinActive.focus();
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
  function onDataLoad(data) {
    similarApartments = data;
    similarApartments.slice(0, 3).forEach(function (pinData) {
      var newPin = renderPin(pinData);
      newPin.style.top = pinData.location.y - PinSize.HEIGHT / 2 + 'px';
      newPin.style.left = pinData.location.x - PinSize.WIDTH / 2 + 'px';
      newPin.addEventListener('keydown', function (evt) {
        if (evt.keyCode === utils.KeyCodes.ENTER) {
          selectPin(utils.getClosestElement(evt.target, '.' + ClassName.PIN));
          showCard(pinData, focusPin);
        }
      });
      newPin.addEventListener('click', function (evt) {
        selectPin(utils.getClosestElement(evt.target, '.' + ClassName.PIN));
        showCard(pinData);
      });
      pinsMapElement.appendChild(newPin);
    });
  }

  /* выводит ошибку на экран */
  function onErrorLoad(err) {
    errorElement.classList.remove('invisible');
    errorElement.textContent = err;
  }

  load(DATA_URL, onDataLoad, onErrorLoad);
}());
