import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //  public
  public registerMode = false;  // показатель режима регистрации
  // public values: any;  // показатель режима регистрации

  //  private

  //  конструктор
  constructor(private http: HttpClient) { }

  //  инитор
  public ngOnInit() {
    //  дергаем значения
    // this.getValues();
  }

  //  режим регистрации
  public registerToggle() {
    //  инвертируем режим
    this.registerMode = true;
  }

  // //  получение текущих значений
  // public getValues() {
  //   //  дергаем гет
  //   this.http.get('http://localhost:5000/api/values')
  //     .subscribe(response => {
  //       //  в ответе переменные
  //       this.values = response;
  //   },
  //   error => {
  //     console.log(error);
  //   });
  // }

  public cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
