/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
  // const xhr = new XMLHttpRequest();
  // // `path=${options.data.path}&url=${options.data.url}`
  // try {
  //   xhr.open(
  //     options.method,
  //     Yandex.HOST +
  //       options.path +
  //       `path=${options.data.way}&url=${encodeURIComponent(options.data.url)}`
  //   );
  //   xhr.responseType = "json";
  //   xhr.setRequestHeader(
  //     Object.keys(options.headers)[0],
  //     options.headers.Authorization
  //   );
  //   xhr.send();
  //   xhr.onload = function () {
  //     if (xhr.status != 202) {
  //       alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
  //     } else {
  //       alert(`${xhr.status}: ${xhr.statusText}`);
  //     }
  //   };
  // } catch (err) {
  //   console.error(err);
  // }
  // alert(encodeURIComponent(options.data.url));

  async function request() {
    let response = await fetch(
      Yandex.HOST +
        options.path +
        (options.data.way ? `?path=${options.data.way}` : "") +
        (options.data.url
          ? `&url=${encodeURIComponent(options.data.url)}`
          : "") +
        (options.data.mediaType ? `?media_type=${options.data.mediaType}` : ""),
      {
        method: options.method,
        headers: {
          Authorization: options.headers.Authorization,
        },
      }
    );
    let result;
    try {
      result = await response.json();
    } catch (syntaxError) {
      result = null;
    }
    if (!response.ok && result !== null) {
      console.log(result.message);
    } else {
      return options.callback(result);
    }
  }

  request();
};
