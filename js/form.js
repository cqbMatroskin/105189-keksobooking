'use strict';
var TokyoMapElement = document.querySelector('.tokyo__pin-map');
var nodeCollectionPin = TokyoMapElement.children;
var DialogElement = document.querySelector('.dialog');
var CloseElement = DialogElement.querySelector('.dialog__close');
var FormElement = document.querySelector('.notice__form');
var InputTitleElement = FormElement.querySelector('#title');
var InputAddressElement = FormElement.querySelector('#address');
var InputPriceElement = FormElement.querySelector('#price');
var SubmitBtnElement = document.querySelector('.form__submit');
var RoomSelectElement = FormElement.querySelector('#room_number');
var CapacitySelectElement = FormElement.querySelector('#capacity');

function completeOnLoad() {
  addRequire();
  setTitleValidate();
  setPriceValidation();
  validateForm();
}

function onClickPin(evt) {
  var target = evt.target;
// Если ссылка на объект на котором произошло событие не имеет класса pin,
// то ссылкой на объект становится родитель текущей ссылки
// как только выполнится условие, вызовется функция selectPin в которую
// мы передаем ссылку на объект
  while (target !== target.classList.contains('pin')) {
    if (target.classList.contains('pin')) {
      selectPin(target);
      return;
    }
    target = target.parentNode;
  }
}
// Проходим по коллекции дочерних узлов ElemetTokyoMap
// проверяем есть ли у элемента класс pin--active
// если есть - удаляем класс.
function removeClassActive(nodeCollection) {
  for (var i = 0; i < nodeCollection.length; i++) {
    if (nodeCollection[i].classList.contains('pin--active')) {
      nodeCollection[i].classList.remove('pin--active');
    }
  }
}
// Используем свойство 'children' потому что оно возвращает коллекцию
// дочерних элементов узла без комментариев и текстовых узлов
function selectPin(target) {
  removeClassActive(nodeCollectionPin);
  target.classList.add('pin--active');
  DialogElement.style.display = 'block';
}

function closeDialog(evt) {
  evt.preventDefault();
  DialogElement.style.display = 'none';
  removeClassActive(nodeCollectionPin);
}

function synchronizeSelect() {
  if (RoomSelectElement.value === 'one-room') {
    CapacitySelectElement.value = 'no-guest';
  } else {
    CapacitySelectElement.value = 'three-guests';
  }
}

function enableForm() {
  SubmitBtnElement.disabled = false;
}

function disableForm() {
  SubmitBtnElement.disabled = true;
}

function addRequire() {
  InputTitleElement.required = true;
  InputAddressElement.required = true;
  InputPriceElement.required = true;
}

function setTitleValidate() {
  InputTitleElement.minLength = 30;
  InputTitleElement.maxLength = 100;
}

function setPriceValidation() {
  InputPriceElement.min = 1000;
  InputPriceElement.max = 1000000;
}

function validateForm() {
  var isValid = true;
  if (InputTitleElement.value.length < 30) {
    isValid = false;
  }

  if (Number(InputPriceElement.value) < Number(InputPriceElement.min)) {
    isValid = false;
  }

  if (InputAddressElement.value.length === 0) {
    isValid = false;
  }

  if (isValid) {
    enableForm();
  } else {
    disableForm();
  }
  synchronizeSelect();
}

window.addEventListener('load', completeOnLoad);
TokyoMapElement.addEventListener('click', onClickPin);
CloseElement.addEventListener('click', closeDialog);
FormElement.addEventListener('change', validateForm);
FormElement.addEventListener('input', validateForm);
SubmitBtnElement.addEventListener('click', validateForm);
synchronizeSelect();
