import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  @Output() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

  // обновление ролей
  public updateRoles() {
    console.log('updateRoles');
    // пульнули роли наверх
    this.updateSelectedRoles.emit(this.roles);
    // Скрыть окно
    this.bsModalRef.hide();
  }

}
