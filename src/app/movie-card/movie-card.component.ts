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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUserFavorites().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  //Following three calls allow status display on movies (if they've been favorited or not)
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  removeFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavorite(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  //Following open dialogs for genre, director and synopsis
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    });
  }

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
