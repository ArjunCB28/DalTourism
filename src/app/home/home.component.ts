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

	getLocations(url){
		this.utils.httpGetRequest(url).subscribe(data => {
			if(data && +data.status === 200){
				console.log(data.data.locations);
				this.searchData = this.utils.decodeArray(data.data.locations);
			}
		});
	}

	constructor(private router : Router, private utils : UtilsService) {
		this.router = router;
		this.utils = utils;
		this.getLocations("locations");
	}

	ngOnInit() {};

	locationSelected(location){
		this.utils.setLocation(location);
		this.utils.destRoute = "/location";
		var userId = localStorage.getItem('userId');
		if(userId !== null && +userId !== 0){
			this.router.navigate(['/location']);
		} else {
			this.router.navigate(['/login']);
		}
	};

	searchLocations(){
		if(this.searchInput !== ""){
			this.getLocations("locations?search="+this.searchInput);
		}
	}

	showTickets(){
		this.utils.destRoute = "/ticket";
		var userId = localStorage.getItem('userId');
		if(userId !== null && +userId !== 0){
			this.router.navigate(['/ticket']);
		} else {
			this.router.navigate(['/login']);
		}
	}

	clearSeaerch(){
		this.searchInput = "";
		this.getLocations("locations")
	}

}
