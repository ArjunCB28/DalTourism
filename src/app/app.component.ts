import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UtilsService } from './utils.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'DalTourism';
  selectedCountry = "";
  private login = false;
  ngOnInit() {};

  constructor(private router: Router, private utils : UtilsService) {
    this.utils = utils;
  	this.router = router;
  	this.router.navigate(['/home']);
    var userId = localStorage.getItem('userId');
    if(userId !== null && +userId !== 0){
      this.login = true;
    }

  }

  goToPage(page){
    this.utils.destRoute = "/home";
    this.router.navigate([page]);
  }

  logout(){
    swal.fire({
      title: "Logout successful !",
      showConfirmButton: false,
      timer: 1000,
      onClose: ()=>{
        this.login = false;
      }
    });
    localStorage.setItem('userId', "0");
  }
}
