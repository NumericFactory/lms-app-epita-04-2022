import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader:boolean = false

  constructor(public loaderSvc:LoaderService) {}

  ngOnInit() {
    this.loaderSvc.isLoading$.subscribe(
      (isLoading:boolean) => this.loader = isLoading 
    ) 
  }

   /* 
      On set this.loader à true ou false 
      pour afficher l'indicateur de loading

      Rappel du processus : 
      ** Depuis la classe LoaderInterceptor : 
        - si une request sortante est interceptée, on set _isLoading$ = true
        - si une réponse ou une erreur est retournée, on set loaderSvc._isLoading$ = false
      
      ** nous n'avons plus qu'à écouter ce changement ici plus bas,
         et utiliser le boolean loader dans la vue HTML pour afficher ou masquer le loader

        <div *ngIf="loader" style="position:fixed;top:50px;" >
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        </div>
    */

}
