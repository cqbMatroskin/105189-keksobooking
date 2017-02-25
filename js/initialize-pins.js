'use strict';

(function initializePins() {
  var pinsMapElement = document.querySelector('.tokyo__pin-map');
  var pinActive = pinsMapElement.querySelector('.pin--active');
  var errorElement = document.querySelector('.error');
  var featuresFilters = document.querySelector('.tokyo__filters');
  var similarApartments = [];
  var currentPins = [];
  var showCard = window.showCard;
  var utils = window.utils;
  var load = window.load;
  var renderPin = window.renderPin;
  var filterPins = window.filterPins;

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

  /* очищает карту */
  function clearMapElement() {
    currentPins.forEach(function (pinElement) {
      pinElement.parentElement.removeChild(pinElement);
    });
    currentPins = [];
  }

  /* отрисовывает пины */
  function renderPins(pinsDataList) {
    var fragment = document.createDocumentFragment();
    pinsDataList.forEach(function (pinData) {
      var newPin = renderPin(pinData);
      currentPins.push(newPin);
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
      fragment.appendChild(newPin);
    });
    pinsMapElement.appendChild(fragment);
  }

  /* отлавливаем изменения в форме */
  featuresFilters.addEventListener('change', function () {
    clearMapElement();
    var filtredPinsList = filterPins(similarApartments);
    renderPins(filtredPinsList);
  });

  /* показывает первые три пина при загрузке */
  function onDataLoad(data) {
    similarApartments = data;
    renderPins(similarApartments.slice(0, 3));
  }

  /* выводит ошибку на экран */
  function onErrorLoad(err) {
    errorElement.classList.remove('invisible');
    errorElement.textContent = err;
  }

  load(DATA_URL, onDataLoad, onErrorLoad);
}());
