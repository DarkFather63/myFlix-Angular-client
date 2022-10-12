import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  movies: any[] = [];

  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog, public router: Router, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser()
    this.getFavoriteMovies();
  }

  /**
   * Function using data service to retrieve user info
   * and populate profile page
   *
   * @memberof UserProfileComponent
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.getUser;
    })
  }

  /**
   * Function to open a dialog to edit user info
   *
   * @memberof UserProfileComponent
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '400px'
    });
  }
  /**
   * Function using data service to delete a user completely
   *
   * @memberof UserProfileComponent
   */
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

  /**
   * Function to retrieve user favorite movies
   *
   * @memberof UserProfileComponent
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUserFavorites().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }


  /**
   * Function to open genre dialog from user profile
   *
   * @param {string} name
   * @param {string} description
   * @memberof UserProfileComponent
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    });
  }
  /**
   * Function to open director dialog from user profile
   *
   * @param {string} name
   * @param {string} bio
   * @param {Date} birth
   * @memberof UserProfileComponent
   */
  openDirector(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth
      },
      width: '500px'
    });
  }

  /**
   * Function to open synopsis dialog from user profile
   *
   * @param {string} title
   * @param {string} description
   * @memberof UserProfileComponent
   */
  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    });
  }

}
