'use strict';

window.showCard = (function () {
  var cardContainer = document.querySelector('.tokyo__pin-map');
  var currentCard = cardContainer.querySelector('.dialog');
  var renderCard = window.renderCard;
  var closeElement;
  var cb;

  function deleteDialogElement() {
    cardContainer.removeChild(currentCard);
    currentCard = null;
    if (cb) {
      cb();
    }
  }

  /* закрывает диалоговое окно по клику */
  function clickDialogHandler(evt) {
    evt.preventDefault();
    deleteDialogElement();
    closeElement.removeEventListener('click', clickDialogHandler);
    document.removeEventListener('keydown', documentKeyDownHandler);
  }

  /* закрывает диалоговое окно при нажатии Esc */
  function documentKeyDownHandler(evt) {
    if (evt.keyCode === window.utils.KeyCodes.ESCAPE) {
      deleteDialogElement();
    }
  }

  return function (data, callback) {
    cb = callback;
    document.addEventListener('keydown', documentKeyDownHandler);
    if (currentCard) {
      closeElement.removeEventListener('click', clickDialogHandler);
      var newCard = renderCard(data);
      cardContainer.replaceChild(newCard, currentCard);
      currentCard = newCard;
      closeElement = currentCard.querySelector('.dialog__close');
      closeElement.addEventListener('click', clickDialogHandler);
    } else {
      currentCard = renderCard(data);
      closeElement = currentCard.querySelector('.dialog__close');
      closeElement.addEventListener('click', clickDialogHandler);
      cardContainer.appendChild(currentCard);
    }
  };
}());
