import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog, public router: Router, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser()
  }


  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.getUser;
    })
  }

  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '400px'
    });
  }

  deleteUserProfile(): void {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackbar.open(
          'You have successfully deleted your account!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

}
