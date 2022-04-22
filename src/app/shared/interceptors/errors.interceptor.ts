import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private router:Router, private alertSvc:AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      tap({
        error: (err) => {
          if(err instanceof HttpErrorResponse) {
            // Traitement des codes erreurs
            switch( err.status) {
              case 401 : 
             this.alertSvc.showMessage('Vous n\'êtes pas connectée', 'Fermer');
              // this.router.navigate(['login'])
              break;
  
              case 403 : 
             this.alertSvc.showMessage('Vous n\'êtes pas autorisée', 'Fermer');
             
              break;
  
              case 404 : 
             this.alertSvc.showMessage('La ressource n\'existe pas1234',  'Fermer');
              break;
  
              case 500 : 
             this.alertSvc.showMessage('Erreur serveur',  'Fermer');
              break;
            }
          }
        }
      })
    ) // Sortie du pipe (Observable)
  }
}
