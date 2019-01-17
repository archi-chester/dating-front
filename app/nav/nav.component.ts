import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
//  Навбар
export class NavComponent implements OnInit {
  //  public
  public model: any = {};
  photoUrl: string;

  //  private

  //  конструктор (подключены сервис аутентификации, сервис сообщений, router)
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  //  инитор
  ngOnInit() {
    // подписываемся на обзерваблы
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  //  функция лоина
  public login() {
    // дергаем сервис
    this.authService.login(this.model).subscribe(
      next => {
      // выводим сообщение об успехе
      this.alertify.success('Logged in Succesful!');

    },
      error => {
      // выводим сообщение о неудаче
      this.alertify.error(error);
    },
    // по завершении данных дернуть навигэйт
    () => {
      this.router.navigate(['/members']);
    }
    );
  }

  //  проверяем наличие токена
  public loggedIn() {
    // дергаем соответствующий сервис
    return this.authService.loggedIn();
  }

  // разлогон
  public logout() {
    // удаляем лишнее из localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // грохаем сущности в сервисе
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    // выводим сообщение о разлогоне
    this.alertify.message('logged out');
    // дергаем навигацию на хом
      this.router.navigate(['/home']);
  }

}
