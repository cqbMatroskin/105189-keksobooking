'use strict';

window.renderCard = (function () {
  var dialogTemplate = document.querySelector('#dialog-template');
  var dialogElement = dialogTemplate.content.querySelector('.dialog');

  return function (cardData) {
    var cloneElement = dialogElement.cloneNode(true);
    var avatar = cloneElement.querySelector('.dialog__title img');
    var features = cloneElement.querySelector('.lodge__features');
    var address = cloneElement.querySelector('.lodge__address');
    var description = cloneElement.querySelector('.lodge__description');
    var price = cloneElement.querySelector('.lodge__price');
    var title = cloneElement.querySelector('.lodge__title');
    var type = cloneElement.querySelector('.lodge__type');
    var photos = cloneElement.querySelector('.lodge__photos');
    var checkin = cloneElement.querySelector('.lodge__checkin-time');
    var guestsPerRoom = cloneElement.querySelector('.lodge__rooms-and-guests');

    guestsPerRoom.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    checkin.textContent = 'Заед после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    avatar.src = cardData.author.avatar;
    address.textContent = cardData.offer.address;
    description.textContent = cardData.offer.description;
    price.textContent = cardData.offer.price + '₽/ночь';
    title.textContent = cardData.offer.title;
    type.textContent = cardData.offer.type;

    for (var i = 0; i < cardData.offer.photos.length; i++) {
      var photo = new Image(52, 42);
      photo.src = cardData.offer.photos[i];
      photos.appendChild(photo);
    }

    for (i = 0; i < cardData.offer.features.length; i++) {
      var featureElement = document.createElement('span');
      featureElement.classList.add('feature__image');
      featureElement.classList.add('feature__image--' + cardData.offer.features[i]);
      features.appendChild(featureElement);
    }
    return cloneElement;
  };
}());
