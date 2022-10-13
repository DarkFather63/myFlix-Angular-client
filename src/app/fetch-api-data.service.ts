import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://eryn-moviedb.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) {
  }

  /**
   *
   * Calls API enpoint to add new user
   * @param {*} userDetails
   * @return {*}  \{Observable<any>\} as user object in JSON format
   * @memberof UserRegistrationService
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   *
   * Calls API endpoint to login user
   * @param {*} userDetails
   * @return {*}  \{Observable<any>\} as user data in JSON format
   * @memberof UserRegistrationService
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   *
   * Function to handle any errors when calling endpoints
   * @private
   * @param {HttpErrorResponse} error
   * @return {*}  \{*\} error response in console + alert to error occurrence
   * @memberof UserRegistrationService
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    //had to change the throwError function to factory - use is deprecated
    return throwError(() => new Error(
      'Something bad happened; please try again later.'
    )
    );
  }

  /**
   * Retrieves all movies from the API by calling movies endpoint
   *
   * @return {*}  \{Observable<any>\} Returns movie array
   * @memberof UserRegistrationService
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   *
   * Function to make sure body is mapped to request
   * @private
   * @param {*} res
   * @return {*}  \{*\}
   * @memberof UserRegistrationService
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body;
  }


  /**
   * GETs one movie from movies array by calling API endpoint
   *
   * @param {*} title
   * @return {*}  \{Observable<any>\} movie by title
   * @memberof UserRegistrationService
   */
  public getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * GETs director through API enpoint
   *
   * @param {*} directorName
   * @return {*}  \{Observable<any>\} as director object
   * @memberof UserRegistrationService
   */
  public getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/director/${directorName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * GETs genre 
   *
   * @param {*} genreName
   * @return {*}  \{Observable<any>\} as genre object
   * @memberof UserRegistrationService
   */
  public getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genre/${genreName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * GETs user
   *
   * @return {*}  \{Observable<any>\} as user object for use in viewing user details,
   * as in a profile page
   * @memberof UserRegistrationService
   */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * GETs user favorite movies array
   *
   * @return {*}  \{Observable<any>\} as movies array in user object
   * @memberof UserRegistrationService
   */
  public getUserFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user')
    return this.http.get(apiUrl + `users/${user}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * PUTs movie to user favorites array
   *
   * @param {string} movieId
   * @return {*}  \{Observable<any>\} as movie added to array
   * @memberof UserRegistrationService
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}/movies/${movieId}`, { favoriteMovie: movieId }, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * PUTs user info updates to user object
   *
   * @param {*} newDetails
   * @return {*}  \{Observable<any>\} as user details object
   * @memberof UserRegistrationService
   */
  public editUser(newDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, newDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * DELETEs user object - caution - removes user completely
   *
   * @return {*}  \{Observable<any>\} - returns affirmative or negative response depending on delete
   * success
   * @memberof UserRegistrationService
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * DELETEs user favorite movie from favorites array
   *
   * @param {*} movieId
   * @return {*}  \{Observable<any>\} updated array without specified movie if successful
   * as well as success or failure message
   * @memberof UserRegistrationService
   */
  public deleteFavorite(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

}
