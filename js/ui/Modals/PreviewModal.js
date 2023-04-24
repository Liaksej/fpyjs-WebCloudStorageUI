/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor(element) {
    super(element);
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения:
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.domElement
      .querySelector(".header .x")
      .addEventListener("click", this.close);

    this.domElement
      .querySelector(".content")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("delete")) {
          event.target
            .querySelector("i")
            .classList.add("icon", "spinner", "loading");
          event.target.classList.add("disabled");
          Yandex.removeFile(event.target.dataset.path, (response) => {
            if (response === null) {
              event.target.closest(".image-preview-container").remove();
            }
          });
        }

        if (
          event.target ===
          document.querySelector(".content .image-preview-container .download")
        ) {
          Yandex.downloadFileByUrl(url);
        }
      });
  }

  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    const items = data.items.reverse();
    const arrayOfImagesHTML = [];
    for (const image of items) {
      arrayOfImagesHTML.push(this.getImageInfo(image));
    }
    this.domElement.querySelector(".content").innerHTML =
      arrayOfImagesHTML.join("");
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    // Метод formatDate преобразует полученную дату от Yandex API (ISO) в удобный для отображения формат: 30 декабря 2021 г. в 23:40
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    return `<div class="image-preview-container">
              <img src=${item.file} />
              <table class="ui celled table">
                <thead>
                  <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
                </thead>
                <tbody>
                  <tr><td>${item.name}</td><td>${item.exif.date_time}</td><td>${item.size}Кб</td></tr>
                </tbody>
              </table>
              <div class="buttons-wrapper">
                <button class="ui labeled icon red basic button delete" data-path=${item.path}>
                  Удалить
                  <i class="trash icon"></i>
                </button>
                <button class="ui labeled icon violet basic button download" data-file=${item.file}>
                  Скачать
                  <i class="download icon"></i>
                </button>
              </div>
            </div>`;
  }
}
