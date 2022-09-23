import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  //added these to open dialogs for genre, director, and synopsis. Update those components so these work!
  //these are empty dialogs for now, but the buttons are connected to the functions. The components still need 
  //content.
  openGenre(): void {
    this.dialog.open(GenreDialogComponent, {
      width: '280px'
    });
  }

  openDirector(): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '280px'
    });
  }

  openSynopsis(): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '280px'
    });
  }

}
