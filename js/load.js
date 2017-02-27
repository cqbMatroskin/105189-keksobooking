'use strict';

window.load = (function () {
  var errorHandler = function (err) {
    return err;
  };

  var statusCode = {
    ERROR_CLIENT_SIDE: 400,
    ERROR_SERVER_SIDE: 500,
    SUCCESS: 200
  };

  return function (url, onLoad, onError) {
    var request = new XMLHttpRequest();

    if (typeof onError === 'function') {
      errorHandler = onError;
    }

    request.addEventListener('load', function (evt) {
      if (evt.target.status >= statusCode.ERROR_CLIENT_SIDE) {
        errorHandler('Ошибка загрузки данных на стороне клиента. Код ошибки: ' + evt.target.status);
      } else if (evt.target.status >= statusCode.ERROR_SERVER_SIDE) {
        errorHandler('Ошибка на стороне сервера. Код ошибки ' + evt.target.response);
      } else if (evt.target.status >= statusCode.SUCCESS) {
        onLoad(evt.target.response);
      }
    });

    request.addEventListener('error', function (evt) {
      errorHandler('Ошибка');
    });
    request.addEventListener('timeout', function () {
      errorHandler('Превышено время ожидания ответа');
    });
    request.responseType = 'json';
    request.timeout = 10000;
    request.open('GET', url);
    request.send();
  };
}());
