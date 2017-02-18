'use strict';

window.showCard = (function () {
  var dialogElement = document.querySelector('.dialog');
  var INVISIBLE_CLASS_NAME = 'invisible';
  return function (callback) {
    dialogElement.classList.remove(INVISIBLE_CLASS_NAME);
    window.onHideCard = callback;
  };
}());
