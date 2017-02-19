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

  var KeyCode = {
    ENTER: 13
  };

  var cb = null;

/* обработчик нажатия клавиши по пину */
  function pinKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      cb = function () {
        pinActive.focus();
      };
      showCard(cb);
      selectPin(getClosestElement(evt.target, '.' + ClassName.PIN));
    }
  }

  /* обработчик клика по пину */
  function pinClickHandler(evt) {
    showCard();
    selectPin(getClosestElement(evt.target, '.' + ClassName.PIN));
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
    if (pinActive) {
      pinActive.classList.remove(ClassName.PIN_ACTIVE);
      pinActive.setAttribute('aria-checked', false);
    }
    pinActive = target;
    pinActive.classList.add(ClassName.PIN_ACTIVE);
    pinActive.setAttribute('aria-checked', true);
  }

  tokyoMapElement.addEventListener('click', pinClickHandler);
  tokyoMapElement.addEventListener('keydown', pinKeyDownHandler);
}());
