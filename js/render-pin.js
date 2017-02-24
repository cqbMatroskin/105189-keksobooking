'use strict';

window.renderPin = (function () {
  var pinTemplate = document.querySelector('#pin-template');
  var pinElement = pinTemplate.content.querySelector('.pin');

  return function (element) {
    var cloneElement = pinElement.cloneNode(true);
    var avatar = cloneElement.querySelector('.rounded');
    avatar.src = element.author.avatar;

    return cloneElement;
  };
}());
