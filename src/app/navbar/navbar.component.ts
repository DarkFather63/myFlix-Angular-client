import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  /**
   * Navigation routing to link home page
   *
   * @memberof NavbarComponent
   */
  goHome(): void {
    this.router.navigate(['movies'])
  }
  /**
   * Navigation routing to link user profile
   *
   * @memberof NavbarComponent
   */
  goToProfile(): void {
    this.router.navigate(['user'])
  }
  /**
   * Navigation routing to log out user
   * Also clears out local storage
   *
   * @memberof NavbarComponent
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }

}
