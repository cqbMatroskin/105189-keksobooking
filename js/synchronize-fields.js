'use strict';

window.synchronizeFields = (function () {
  return function (firstField, secondField, firstFieldValues, secondFieldValues, property) {
    firstField.addEventListener('change', function () {
      var index = firstFieldValues.indexOf(firstField.value);
      secondField[property] = secondFieldValues[index];
    });
  };
}());
