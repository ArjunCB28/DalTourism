import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';


import { UtilsService } from '../utils.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

	private signupForm : FormGroup;
	private buttonClicked = false;

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
			return false;
		}
		return true;
	}

	onSubmit() {
		if(!this.validateData()){
			swal.fire({
				title: "Invalid form",
				showConfirmButton: true
			});
			return;
		}
		this.buttonClicked = true;
		swal.fire({
			title: "Creating new account",
			showConfirmButton: false,
			timerProgressBar: true,
			allowOutsideClick: false,
			onBeforeOpen: () => {
				swal.showLoading();
				const url : string = "signup";
				this.utils.httpPostRequest(url,this.signupForm.value).subscribe(data => {
					this.buttonClicked = false;
					swal.close();
					if(data && +data.status === 200){
						localStorage.setItem('userId', data.userId);
						this.utils.fromRoute = "signup";
						this.router.navigate(['/otp']);
					}
				});
			}
		});
	}
}
