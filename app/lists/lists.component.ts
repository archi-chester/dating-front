import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  // public
  public users: User[];
  public pagination: Pagination;
  public likesParam: string;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  // сюда передается выбранная страница пагинации
  public pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  // грузим страничку с пользаками
  public loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

}
