import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Router } from "@angular/router";

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

		if(this.utils.getUserId() === 0){
			this.router.navigate(['/login']);
		}
	}

	ngOnInit() {
	}

	validate(){
		const url : string = "validateOTP"
		const jsonData = {"otp":this.otp};
		this.utils.httpPostRequest(url, jsonData).subscribe(data => {
			if(data && +data.status === 200){
				this.router.navigate(['/home']);
			}
		});
	}
}
