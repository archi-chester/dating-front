import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  // public
  public users: User[];
  public user: User = JSON.parse(localStorage.getItem('user'));
  public genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  public userParams: any = {};
  public pagination: Pagination;

  // конструктор
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  // инитор
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  // сюда передается выбранная страница пагинации
  public pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  // обнуляем фильтр в дефолт
  public resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  // грузим страничку с пользаками
  public loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

}
