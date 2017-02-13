'use strict';
(function initializePins() {
  var tokyoMapElement = document.querySelector('.tokyo__pin-map');
  var dialogElement = document.querySelector('.dialog');
  var closeElement = dialogElement.querySelector('.dialog__close');
  var pinActive = tokyoMapElement.querySelector('.pin--active');

  var ClassName = {
    INVISIBLE: 'invisible',
    PIN_ACTIVE: 'pin--active',
    PIN: 'pin'
  };

  var KeyCode = {
    ESCAPE: 27,
    ENTER: 13
  };

  var EventType = {
    CLICK: 'click'
  };


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
      closeElement.addEventListener('click', closeDialogHandler);
      document.addEventListener('keydown', keyDownToCloseDialog);
    } else {
      closeElement.removeEventListener('click', closeDialogHandler);
      document.removeEventListener('keydown', keyDownToCloseDialog);
    }
  }

/* закрывает диалоговое окно по клику */
  function closeDialogHandler(evt) {
    evt.preventDefault();
    toggleDialog(false);
  }

/* закрывает диалоговое окно при нажатии Esc */
  function keyDownToCloseDialog(evt) {
    if (evt.keyCode === KeyCode.ESCAPE) {
      toggleDialog(false);
    }
  }

  tokyoMapElement.addEventListener('click', pinHandler);
  tokyoMapElement.addEventListener('keydown', pinHandler);
}());
