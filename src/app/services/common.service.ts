import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  component: string = "home";
  loading: boolean = false;
  public _snackBar = inject(MatSnackBar);

  constructor() { }


  openSnackBar(message: string, action: string | undefined) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
