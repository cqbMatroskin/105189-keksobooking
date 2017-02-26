'use strict';

window.filterPins = (function () {
  var filtersFormElement = document.querySelector('.tokyo__filters');
  var housingTypeElement = filtersFormElement.querySelector('#housing_type');
  var housingRoomsElement = filtersFormElement.querySelector('#housing_room-number');
  var housingGuestsElement = filtersFormElement.querySelector('#housing_guests-number');
  var housingPriceElement = filtersFormElement.querySelector('#housing_price');
  var formFeatureList = filtersFormElement.feature;
  var SELECT_FILTER_ANY = 'any';

  var HousePrice = {
    LOW: 10000,
    HIGHT: 50000
  };

  var HousePriceValue = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGHT: 'high'
  };

  /* проверяет совадение типа жилья со значением в offers.type  */
  function checkHouseType(type) {
    return housingTypeElement.value === type || housingTypeElement.value === SELECT_FILTER_ANY;
  }

  /* проверяет совадение количества комнат со значением в offers.rooms  */
  function checkHouseRooms(rooms) {
    return Number(housingRoomsElement.value) === rooms || housingRoomsElement.value === SELECT_FILTER_ANY;
  }

  /* проверяет совадение количества гостей со значением в offers.guests  */
  function checkHouseGuets(guests) {
    return Number(housingGuestsElement.value) === guests || housingGuestsElement.value === SELECT_FILTER_ANY;
  }

  /* проверяет совадение цены за жилье со значением в offers.price */
  function checkHousePrice(price) {
    switch (housingPriceElement.value) {
      case (HousePriceValue.MIDDLE):
        return price >= HousePrice.LOW && price <= HousePrice.HIGHT;
      case (HousePriceValue.LOW):
        return price <= HousePrice.LOW;
      case (HousePriceValue.HIGHT):
        return price >= HousePrice.HIGHT;
    }
    return false;
  }

  /* проверяет выбранные чекбоксы features c массивом значений features */
  function checkHousingFeatures(features) {
    var futureArr = Array.prototype.slice.call(formFeatureList);
    return futureArr.every(function (formFeatureItem) {
      var isChecked = formFeatureItem.checked;
      var featureValue = formFeatureItem.value;
      if (isChecked && features.indexOf(featureValue) === -1) {
        return false;
      }
      return true;
    });
  }

  return function (pinsDataList) {
    return pinsDataList.filter(function (pinData) {
      return checkHouseType(pinData.offer.type) &&
             checkHouseRooms(pinData.offer.rooms) &&
             checkHouseGuets(pinData.offer.guests) &&
             checkHousingFeatures(pinData.offer.features) &&
             checkHousePrice(pinData.offer.price);
    });
  };
}());
