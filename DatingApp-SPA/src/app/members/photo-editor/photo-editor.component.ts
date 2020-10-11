import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Photo } from '../../models/photo';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];

  @Output() getMemberPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;

  hasBaseDropZoneOver: boolean;

  response: string;

  baseUrl = environment.apiUrl + 'users/' + this.authService.decodedToken.nameid + '/photos';

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {

    this.uploader = new FileUploader({
      url: this.baseUrl,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.hasBaseDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(photo => {
      const newPhoto = JSON.parse(photo) as Photo;
      this.photos = [...this.photos, newPhoto];

      if (newPhoto.isMain) {
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      }
    });
  }

  ngOnInit(): void {
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo): void {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {

      const currentMain = this.photos.filter(p => p.isMain)[0];
      currentMain.isMain = false;
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are your sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos = this.photos.filter(p => p.id !== id);
        this.alertify.success('Photo has been deleted');
      }, error => this.alertify.error('Failed to delete the photo'));
    });
  }

}
