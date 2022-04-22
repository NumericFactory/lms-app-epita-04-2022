import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader:boolean = false

  constructor(public loaderSvc:LoaderService) {
  }

  ngOnInit() {
    this.loaderSvc.isLoading$.subscribe(
    
      data => {console.log('loader is'+data); this.loader = data}
    ) 

    // this.loaderSvc.setLoader(true);
    // setTimeout(() => {
    //   this.loaderSvc.setLoader(false)
    // }, 4000);
  }

}
