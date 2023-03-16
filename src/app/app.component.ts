import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  
  constructor(private router: Router) {}

  isHeaderVisible: boolean = true;

  ngDoCheck(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/access/login' || currentRoute === '/access/register') {
      this.isHeaderVisible = false;
    } else {
      this.isHeaderVisible = true;
    }
  }

}
