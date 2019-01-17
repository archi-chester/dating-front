import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Интерсептер
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // врубаем перехватчик
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // перехватываем ошибку
      catchError(error => {
        // проверяем тип ошибки: если HttpErrorResponse
        if (error instanceof HttpErrorResponse) {
          // если ошибка авторизации возврашаем статус текст ошибки в виде ошибки
          if (error.status === 401) {
            return throwError(error.statusText);
          }

          // дергаем поле Application-Error
          const applicationError = error.headers.get('Application-Error');

          // Если там что-то есть - возвращаем в виде ошибки
          if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
          }

          // создадим переменные для хранения информации об ошибке
          const serverError = error.error;
          let modalStateErrors = '';

          // сомтрим содержимое, если существует и это ошибка
          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              // для каждого ключа
              if (serverError[key]) {
                // добавляем содержимое в модалстэйт
                modalStateErrors += serverError[key] + '\n';
              }
            }
          }
          // возвращаем модалстэйт (или сервер еррор или просто текст, смотря что пришло) в виде ошибки
          return throwError(modalStateErrors || serverError || 'Server Error');
        }
      })
    );
  }
}

// Экспортируем экземпляр с настройками
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
