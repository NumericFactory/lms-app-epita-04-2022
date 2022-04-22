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

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      tap({
        error: (err) => {
          if(err instanceof HttpErrorResponse) {
            // Traitement des codes erreurs
            switch( err.status) {
              case 401 : 
              alert('Vous n\'êtes pas connectée');
              // this.router.navigate(['login'])
              break;
  
              case 403 : 
              alert('Vous n\'êtes pas autorisée');
              // this.router.navigate(['login'])
              break;
  
              case 404 : 
              alert('La ressource n\'existe pas');
              // this.router.navigate(['login'])
              break;
  
              case 500 : 
              alert('Erreur serveur');
              // this.router.navigate(['login'])
              break;
            }
          }

        }
      })

    
    ) // Sortie du pipe (Observable)
  }
}
