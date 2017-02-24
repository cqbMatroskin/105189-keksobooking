'use strict';

window.renderCard = (function () {
  var dialogTemplate = document.querySelector('#dialog-template');
  var dialogElement = dialogTemplate.content.querySelector('.dialog');

  return function (cardData) {
    var cloneElement = dialogElement.cloneNode(true);
    var avatar = cloneElement.querySelector('.dialog__title img');
    var address = cloneElement.querySelector('.lodge__address');
    var description = cloneElement.querySelector('.lodge__description');
    var price = cloneElement.querySelector('.lodge__price');
    var title = cloneElement.querySelector('.lodge__title');
    var type = cloneElement.querySelector('.lodge__type');
    avatar.src = cardData.author.avatar;
    address.textContent = cardData.offer.address;
    description.textContent = cardData.offer.description;
    price.textContent = cardData.offer.price + '₽/ночь';
    title.textContent = cardData.offer.title;
    type.textContent = cardData.offer.type;
    return cloneElement;
  };
}());
