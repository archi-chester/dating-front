import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

// guard
@Injectable({
  providedIn: 'root'
})

// AuthGuard
export class AuthGuard implements CanActivate {


  // конструктор
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  // основная функция
  canActivate(next: ActivatedRouteSnapshot): boolean {
    // добавляем понятие роли
    const roles = next.firstChild.data['roles'] as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['members']);
        this.alertify.error('You are not authorized to access this area');
      }
    }

    // проверка логина
    if (this.authService.loggedIn()) {
      return true;
    } else {
      // выводим сообщение с отказом
      this.alertify.error('ou shall not pass!!');
      // отшиаем в хом
      this.router.navigate(['/home']);
      // возвращаем фэлс
      return false;
    }
  }
}
