import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
	selector: 'app-otpvalidate',
	templateUrl: './otpvalidate.component.html',
	styleUrls: ['./otpvalidate.component.less']
})
export class OtpvalidateComponent implements OnInit {

	private otp:string;
	constructor(private utils : UtilsService, private router : Router) {
		this.utils = utils;
		this.router = router;
		var userId = localStorage.getItem('userId');
		if(userId === null || +userId === 0){
			this.router.navigate(['/login']);
		}
	}

	ngOnInit() {
	}

	validate(){
		swal.fire({
			title: "Validating OTP",
			showConfirmButton: false,
			timerProgressBar: true,
			allowOutsideClick: false,
			onBeforeOpen: () => {
				swal.showLoading();
				const url : string = "validateOTP"
				const jsonData = {"otp":this.otp};
				this.utils.httpPostRequest(url, jsonData).subscribe(data => {
					if(data && +data.status === 200){
						var titleMessage = (this.utils.fromRoute === "signup") ? "New account created successfully" : "Login successful";
						swal.close();
						swal.fire({
							title: titleMessage,
							icon: 'success',
							showConfirmButton: false,
							timer: 1000,
							onClose: () => {
								this.router.navigate([this.utils.destRoute]);
							}
						});
					} else {
						swal.close();
						swal.fire({
							title: "Invalid OTP",
							icon: 'error',
							showConfirmButton: true
						});
					}
				});
			}
		});

	}
}
