import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UtilsService } from '../utils.service';
import swal from 'sweetalert2';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

	private emailId : string = "";
	private password : string = "";

	constructor(private router : Router, private utils : UtilsService) {
		this.utils = utils;
	  	this.router = router;
	}

	ngOnInit() {
	}

	validateLogin(): any{
		if(this.emailId === "" || this.password === ""){
			window.alert("Invalid credentials");
			return false;
		}
		return true;
	}


	login(){
		if(!this.validateLogin()){
			return;
		}
		const url : string = "login";
		const jsonData = {"email":this.emailId,"password":this.password}

		swal.fire({
			title: "Signing into account",
			showConfirmButton: false,
			timerProgressBar: true,
			allowOutsideClick: false,
			onBeforeOpen: () => {
				swal.showLoading();
				const url : string = "login";
				this.utils.httpPostRequest(url,jsonData).subscribe(data => {
					if(data && +data.status === 200){
						swal.close();
						localStorage.setItem('userId', data.userId);
						this.utils.fromRoute = "login";
						this.router.navigate(['/otp']);
					} else {
						swal.fire({
							title: "Invalid login credentials",
							icon: 'error',
							showConfirmButton: true
						});
					}
				});
			}
		});
	}

	signup(){
		this.router.navigate(['/signup']);
	}

}
