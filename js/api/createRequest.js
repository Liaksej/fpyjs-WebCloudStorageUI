/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();

  try {
    xhr.open(options.method, Yandex.HOST);
    xhr.responseType = "json";
    xhr.setRequestHeader(options.headers);
    xhr.send(data);
  } catch (err) {
    console.error(err);
  }
};
