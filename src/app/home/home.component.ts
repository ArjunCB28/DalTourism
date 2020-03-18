import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UtilsService } from '../utils.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	private searchInput = "";
	private selectedData;
	private searchData = [];
	constructor(private router : Router, private utils : UtilsService) {
		this.router = router;
		this.utils = utils;

		const url : string = "locations";
		this.utils.httpGetRequest(url).subscribe(data => {
			if(data && +data.status === 200){
				console.log(data.data.locations);
				this.searchData = this.utils.decodeArray(data.data.locations);
			}
		});
	}

	ngOnInit() {};

	locationSelected(location){
		this.utils.setLocation(location);
		this.router.navigate(['/location']);
	};

	inputChanged(){}

	showTickets(){
		this.router.navigate(['/ticket']);
	}

}
