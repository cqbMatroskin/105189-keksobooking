'use strict';

window.showCard = (function () {
  var cardContainer = document.querySelector('.tokyo__pin-map');
  var INVISIBLE_CLASS_NAME = 'invisible';
  var renderCard = window.renderCard;
  var currentCard;
  var closeElement;
  var cb;


  function toggleDialog(flag, card) {
    card.classList.toggle(INVISIBLE_CLASS_NAME, !flag);
    card.setAttribute('aria-hidden', !flag);
    if (!flag && cb) {
      cb();
    }
  }

  /* закрывает диалоговое окно по клику */
  function clickDialogHandler(evt) {
    evt.preventDefault();
    toggleDialog(false, currentCard);
    closeElement.removeEventListener('click', clickDialogHandler);
    document.removeEventListener('keydown', documentKeyDownHandler);
  }

  /* закрывает диалоговое окно при нажатии Esc */
  function documentKeyDownHandler(evt) {
    if (evt.keyCode === window.utils.KeyCodes.ESCAPE) {
      toggleDialog(false, currentCard);
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
      toggleDialog(true, currentCard);
    } else {
      currentCard = renderCard(data);
      closeElement = currentCard.querySelector('.dialog__close');
      closeElement.addEventListener('click', clickDialogHandler);
      cardContainer.appendChild(currentCard);
      toggleDialog(true, currentCard);
    }
  };
}());
