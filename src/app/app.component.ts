import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RouteComponent } from './shared/route-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  routedComponent: RouteComponent;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang());
  }
}
