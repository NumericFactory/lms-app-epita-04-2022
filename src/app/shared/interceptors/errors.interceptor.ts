import { Injectable } from '@angular/core';
import {
  HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private router:Router, private alertSvc:AlertService) {}
   /* Gestion globale du retour d'erreurs des requêtes HTTP */ 

   /* 
    
    EXPLICATION DES INTERCEPTORS
    L'interceptor est une brique qui permet d'intercepter les request HTTP sortantes et entrantes
    3 exemples de cas d'utilisation : 
    - gérer automatiquement les erreurs HTTP (afficher un message à l'utilisateur et/ou le rediriger)
    - ajouter automatiquement un token ou une clé API dans les Headers d'une requête sortante
    - gérer l'affichage/masquage d'un loader lorsque qu'une requête HTTP

    Un interceptor n'a qu'une méthode : intercept(req, next)
    Cette méthode retourne la request HTTP avec : next.handle(req):Observable, 
    - soit à l'interceptor suivant, 
    - soit à destination (le back-end)
    L'ordre des intercptors est important, nous les déclarons dans app.module.ts (dans providers: [...])

    ... Dans l'interceptor qui suit,
    nous effectuons des traitements sur la requête interceptée 
    afin de traiter AUTOMATIQUEMENT et GLOBALEMENT les erreurs HTTP (400,500)

    Les class importantes : HttpRequest, HttpResponse, HttpErrorResponse
    Documentation : https://angular.io/guide/http#intercepting-requests-and-responses

    @Author : Frederic Lossignol

   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      tap({
        error: (err) => {
          if(err instanceof HttpErrorResponse) {
            // Traitement des codes erreurs (400,500)
            switch( err.status) {
              case 401 : 
              this.alertSvc.showMessage('Merci de vous authentifier');
              this.router.navigate(['login'])
              break;
  
              case 403 : 
              this.alertSvc.showMessage('Ressource non-autorisée');
              break;
  
              case 404 : 
              this.alertSvc.showMessage('La ressource n\'existe pas');
              break;
  
              case 500 : 
              case 501:
              case 502:
              case 503:
              case 504:
              this.alertSvc.showMessage('Erreur serveur');
              break;

              default:
                this.alertSvc.showMessage('Erreur serveur');
            }
          }
        }
      })
    ) // Sortie du pipe ( > Observable)
  } // Fin méthode intercept
} // Fin class ErrorsInterceptor
