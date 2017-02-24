'use strict';

window.utils = (function () {
  var KeyCodes = {
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
    selectorMatches();
    while (element) {
      if (element.matches(className)) {
        return element;
      } else {
        element = element.parentElement;
      }
    }
    return null;
  }

  return {
    KeyCodes: KeyCodes,
    getClosestElement: getClosestElement,
  };
}());
