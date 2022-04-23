import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackbar:MatSnackBar) { }

  showMessage(message:string) {
    this.snackbar.open(message, 'Fermer', {
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:7000
    })
  }
  /* 
    La méthode showMessage() permet d'afficher une alert 
    depuis un component, un service, ou un interceptor, par exemple
    avec: this.alertService.showMessage('Bien joué !')
    
    exemple de cas d'utilisation:
    - afficher un message de succès apres la soumission d'un formulaire depuis un component
    - afficher un message d'erreur HTTP (400, 500) depuis un interceptor
  */
}
