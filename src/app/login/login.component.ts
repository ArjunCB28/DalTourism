import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UtilsService } from '../utils.service';

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
		this.utils.httpPostRequest(url,jsonData).subscribe(data => {
			if(data && +data.status === 200){
				console.log(data.userId)
				console.log(data)
				this.utils.setUserId(data.userId);
				this.router.navigate(['/home']);
			}
		});
	}

	signup(){
		this.router.navigate(['/signup']);
	}

}
