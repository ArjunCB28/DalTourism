import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Router } from "@angular/router";

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {

	private price;
	private cardNumber: string;
	private securityCode: string;
	private expMonth: string;
	private expYear: string;

	constructor(private router : Router, private utils : UtilsService) {
		this.router = router;
		this.utils = utils;
		this.price = +utils.getPrice();
		if(this.price === null){
			this.router.navigate(['/home']);
		}
		this.price = this.price * this.utils.getTickets();
	}

	ngOnInit() {
	}

	processPayment(){
		if(this.cardNumber && this.securityCode && this.expMonth && this.expYear){
			const url : string = "bookTickets";
			var jsonData = {"userId":this.utils.getUserId(), "locationId": this.utils.getLocation().id,"tickets":this.utils.getTickets(),"date":this.utils.getTicketDate(),"overallCost":this.price};
			this.utils.httpPostRequest(url,jsonData).subscribe(data => {
				if(data && +data.status === 200){
					this.router.navigate(['/ticket']);
				}
			});
		}
	}

}
