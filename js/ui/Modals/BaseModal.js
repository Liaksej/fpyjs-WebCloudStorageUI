/**
 * Класс BaseModal
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {
  constructor(element) {
    this.domElement = element[0];
    this.semanticElement = element.slice(1);
  }

  /**
   * Открывает всплывающее окно
   */
  open(type) {
    $(`.ui.modal.${type}`).modal("show");
  }

  /**
   * Закрывает всплывающее окно
   */
  close() {
    $(`.ui.modal`).modal("hide");
  }
}
