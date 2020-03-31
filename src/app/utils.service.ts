import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UtilsService {
	private location = null;
	private price = null;
	private userId = 0;
	private tickets = 1;
	private ticketDate;
	private baseUrl = "http://127.0.0.1:5000/";

	public destRoute = "/home";

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json',
			'Authorization': 'my-auth-token'
		})
	};

	constructor(private http : HttpClient) {
		this.http = http;
	}


	private encodeString(str) {
		var outputString = "";
		var tmp = str.charAt(0);
		var count = 1;
		for (var i = 1; i < str.length; i++) {
			var currentChar = str.charAt(i);
			if (currentChar === tmp) {
				count++;
			} else {
				outputString += tmp + count + "";
				count = 1;
			}
			tmp = currentChar;
		}
		outputString += tmp + count + "";
		return outputString;
	}

	encode(data){
		var tempData = data;
		for(var key in tempData) {
			tempData[key] = this.encodeString(tempData[key]+"");
		}
		return tempData;
	}

	decodeString(str){
		var tempString = "";
		for(var i=0; i< str.length; i = i+2){
			var count = +str.charAt(i+1);
			for(var j=0; j< count; j++) {
				tempString += str.charAt(i);
			}
		}
		return tempString;
	}

	decodeObject(data){
		var tempData = data;
		for(var key in tempData) {
			tempData[key] = this.decodeString(tempData[key]);
		}
		return tempData;
	}

	decodeArray(data){
		var tempData = data;
		tempData.forEach(item=>{
			item = this.decodeObject(item)
		});
		return tempData;
	}

	setUserId(id){
		this.userId = id;
	}

	getUserId(){
		return this.userId;
	}

	setLocation(data){
		this.location = data;
	}

	getLocation(){
		return this.location;
	}

	setPrice(price){
		this.price = price;
	}

	getPrice(){
		return this.price
	}

	setTickets(tickets){
		this.tickets = tickets;
	}

	getTickets(){
		return this.tickets
	}

	setTicketDate(ticketDate){
		this.ticketDate = ticketDate;
	}

	getTicketDate(){
		return this.ticketDate;
	}

	appendUserId(url){
		var temp = url.split("?");
		var userId = localStorage.getItem("userId");
		if(userId === null){
			userId = "0";
		}
		if(temp.length > 1) {
			url += "&userId="+userId;
		} else {
			url += "?userId="+userId;
		}
		return url;
	}

	httpPostRequest(url, jsonData){
		console.log(jsonData);
		return this.http.post<any>(this.appendUserId(this.baseUrl+url),this.encode(jsonData), this.httpOptions);
	}

	httpGetRequest(url){
		return this.http.get<any>(this.appendUserId(this.baseUrl+url));
	}
}


