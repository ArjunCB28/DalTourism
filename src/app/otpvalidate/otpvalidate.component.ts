import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
	selector: 'app-otpvalidate',
	templateUrl: './otpvalidate.component.html',
	styleUrls: ['./otpvalidate.component.less']
})
export class OtpvalidateComponent implements OnInit {

	constructor(private http : HttpClient, private router : Router) {
		this.http = http;
		this.router = router;
	}


	ngOnInit() {
	}

	validate(){
		
	}
}
