import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';


import { UtilsService } from '../utils.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

	private signupForm : FormGroup;
	private httpOptions = {
	  headers: new HttpHeaders({
	    'Content-Type':  'application/json',
	    'Authorization': 'my-auth-token'
	  })
	};

	constructor(private http : HttpClient, private router : Router, private utils : UtilsService) {
		this.http = http;
		this.router = router;
		this.utils = utils;
	}

	ngOnInit(): void {
		this.signupForm = new FormGroup({
			firstName: new FormControl(),
			lastName: new FormControl(),
			emailId: new FormControl(),
			password: new FormControl(),
			repassword: new FormControl()
		});
	}

	onSubmit() {
		var jsonData = this.utils.encode(this.signupForm.value);
		console.warn(jsonData);
		const url : string = "http://127.0.0.1:5000/signup";
		this.http.post<any>(url,JSON.stringify(jsonData), this.httpOptions).subscribe(data => {
		    if(data && +data.status === 200){
		    	this.router.navigate(['/otp']);
		    	console.log("hello success");
		    }
		});
	}

}
