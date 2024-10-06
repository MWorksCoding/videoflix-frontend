import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  component: string = 'home';
  loading: boolean = false;
  existingEmail!: string | null;
  public _snackBar = inject(MatSnackBar);

  constructor() {}

  /**
   * Opens a snack bar (toast notification) with the provided message and action.
   *
   * This method displays a snack bar with a message and an optional action. The snack bar is automatically
   * dismissed after a duration of 3 seconds.
   *
   * @param {string} message - The message to be displayed in the snack bar.
   * @param {string | undefined} action - The optional action label for the snack bar (e.g., "OK", "Undo").
   * If no action is needed, `undefined` can be passed.
   *
   * @returns {void}
   */
  openSnackBar(message: string, action: string | undefined) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
