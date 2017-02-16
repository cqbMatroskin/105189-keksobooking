'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, property) {
  firstField.addEventListener('change', function () {
    var index = firstFieldValues.indexOf(firstField.value);
    secondField[property] = secondFieldValues[index];
  });
};
