import { Injectable } from '@angular/core';
// для TSLint
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // вывод дилога с подтверждением
  public confirm(message: string, okCallback: () => any) {
    // дергаем соответствующую функцию
    alertify.confirm(message, function(e) {
      // проверяем, что нажали ОК
      if (e) {
        // дергаем переданную функцию
        okCallback();
      } else {}
    });
  }

  // вывод сообщения об успехе
  public success(message: string) {
    // дергаем соответствующую функцию
    alertify.success(message);
  }

  // вывод сообщения об ошибке
  public error(message: string) {
    // дергаем соответствующую функцию
    alertify.error(message);
  }

  // вывод сообщения с предупреждением
  public warning(message: string) {
    // дергаем соответствующую функцию
    alertify.warning(message);
  }

  // вывод обычного сообщения
  public message(message: string) {
    // дергаем соответствующую функцию
    alertify.message(message);
  }
}
