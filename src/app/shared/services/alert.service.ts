import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackbar:MatSnackBar) { }

  showMessage(message:string, action:string) {
    this.snackbar.open(message, action, {
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:10000
    })
  }
}
