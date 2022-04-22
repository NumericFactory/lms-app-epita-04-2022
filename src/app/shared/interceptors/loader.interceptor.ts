import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderSvc:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    /* 
      1 On vérifie que request est une une instance de HttpRequest
        Si oui, on set isLoading$ à true
    */
    if(request instanceof HttpRequest) {
      this.loaderSvc.setLoader(true);
      console.log("entree interceptor loader")
    }

    return next.handle(request).pipe(
     tap({
      /* 
        2 On vérifie que :
          - la réponse est une instance de HttpResponse
          - ou l'erreur est une instance de HttpErrorResponse
          Si oui, on set isLoading$ à false
      */
      next: (res) => {
        if(res instanceof HttpResponse) {
          this.loaderSvc.setLoader(false)
          console.log("entree interceptor loader")
        }
      },
      error: (err) =>  {
        if(err instanceof HttpErrorResponse) {
          this.loaderSvc.setLoader(false)
          console.log("entree interceptor loader")
        }
      }
  
     })
    )
  }
}
