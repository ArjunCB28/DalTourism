import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	private searchInput = "";
	constructor(private http : HttpClient, private router : Router) {
		this.http = http;
	  	this.router = router;
	}

	ngOnInit() {
	}

	searchLocations(): void {
		const url : string = "http://127.0.0.1:5000/locations?locationName="+this.searchInput;
		this.http.get<any>(url).subscribe(data => {
		    if(data && +data.status === 200){
		    	this.router.navigate(['/home']);
		    }
		});
	}

	inputChanged(){
		console.log(this.searchInput);
		if(this.searchInput && this.searchInput.length > 0){
			this.searchLocations();
		}
		// locationName

	}

}
