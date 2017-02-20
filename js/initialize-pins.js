'use strict';

(function initializePins() {
  var tokyoMapElement = document.querySelector('.tokyo__pin-map');
  var pinActive = tokyoMapElement.querySelector('.pin--active');
  var showCard = window.showCard;

  var ClassName = {
    INVISIBLE: 'invisible',
    PIN_ACTIVE: 'pin--active',
    PIN: 'pin'
  };

/* обработчик нажатия клавиши по пину */
  function pinMapKeyDownHandler(evt) {
    if (evt.keyCode === window.utils.KeyCodes.ENTER) {
      showCard(function () {
        pinActive.focus();
      });
      selectPin(window.utils.getClosestElement(evt.target, '.' + ClassName.PIN));
    }
  }

  /* обработчик клика по пину */
  function pinMapClickHandler(evt) {
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

  tokyoMapElement.addEventListener('click', pinMapClickHandler);
  tokyoMapElement.addEventListener('keydown', pinMapKeyDownHandler);
}());

window.utils.selectorMatches();
