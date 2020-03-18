import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Router } from "@angular/router";


@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.less']
})
export class LocationComponent implements OnInit {

	private location = null;
	private date;
	private tickets = 1;
	constructor(private router : Router, private utils : UtilsService) {
		this.router = router;
		this.utils = utils;
		this.location = utils.getLocation();
		console.log(this.location);
		const date = new Date();
		this.date = date.toISOString();
		if(this.location === null){
			this.router.navigate(['/home']);
		}
	}

	ngOnInit() {
	}

	bookTickets(){
		if(this.date && this.tickets){
			this.utils.setPrice(this.location.price);
			this.utils.setTickets(this.tickets);
			this.utils.setTicketDate(this.date);
			this.router.navigate(['/payment']);
		}
	}
}
