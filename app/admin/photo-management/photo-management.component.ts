import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  // public
  public photos: any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getPhotosForApproval();
  }

  // получение фоток для апрува
  public getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      this.photos = photos;
    }, error => {
      console.log(error);
    });
  }

  // одобрить фотку
  public approvePhoto(photoId) {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

  // запретить фотку
  public rejectPhoto(photoId) {
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

}
