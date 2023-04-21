/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor(element) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents() {
    document
      .querySelector(".search-block")
      .addEventListener("click", findImages);

    function findImages(event) {
      const input = document
        .querySelector(".search-block")
        .getElementsByTagName("input")[0];
      if (input.value.trim()) {
        if (event.target === document.querySelector(".replace")) {
          document.querySelector(
            ".images-list .grid"
          ).firstElementChild.innerHTML = "";
        }
        if (
          event.target === document.querySelector(".add") ||
          event.target === document.querySelector(".replace")
        ) {
          VK.get(input.value);
          let interval = setInterval(() => {
            if (VK.lastCallback.listFromCallback) {
              let photoList = VK.lastCallback.listFromCallback;
              App.imageViewer.drawImages();
              clearInterval(interval);
            }
          }, 0);
        }
      }
    }
  }
}
