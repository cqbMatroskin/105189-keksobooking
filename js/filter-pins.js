'use strict';

window.filterPins = (function () {
  var filtersElement = document.querySelector('.tokyo__filters');
  var housingTypeElement = filtersElement.querySelector('#housing_type');
  var housingRoomsElement = filtersElement.querySelector('#housing_room-number');
  var housingGuestsElement = filtersElement.querySelector('#housing_guests-number');
  var housingPriceElement = filtersElement.querySelector('#housing_price');
  var featureList = filtersElement.feature;
  var SELECT_FILTER_ANY = 'any';

  var HousePrice = {
    LOW: 10000,
    HIGHT: 50000
  };

  var HousePriceValue = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGHT: 'hight'
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
    for (var i = 0; i < featureList.length; i++) {
      if (featureList[i].checked && features.indexOf(featureList[i].value) === -1) {
        return false;
      }
    }
    return true;
  }

  return function (pinsDataList) {
    return pinsDataList.filter(function (pinData) {
      return checkHouseType(pinData.offer.type) && checkHouseRooms(pinData.offer.rooms) && checkHouseGuets(pinData.offer.guests) && checkHousingFeatures(pinData.offer.features) && checkHousePrice(pinData.offer.price);
    });
  };
}());
