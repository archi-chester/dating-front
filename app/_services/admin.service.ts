import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // private
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // получение ролей
  public getUsersWithRoles() {
    return this.http.get(this.baseUrl + 'admin/usersWithRoles');
  }

  // отправка ролей
  public updateUserRoles(user: User, roles: {}) {
    return this.http.post(this.baseUrl + 'admin/editRoles/' + user.userName, roles);
  }

  // получение фоток для апрува
  public getPhotosForApproval() {
    return this.http.get(this.baseUrl + 'admin/photosForModeration');
  }

  // принять фотку
  public approvePhoto(photoId) {
    return this.http.post(this.baseUrl + 'admin/approvePhoto/' + photoId, {});
  }

  // блокернуть фотку
  public rejectPhoto(photoId) {
    return this.http.post(this.baseUrl + 'admin/rejectPhoto/' + photoId, {});
  }

}
