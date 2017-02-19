'use strict';

window.synchronizeFields = (function () {
  return function (firstField, secondField, firstFieldValues, secondFieldValues, syncValues) {
    firstField.addEventListener('change', function () {
      var value = secondFieldValues[firstFieldValues.indexOf(firstField.value)];
      syncValues(secondField, value);
    });
  };
}());
