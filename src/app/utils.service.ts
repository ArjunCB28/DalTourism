import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

	constructor() { }


	private encodeString(str) {
		console.log(str);
		var outputString = "";
		var tmp = str.charAt(0);
		var count = 1;
		for (var i = 1; i < str.length; i++) {
			var curr = str.charAt(i);
			if (curr === tmp) {
				count++;
			} else {
				outputString += tmp + count + "";
				count = 1;
			}
			tmp = curr;
		}
		outputString += tmp + count + "";
		return outputString;
	}

	encode(data){
		var tempData = data;
		for(var key in tempData) {
			tempData[key] = this.encodeString(tempData[key]);
		}
		return tempData;
	}
}


