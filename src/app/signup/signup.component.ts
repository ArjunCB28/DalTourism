import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';


import { UtilsService } from '../utils.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

	private signupForm : FormGroup;

	constructor(private router : Router, private utils : UtilsService) {
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

	validateData(): any {
		if(!this.signupForm.value.firstName || !this.signupForm.value.lastName || !this.signupForm.value.emailId || !this.signupForm.value.password || !this.signupForm.value.repassword){
			window.alert("Incomplete form");
			return false;
		}
		return true;
	}

	onSubmit() {
		if(!this.validateData()){
			return;
		}
		const url : string = "signup";
		this.utils.httpPostRequest(url,this.signupForm.value).subscribe(data => {
			if(data && +data.status === 200){
				this.utils.setUserId(data.userId);
				this.router.navigate(['/otp']);
			}
		});
	}

}
