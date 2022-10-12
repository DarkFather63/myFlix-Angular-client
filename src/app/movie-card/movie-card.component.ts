import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
  /**
   * Uses data service to get all movies for this component
   *
   * @memberof MovieCardComponent
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * Uses data service to get user favorites
   * this allows visualization of favorited movies
   *
   * @memberof MovieCardComponent
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUserFavorites().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * Function to check if a movie is favorited
   * by a user - later used to render UI details
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof MovieCardComponent
   */
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }
  /**
   * Uses data service to add movie to user favorites array
   *
   * @param {string} id
   * @memberof MovieCardComponent
   */
  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
  /**
   * Uses data service to remove movie from user favorites array
   *
   * @param {string} id
   * @memberof MovieCardComponent
   */
  removeFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavorite(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * Uses data service to open genre dialog description
   *
   * @param {string} name
   * @param {string} description
   * @memberof MovieCardComponent
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
   * Uses data service to open director details dialog
   *
   * @param {string} name
   * @param {string} bio
   * @param {Date} birth
   * @memberof MovieCardComponent
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
   * Uses data service to opent genre details dialog
   *
   * @param {string} title
   * @param {string} description
   * @memberof MovieCardComponent
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
