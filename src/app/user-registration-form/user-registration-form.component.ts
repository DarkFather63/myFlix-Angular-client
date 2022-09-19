import { Component, OnInit, Input } from '@angular/core';

//used to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//imports API calls in data service class
import { UserRegistrationService } from '../fetch-api-data.service';

//import displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      //logic (to be implemented) for successful user reg goes here

      //closes modal on success
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
