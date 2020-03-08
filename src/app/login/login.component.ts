import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

	private emailId : string = "";
	private password : string = "";
	constructor(private http : HttpClient, private router : Router) {
		this.http = http;
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
		const url : string = "http://127.0.0.1:5000/login?email=" + this.emailId + "&password=" + this.password;
		this.http.get<any>(url).subscribe(data => {
		    if(data && +data.status === 200){
		    	this.router.navigate(['/home']);
		    }
		});
	}

	signup(){
		this.router.navigate(['/signup']);
	}

}
