import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

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

			swal.fire({
				title: "Processing payment",
				showConfirmButton: false,
				timerProgressBar: true,
				allowOutsideClick: false,
				onBeforeOpen: () => {
					swal.showLoading();
					const url : string = "bookTickets?cardNumber="+this.cardNumber;
					var jsonData = {"userId":localStorage.getItem("userId"), "locationId": this.utils.getLocation().id,"tickets":this.utils.getTickets(),"date":this.utils.getTicketDate(),"overallCost":this.price};

					this.utils.httpPostRequest(url,jsonData).subscribe(data => {
						if(data && +data.status === 200){
							swal.close();
							swal.fire({
								title: "Payment Successful",
								icon: 'success',
								showConfirmButton: false,
								timer: 1000,
								onClose: () => {
									this.utils.httpGetRequest('emailTicket').subscribe(data => {});
									this.router.navigate(['/ticket']);
								}
							});
						} else {
							swal.fire({
								title: "Invalid card details",
								icon: 'error',
								showConfirmButton: true
							});
						}
					});
				}
			});
		}
	}

}
