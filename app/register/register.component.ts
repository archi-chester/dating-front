import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

//  Компонент регистрации нового пользователя
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  //  паблик
  // каркас пользователя
  public user: User;
  // реактивная форма
  public registerForm: FormGroup;
  // оборачиваем в партиал чтоб не заполнять все поля
  public bsConfig: Partial<BsDatepickerConfig>;

  //  приват

  //  конструктор (подключены сервис аутентификации и сервис соощений)
  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder,
    private router: Router) { }

  //  инитор
  ngOnInit() {
    // генерим конфиг для дата=пикера
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    // реактивные формы
    this.createRegisterForm();
  }

  // создание формы с использованием формБилдера
  public createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {validator: this.passwordMatchValidator});
  }

  // валидатор для пароля
  public passwordMatchValidator(g: FormGroup) {
     return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  //  регистрация
  public register() {
    // если форма валидна
    if (this.registerForm.valid) {
      // клонируем значение полей из формы в пользака
      this.user = Object.assign({}, this.registerForm.value);
      // сервис
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

  //  'отмена регистрация
  public cancel() {
    // Эмитим отмену регистрации
    this.cancelRegister.emit(false);
  }

}
