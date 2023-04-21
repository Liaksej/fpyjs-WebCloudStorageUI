/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = "https://cloud-api.yandex.net/v1/disk";

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken() {
    if (!localStorage.hasOwnProperty("yaToken")) {
      localStorage.setItem(
        "yaToken",
        prompt("Введите OAUth-токен от Яндекс.Диска")
      );
    }
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback) {}

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback) {
    createRequest({
      method: "DELETE",
      path: "/resources/upload",
      data: { path: `${path}` },
      headers: {
        Authorization: `${localStorage.getItem("yaToken")}`,
      },
    });
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback) {
    createRequest({
      method: "GET",
      data: "/resources/files",
      headers: {
        Authorization: `${localStorage.getItem("yaToken")}`,
      },
    });
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url) {}
}

Yandex.getToken();
