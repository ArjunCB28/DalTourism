import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'DalTourism';

  isMoreOptionsOpen = false;
  selectedCountry = "";

  ngOnInit() {};

  constructor(private router: Router) {
  	this.router = router;
  	this.router.navigate(['/login']);
  }

  toggleMoreOptions(){
  	this.isMoreOptionsOpen = !this.isMoreOptionsOpen;
  	console.log(this.isMoreOptionsOpen);
  }
}
