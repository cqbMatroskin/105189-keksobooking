'use strict';

window.showCard = (function () {
  var dialogElement = document.querySelector('.dialog');
  var closeElement = dialogElement.querySelector('.dialog__close');
  var INVISIBLE_CLASS_NAME = 'invisible';
  var ESCAPE_KEY_CODE = 27;
  var cb;

  function toggleDialog(flag) {
    dialogElement.classList.toggle(INVISIBLE_CLASS_NAME, !flag);
    dialogElement.setAttribute('aria-hidden', !flag);
    if (!flag && cb) {
      cb();
    }
  }

  /* закрывает диалоговое окно по клику */
  function closeDialogHandler(evt) {
    evt.preventDefault();
    toggleDialog(false);
    closeElement.removeEventListener('click', closeDialogHandler);
    document.removeEventListener('keydown', keyDownToCloseDialog);
  }

/* закрывает диалоговое окно при нажатии Esc */
  function keyDownToCloseDialog(evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      toggleDialog(false);
    }
  }

  return function (callback) {
    cb = callback;
    toggleDialog(true);
    closeElement.addEventListener('click', closeDialogHandler);
    document.addEventListener('keydown', keyDownToCloseDialog);
  };
}());
