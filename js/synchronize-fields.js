'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, property) {
  var index = firstFieldValues.indexOf(firstField.value);
  secondField[property] = secondFieldValues[index];
};
