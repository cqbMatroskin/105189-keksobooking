'use strict';

window.showCard = (function () {
  var dialogElement = document.querySelector('.dialog');
  var closeElement = dialogElement.querySelector('.dialog__close');
  var INVISIBLE_CLASS_NAME = 'invisible';
  var cb;

  function toggleDialog(flag) {
    dialogElement.classList.toggle(INVISIBLE_CLASS_NAME, !flag);
    dialogElement.setAttribute('aria-hidden', !flag);
    if (!flag && cb) {
      cb();
    }
  }

  /* закрывает диалоговое окно по клику */
  function clickDialogHandler(evt) {
    evt.preventDefault();
    toggleDialog(false);
    closeElement.removeEventListener('click', clickDialogHandler);
    document.removeEventListener('keydown', documentKeyDownHandler);
  }

/* закрывает диалоговое окно при нажатии Esc */
  function documentKeyDownHandler(evt) {
    if (evt.keyCode === window.utils.KeyCodes.ESCAPE) {
      toggleDialog(false);
    }
  }

  return function (callback) {
    cb = callback;
    toggleDialog(true);
    closeElement.addEventListener('click', clickDialogHandler);
    document.addEventListener('keydown', documentKeyDownHandler);
  };
}());
