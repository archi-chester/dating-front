import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

//  Инжектим в корень
@Injectable({
  providedIn: 'root'
})

//  Базовый сервис
export class AuthService {
  //  public
  // расшифрованный токен
  public decodedToken: any;
  public currentUser: User;

  // observable types
  public photoUrl = new BehaviorSubject<string>('../../assets/user.png');

  currentPhotoUrl = this.photoUrl.asObservable();

  //  private
  // Базовый урл * ВЫНЕСТИ ВОТДЕЛЬНЫЙ ФАЙЛ
  private baseUrl = environment.apiUrl + 'auth/';
  // хелпер для проверки токена
  private jwtHelper = new JwtHelperService();

  //  Конструктор
  //  http - экземпляр httpClient
  constructor(private http: HttpClient) { }

  // меняем текущую фотку
  public changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  //  Логин
  //  model - логин с паролем
  public login(model: any) {
    //  дергаем Пост
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        //  Если что-нить передали
        if (user) {
          //  сохраняем в локалСторадж
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          // расшифровываем токен
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;

          this.changeMemberPhoto(this.currentUser.photoUrl);

        }
      })
    );
  }

  //  регистрация нового пользователя
  public register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  // принак, что плзователь залогинен
  public loggedIn() {
    // пробуем получить токен из локалсторадж
    const token = localStorage.getItem('token');
    // возвращаем инверт результата проверки срока годности токена
    return !this.jwtHelper.isTokenExpired(token);
  }

  // управление ролями
  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}
