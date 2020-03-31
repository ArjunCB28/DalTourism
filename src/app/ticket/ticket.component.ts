import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
	selector: 'app-ticket',
	templateUrl: './ticket.component.html',
	styleUrls: ['./ticket.component.less']
})
export class TicketComponent implements OnInit {

	private ticket = {};
	constructor(private router : Router, private utils : UtilsService) {
		this.router = router;
		this.utils = utils;

		this.utils.httpGetRequest("getTickets").subscribe(data=>{
			if(data && +data.status === 200){
				this.ticket = this.utils.decodeObject(data.data.ticket);
			} else {
				swal.fire({
					title: "No ticket found",
					icon: "warning",
					showConfirmButton: true,
					allowOutsideClick: false,
					onClose: () => {
						this.router.navigate(['/home']);
					}
				});
			}
		});
	}

	ngOnInit() {
	}

	close(){
		this.router.navigate(['/home']);
	}

}
