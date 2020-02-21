import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

	private signupForm : FormGroup;

	constructor(private http : HttpClient, private router : Router) {
		this.http = http;
		this.router = router;
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
		// TODO: Use EventEmitter with form value
		this.router.navigate(['/otp']);
		console.warn(this.signupForm.value);
	}

}
