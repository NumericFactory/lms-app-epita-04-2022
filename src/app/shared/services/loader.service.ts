import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // 1 On créer le Subject privé isLoading$ 
  //   Seulement notre méthode 'setLoader' plus bas y a accès
  private _isLoading$ = new Subject<boolean>();

  constructor() { }

  // 2  Puis on crée un Observable isLoadingObs à partir du subject isLoading$
  //    Ce procédé permet d'encapsuler isLoading$ dans le service
  //    En effet un subject est accessible en écriture (.next())
  //    Alors qu'un Observable n'est accessible qu'en lecture en y souscrivant (.subscribe())
  setLoader(isLoading:boolean):void {
    this._isLoading$.next(isLoading)
  }

  get isLoading$() {
    return this._isLoading$.asObservable().pipe(delay(0))
  }
  // On ajoute un delay pour résoudre le bug
  // https://stackoverflow.com/questions/39787038/how-to-manage-angular2-expression-has-changed-after-it-was-checked-exception-w
}
