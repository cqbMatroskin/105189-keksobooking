'use strict';

(function initializePins() {
  var pinsMapElement = document.querySelector('.tokyo__pin-map');
  var pinActive = pinsMapElement.querySelector('.pin--active');
  var showCard = window.showCard;

  var ClassName = {
    INVISIBLE: 'invisible',
    PIN_ACTIVE: 'pin--active',
    PIN: 'pin'
  };

  /* обработчик нажатия клавиши по пину */
  function pinsMapKeyDownHandler(evt) {
    if (evt.keyCode === window.utils.KeyCodes.ENTER) {
      showCard(function () {
        pinActive.focus();
      });
      selectPin(window.utils.getClosestElement(evt.target, '.' + ClassName.PIN));
    }
  }

  /* обработчик клика по пину */
  function pinsMapClickHandler(evt) {
    showCard();
    selectPin(window.utils.getClosestElement(evt.target, '.' + ClassName.PIN));
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

  pinsMapElement.addEventListener('click', pinsMapClickHandler);
  pinsMapElement.addEventListener('keydown', pinsMapKeyDownHandler);
}());

window.utils.selectorMatches();
