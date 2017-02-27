'use strict';

window.utils = (function () {
  var keyCodes = {
    ENTER: 13,
    ESCAPE: 27
  };

  /* префиксы для matches */
  function selectorMatches() {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector;
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

  selectorMatches();

  return {
    keyCodes: keyCodes,
    getClosestElement: getClosestElement,
  };
}());
