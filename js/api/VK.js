/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {
  static ACCESS_TOKEN =
    "052ec054052ec054052ec0543f063d62ea0052e052ec0546110b1c17168e0e97c2f4d30";
  static lastCallback = {
    // callback: VK.get("7451160"),
    callbackFn: function (result) {
      VK.processData(result);
    },
  };

  /**
   * Получает изображения
   * */
  static get(id = "7451160") {
    let script = document.createElement("SCRIPT");
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&photo_sizes=1&count=1000&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.lastCallback.callbackFn`;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {
    document.head.querySelector("script").remove();
    if (!result) {
      alert(
        "Запрос данных в VK не прошел. Проверьте подключение к Интернету и попробуйте еще раз."
      );
      return;
    }
    const photoArray = result.response.items;
    const photoMaxSize = [];
    for (const photo of photoArray) {
      photoMaxSize.push(photo.sizes.at(-1).url);
    }
    VK.lastCallback.listFromCallback = photoMaxSize;
    VK.lastCallback.callbackFn = () => {};
    // VK.lastCallback.allert = console.log(VK.lastCallback.listFromCallback);
  }
}
