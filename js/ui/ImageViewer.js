/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor(element) {
    this.element = element; // images-wrapper
    this.previewBlock = this.element.querySelector(".image");
    this.imageList = this.element.querySelector(".images-list .grid .row");
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents() {
    // Двойной клик по превьюшке фотографии
    this.drawImages();
    this.imageList.addEventListener("dblclick", (event) => {
      if (event.target.tagName.toLowerCase() === "img") {
        this.previewBlock.src = event.target.src;
      }
    });

    // Одинарный клик по превьюшке фотографии
    this.imageList.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "img") {
        event.target.classList.toggle("selected");
      }
      this.checkButtonText();
    });

    // Клик по кнопке "Выбрать всё" / "Снять выделение"
    this.element.querySelector(".select-all").addEventListener("click", () => {
      let allImages = Array.from(this.imageList.querySelectorAll("img"));
      if (allImages.some((element) => element.classList.contains("selected"))) {
        allImages.map((item) => {
          if (item.classList.contains("selected")) {
            item.classList.remove("selected");
          }
        });
      } else {
        allImages.map((item) => {
          item.classList.add("selected");
        });
      }
      this.checkButtonText();
    });

    // Клик по кнопке "Посмотреть загруженные файлы"
    this.element
      .querySelector(".show-uploaded-files")
      .addEventListener("click", () => {
        // App.getModal();
        /**
         * В содержимом модального окна необходимо отобразить большой лоадер. Для этого используйте блок '<i class="asterisk loading icon massive"></i>'.
         * Открывайте модальное окно с помощью метода open.
         * Получите все загруженные изображения с помощью метода Yandex.getUploadedFiles.
         * После выполнения метода (в колбеке) отрисовывайте все полученные изображения с помощью метода showImages у объекта модального окна.
         */
      });
    // Клик по кнопке "Отправить на диск"
    this.element.querySelector(".send").addEventListener("click", () => {
      const sendModal = App.getModal("fileUploader");
      const allSelectedImgs = this.imageList.querySelectorAll(".selected");
      sendModal.open("file-uploader-modal");

      sendModal.showImages(
        Array.from(allSelectedImgs).map((image) => image.src)
      );

      /**
       * Отрисуйте все модальные изображения в открытом модальном окне с помощью метода showImages у объекта модального окна
       */
    });
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    document.querySelector(".images-list .grid .row").innerHTML = "";
  }

  /**
   * Отрисовывает изображения.
   */
  drawImages() {
    if (
      VK.lastCallback.listFromCallback &&
      VK.lastCallback.listFromCallback.length > 0
    ) {
      this.element.querySelector(".select-all").classList.remove("disable");
      for (const image of VK.lastCallback.listFromCallback) {
        let img = document.createElement("div");
        img.classList.add(
          "four",
          "wide",
          "column",
          "ui",
          "medium",
          "image-wrapper"
        );
        img.innerHTML = `<img src='${image}' />`;
        this.imageList.appendChild(img);
      }
    } else {
      if (
        !this.element.querySelector(".select-all").classList.contains("disable")
      ) {
        this.element.querySelector(".select-all").classList.add("disable");
      }
    }
    const selectAllBnt = this.element.querySelector(".select-all");
    if (
      Array.from(this.imageList.querySelectorAll("img")).length > 0 &&
      selectAllBnt.classList.contains("disabled")
    ) {
      selectAllBnt.classList.remove("disabled");
    }
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText() {
    let allImages = Array.from(this.imageList.querySelectorAll("img"));
    const selectAllBnt = this.element.querySelector(".select-all");
    const sendBtn = this.element.querySelector(".send");
    if (allImages.some((element) => element.classList.contains("selected"))) {
      selectAllBnt.textContent = "Снять выделение";
    } else {
      selectAllBnt.textContent = "Выбрать всё";
    }

    if (allImages.some((element) => element.classList.contains("selected"))) {
      sendBtn.classList.remove("disabled");
    } else {
      if (!sendBtn.classList.contains("disabled")) {
        sendBtn.classList.add("disabled");
      }
    }
  }
}
